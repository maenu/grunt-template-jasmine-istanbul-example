# What is this?

Example application to show how to setup grunt-istanbul with
grunt-contrib-jasmine.

To get the coverage reports, download this repo and run:
```bash
npm install
grunt coverage
```
and the coverage reports will appear in `bin/coverage/index.html`.

# How does it work?

As you can see in
[package.json](/maenu/example-grunt-jasmine-istanbul/blob/master/package.json),
it uses the packages
[grunt](https://github.com/gruntjs/grunt),
[istanbul](https://github.com/gotwarlost/istanbul),
and
[grunt-contrib-jasmine](https://github.com/maenu/grunt-contrib-jasmine).

A custom template that adds a custom reporter manages the collecting and processing of the coverage data, see
[src/test/html/Coverage.tmpl](/maenu/example-grunt-jasmine-istanbul/blob/master/src/test/html/Coverage.tmpl).
This reporter sends the coverage data to PhantomJS with the event named `jasmine.coverage`.
We listen for this event and generate the reports.
The instrumentation and report generation all happen inside the template, which makes the configuration in
[Gruntfile.js](/maenu/example-grunt-jasmine-istanbul/blob/master/Gruntfile.js)
pretty simple.