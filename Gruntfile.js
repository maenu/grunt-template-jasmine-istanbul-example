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
			coverage: '<%= meta.src.main %>/js/Generator.js',
			options: {
				specs: '<%= meta.src.test %>/js/Generator.js',
				template: require('./src/test/js/template-coverage.js'),
				templateOptions: {
					// coverage data will be written to this file
					coverage: '<%= meta.bin.coverage %>/coverage.json',
					// coverage report will be created in this directory
					report: '<%= meta.bin.coverage %>',
					// this is the actual template used, coverage is just mixed in
					template: 'node_modules/grunt-contrib-jasmine/tasks/jasmine/templates/DefaultRunner.tmpl'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	
	grunt.registerTask('coverage', ['jasmine:coverage']);
};