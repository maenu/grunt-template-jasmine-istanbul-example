module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'src/main',
				test: 'src/test',
			},
			lib: {
				main: 'lib/main',
				test: 'lib/test',
			},
			bin: {
				coverage: 'bin/coverage'
			}
		},
		jasmine: {
			coverage: '<%= meta.src.main %>/js/*.js',
			options: {
				specs: '<%= meta.src.test %>/js/*.js',
				template: '<%= meta.src.test %>/html/Coverage.tmpl',
				templateOptions: {
					report: '<%= meta.bin.coverage %>'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('coverage', ['jasmine:coverage']);
};