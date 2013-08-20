# grunt-convert-json

> Convert a text file to a json file reading lines and splitting them on delimiter.
> Useful for create config file from a simple text source.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-convert-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-convert-json');
```

## The "convert_json" task

### Overview
In your project's Gruntfile, add a section named `convert_json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  convert_json: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.spaces
Type: `Int`
Default value: `'2'`

Spaces for JSON converter.

#### options.delimiter
Type: `Int`
Default value: `'|'`

The token used to split lines in key/values pairs.

#### options.minify
Type: `Boolean`
Default value: `false`

On true minify JSON output.

#### options.onlyKeys
Type: `Boolean`
Default value: `false`

On true will output only keys (values are blank for txt and empty strings for .json).

### Usage Examples

see `Gruntfile.js` for examples, look also at `test/convert_json_test.js`.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**0.1.0** First relase.
**0.1.1** Options and tests.
