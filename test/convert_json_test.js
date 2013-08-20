'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.convert_json = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  convertToJson: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test.json');
    var expected = grunt.file.read('test/expected/test.json');
    test.equal(actual, expected, 'should convert a Txt file to a Json one');

    test.done();
  },
  convertToTxt: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test.txt');
    var expected = grunt.file.read('test/expected/test.txt');
    test.equal(actual, expected, 'should convert a Json file to a Txt one.');

    test.done();
  },
  convertToJsonMinified: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test_minified.json');
    var expected = grunt.file.read('test/expected/test_minified.json');
    test.equal(actual, expected, 'should convert a Txt file to a Json minified one');

    test.done();
  },
  optionsDelimiter: function(test) {
    test.expect(2);

    var actualTxt = grunt.file.read('tmp/test_delimiter.txt');
    var expectedTxt = grunt.file.read('test/expected/test_delimiter.txt');
    test.equal(actualTxt, expectedTxt, 'should convert a Json file to a Txt one with the right delimiter.');

    var actualJson = grunt.file.read('tmp/test_delimiter.json');
    var expectedJson = grunt.file.read('test/expected/test_delimiter.json');
    test.equal(actualJson, expectedJson, 'should convert a Txt file reading the right delimiter to a Json one.');

    test.done();
  },
  optionsOnlyKeys: function(test) {
    test.expect(2);

    var actualTxt = grunt.file.read('tmp/test_only_keys.txt');
    var expectedTxt = grunt.file.read('test/expected/test_only_keys.txt');
    test.equal(actualTxt, expectedTxt, 'should convert a Json file to a txt with only keys.');

    var actualJson = grunt.file.read('tmp/test_only_keys.json');
    var expectedJson = grunt.file.read('test/expected/test_only_keys.json');
    test.equal(actualJson, expectedJson, 'should convert a Text file to a Json one with only keys.');

    test.done();
  }
};
