/**
 * Setup coverage via istanbul.
 *
 * @author Manuel Leuenberger
 */

var HELPER = __dirname + '/coverage-helper.js';

exports.process = function (grunt, task, context) {
	var path = require('path');
	var istanbul = require('istanbul');
	
	var instrumenter = new istanbul.Instrumenter();
	var reporter = istanbul.Report.create('html', {
		dir: context.options.report
	});
	var collector = new istanbul.Collector();
	// append helper
	context.scripts.helpers.push(HELPER);
	// instrument sources
	var instrumentedSrc = [];
	context.scripts.src.forEach(function (src) {
		var tmpSrc = path.join(context.temp, src);
		grunt.file.write(tmpSrc, instrumenter.instrumentSync(
				grunt.file.read(src), src));
		instrumentedSrc.push(tmpSrc);
	});
	context.scripts.src = instrumentedSrc;
	// listen to coverage event dispatched by reporter added in helper
	task.phantomjs.on('jasmine.coverage', function (coverage) {
		grunt.file.write(context.options.coverage, JSON.stringify(coverage));
		collector.add(coverage);
		reporter.writeReport(collector, true);
	});
	// use template option to mix in coverage
	return grunt.util._.template(grunt.file.read(context.options.template),
			context);
};