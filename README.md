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

As you can see in [package.json](/maenu/example-grunt-jasmine-istanbul/blob/master/package.json), it uses the packages
[grunt](https://github.com/gruntjs/grunt) and
[grunt-contrib-jasmine](https://github.com/gruntjs/grunt-contrib-jasmine) from
npm and [grunt-istanbul](https://github.com/taichi/grunt-istanbul) from github to get support for grunt at version 0.4.

A custom template that adds a custom reporter manages the collection and processing of the coverage data, see [src/test/html/Coverage.tmpl](/maenu/example-grunt-jasmine-istanbul/blob/master/src/test/html/Coverage.tmpl).
This reporter sends the coverage data to PhantomJS with the event named `jasmine.coverage`.
We need to store the coverage data as a global variable for grunt-istanbul.
This is done by listening for the `jasmine.coverage` event in the template.