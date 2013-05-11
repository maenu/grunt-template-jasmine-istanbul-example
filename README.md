# [grunt-template-jasmine-istanbul](https://github.com/maenu/grunt-template-jasmine-istanbul) Examples

There are multiple branches, each of which is an isolated example of how to use `grunt-template-jasmine-istanbul`.

Every example runs tests and generates coverage reports.
Just run:

```bash
npm install
grunt test:coverage
```

and the coverage reports will appear in `bin/coverage/index.html`.

Have a look at the [Gruntfile.js](Gruntfile.js) for the example configuration.

## Examples

### [**Simple**](https://github.com/maenu/grunt-template-jasmine-istanbul-example/tree/master)

Shows a simple configuration without further dependencies and shows how to set up reports.

### [**Connect**](https://github.com/maenu/grunt-template-jasmine-istanbul-example/tree/connect)

Uses `grunt-contrib-connect` to run the test on an ad-hoc server.

### [**Simple RequireJS**](https://github.com/maenu/grunt-template-jasmine-istanbul-example/tree/requirejs)

Uses `grunt-template-jasmine-requirejs` to run the test on with RequireJS.

### [**Complex RequireJS I**](https://github.com/maenu/grunt-template-jasmine-istanbul-example/tree/requirejs-client)

Uses `grunt-template-jasmine-requirejs` to run the test on with RequireJS, but this time doesn't screw up the RequireJS configuration by overriding the `baseUrl` option.
Instead, this example redirects requests that should point to instrumented sources on the **client** side.

### [**Complex RequireJS II**](https://github.com/maenu/grunt-template-jasmine-istanbul-example/tree/requirejs-server)

Uses `grunt-template-jasmine-requirejs` to run the test on with RequireJS, but this time doesn't screw up the RequireJS configuration by overriding the `baseUrl` option.
Instead, this example redirects requests that should point to instrumented sources on the **server** side.
