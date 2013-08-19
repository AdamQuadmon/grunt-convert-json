/*
 * grunt-convert-json
 * https://github.com/adamquadmon/grunt-convert-json
 *
 * Copyright (c) 2013 Luciano Amodio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tmp: ['tmp/result/*.{json}']
    },

    // Configuration to be run (and then tested).
    convert_json: {
      text2json: {
        files: [
          {
            expand: true,           // Enable dynamic expansion.
            cwd: 'test/fixtures/',  // Src matches are relative to this path.
            src: ['**/*.txt'],      // Actual pattern(s) to match.
            dest: 'tmp',    // Destination path prefix.
            ext: '.json'
          }
        ]
      },
      json2text: {
        files: [
          {
            expand: true,           // Enable dynamic expansion.
            cwd: 'test/fixtures/',  // Src matches are relative to this path.
            src: ['**/*.json'],      // Actual pattern(s) to match.
            dest: 'tmp',    // Destination path prefix.
            ext: '.txt'
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'convert_json', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'convert_json:text2json']);

};
