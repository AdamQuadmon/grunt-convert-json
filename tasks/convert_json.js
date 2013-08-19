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
  var fs = require('fs');
  var pd = require('pretty-data').pd;

  grunt.registerMultiTask('convert_json', 'Convert a file to a json file', function () {
    var options = this.options({
      inline: 2,
      spaces: 2
    });

    this.files.forEach(function (f) {
      var srcFiles = f.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed)); // Read source files.

      if (f.src.length < 1) {
        // No src files, issued warn and goto next target.
        grunt.log.warn('Destination not written because no source files were found.');
        return;
      }

      console.log(srcFiles)
      // Convert to json type
      var data,
          srcType = f.src[0].split('.').pop()
        , destType = f.dest.split('.').pop();

      if(srcType === 'txt'){
        data = {};
        srcFiles.split(/\r?\n/).forEach(function (line) {
          var lineParts = line.split('|');
          data[lineParts[0]] = lineParts[1];
        });

        data = JSON.stringify(data, null, options.spaces);
      } else if(srcType === 'json'){
        data = [];
        var jsonData = JSON.parse(srcFiles);
        for(var prop in jsonData){
          data.push(prop + '|'  + '\n');
        }
      }

      if(srcType === 'txt'){
        grunt.file.write(f.dest, pd.jsonmin(data));
      } else {
        grunt.file.write(f.dest, data);
      }


      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" converted.');
    });
  });

};
