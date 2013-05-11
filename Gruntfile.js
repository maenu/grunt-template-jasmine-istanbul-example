module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test'
			},
			bin: {
				coverage: 'bin/coverage'
			}
		},
		jasmine: {
			coverage: {
				src: '<%= meta.src.main %>/js/*.js',
				options: {
					specs: '<%= meta.src.test %>/js/*.js',
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: '<%= meta.bin.coverage %>/coverage.json',
						report: [
							{
								type: 'html',
								options: {
									dir: '<%= meta.bin.coverage %>/html'
								}
							},
							{
								type: 'cobertura',
								options: {
									dir: '<%= meta.bin.coverage %>/cobertura'
								}
							}
						],
						// 1. don't replace src for the mixed-in template with instrumented sources
						replace: false,
						template: require('grunt-template-jasmine-requirejs'),
						templateOptions: {
							requireConfig: {
								// 2. use the baseUrl you want
								baseUrl: './<%= meta.src.main %>/js/',
								// 3. pass paths of the sources being instrumented as a configuration option
								//    these paths should be the same as the jasmine task's src
								//    unfortunately, grunt.config.get() doesn't work because the config is just being evaluated
								config: {
									instrumented: {
										src: grunt.file.expand('src/main/js/*.js')
									}
								},
								// 4. use this callback to read the paths of the sources being instrumented and redirect requests to them appropriately
								callback: function () {
									define('instrumented', ['module'], function (module) {
										return module.config().src;
									});
									require(['instrumented'], function (instrumented) {
										var oldLoad = requirejs.load;
										requirejs.load = function (context, moduleName, url) {
											// normalize paths
											if (url.substring(0, 1) == '/') {
												url = url.substring(1);
											} else if (url.substring(0, 2) == './') {
												url = url.substring(2);
											}
											// redirect
											if (instrumented.indexOf(url) > -1) {
												url = './.grunt/grunt-contrib-jasmine/' + url;
											}
											return oldLoad.apply(this, [context, moduleName, url]);
										};
									});
								}
							}
						}
					}
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('test:coverage', ['jasmine:coverage']);
};