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
			},
			port: {
				coverage: 8000
			}
		},
		connect: {
			coverage: {
				options: {
					port: '<%= meta.port.coverage %>',
					middleware: function (connect, options) {
						// build paths
						var src = [];
						grunt.file.expand(grunt.config.get('jasmine.coverage.src')).forEach(function (file) {
							src.push('/' + file);
						});
						var static = connect.static(options.base);
						return [
							function (request, response, next) {
								if (src.indexOf(request.url) > -1) {
									// redirect to instrumented source
									request.url = '/.grunt/grunt-contrib-jasmine' + request.url;
								}
								return static.apply(this, arguments);
							}
						];
					}
				}
			}
		},
		jasmine: {
			coverage: {
				src: '<%= meta.src.main %>/js/*.js',
				options: {
					specs: '<%= meta.src.test %>/js/*.js',
					host: 'http://localhost:<%= meta.port.coverage %>/',
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
						transitive: false,
						template: require('grunt-template-jasmine-requirejs'),
						templateOptions: {
							requireConfig: {
								baseUrl: './<%= meta.src.main %>/js/'
							}
						}
					}
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-connect');
	
	grunt.registerTask('test:coverage', ['connect:coverage', 'jasmine:coverage']);
};