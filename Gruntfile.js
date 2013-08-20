/*
 * grunt-convert-json
 * https://github.com/adamquadmon/grunt-convert-json
 *
 * Copyright (c) 2013 Luciano Amodio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      all:     [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean:        {
      tmp: ['tmp/result/*.{json}']
    },

    // Configuration to be run (and then tested).
    convert_json: {
      text2json:     {
        files: [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test.txt'],
            dest:   'tmp',
            ext:    '.json'
          }
        ]
      },
      json2text:     {
        files: [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test.json'],
            dest:   'tmp',
            ext:    '.txt'
          }
        ]
      },
      text2jsonMinified:     {
        options: {
          minify: true
        },
        files: [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test_minified.txt'],
            dest:   'tmp',
            ext:    '.json'
          }
        ]
      },
      testToTextWithDelimiter: {
        options: {
          delimiter: '=>'
        },
        files:   [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test_delimiter.json'],
            dest:   'tmp',
            ext:    '.txt'
          }
        ]
      },
      testToJsonWithDelimiter: {
        options: {
          delimiter: '=>'
        },
        files:   [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test_delimiter.txt'],
            dest:   'tmp',
            ext:    '.json'
          }
        ]
      },
      testToJsonOnlyKeys:  {
        options: {
          onlyKeys: true
        },
        files:   [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test_only_keys.txt'],
            dest:   'tmp',
            ext:    '.json'
          }
        ]
      },
      testToTextOnlyKeys:  {
        options: {
          onlyKeys: true
        },
        files:   [
          {
            expand: true,
            cwd:    'test/fixtures/',
            src:    ['test_only_keys.json'],
            dest:   'tmp',
            ext:    '.txt'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit:     {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'convert_json', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'convert_json']);

};
