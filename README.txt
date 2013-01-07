# What is this?

Example application to show how to setup grunt-istanbul with
grunt-contrib-jasmine.

To get the coverage reports, download this repo and run:
```bash
npm install
grunt coverage
```
and the coverage reports will appear in `bin/coverage/lcov-report/index.html`.

# How does it work?

As you can see in [package.json](/package.json), it uses the packages
[grunt](https://github.com/gruntjs/grunt) and
[grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine) from
npm and [grunt-istanbul](https://github.com/taichi/grunt-istanbul) from github
to get support for grunt at version 0.4. There are two important things that are
necessary to make istanbul work with jasmine:

## 1. Collect the coverage data after the jasmine tests

This is done with a custom template that adds a custom reporter, see
[src/test/html/Coverage.tmpl](/src/test/html/Coverage.tmpl). This reporter sends
the coverage data from PhantomJS to grunt with the event named
`jasmine.coverage`.

## 2. Prepare the coverage data for report generation

We need to store the coverage data as a global variable for grunt-istanbul. This
is done by listening for the `jasmine.coverage` event in the
[Gruntfile.js](/Gruntfile.js).
```javascript
grunt.event.on('jasmine.coverage', function (coverage) {
	global.__coverage__ = coverage
});
```
Et voilà.