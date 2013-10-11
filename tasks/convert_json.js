/*
 * grunt-convert-json
 * https://github.com/adamquadmon/grunt-convert-json
 *
 * Copyright (c) 2013 Luciano Amodio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var util = require('util');
  var pd = require('pretty-data').pd;

  grunt.registerMultiTask('convert_json', 'Convert a file to a json file', function () {
    var options = this.options({
      spaces:    2,
      delimiter: '|',
      minify:    false,
      onlyKeys:  false
    }),

    recoverProperType = function(data) {
      var type = {
        array: /\[*\]/,
        boolean: /true|false/i,
        number: /^\d+$/
      };
      if (type.array.test(data) || type.boolean.test(data) || type.number.test(data)) {
        return JSON.parse(data);
      }
      return data;
    };

    this.files.forEach(function (f) {
      var srcFiles = f.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));

      if (f.src.length < 1) {
        grunt.log.warn('Destination not written because no source files were found.');
        return;
      }

      var data;
      var srcType = f.src[0].split('.').pop();

      grunt.log.writeln('Converting "' + f.src + '".');

      if (srcType === 'txt') { // convert to JSON
        data = {};
        srcFiles.split(/\r?\n/).forEach(function (line) {
          var lineParts = line.split(options.delimiter);
          if (lineParts[0] && lineParts[1]) {
            lineParts[0] = lineParts[0].trim();
            lineParts[1] = recoverProperType(lineParts[1].trim());
          }
          data[lineParts[0]] = (options.onlyKeys) ? '' : lineParts[1];
        });

        data = JSON.stringify(data, null, options.spaces);
      } else if (srcType === 'json') { // convert to txt
        data = [];
        var jsonData = JSON.parse(srcFiles);
        for (var prop in jsonData) {
          data.push(prop + options.delimiter + ((options.onlyKeys) ? '' : jsonData[prop]) + '\n');
        }
      }

      if (srcType === 'txt') {
        data = (options.minify) ? pd.jsonmin(data) : pd.json(data);
      }

      grunt.file.write(f.dest, data);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" converted.');
    });
  });

};
