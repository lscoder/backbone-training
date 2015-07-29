'use strict';

var _ = require('lodash');

module.exports = function(grunt, options) {
  var jshintrc = grunt.file.readJSON('.jshintrc'),
      taskOptions = _.extend(_.clone(jshintrc), {
        unused: false,
        reporter: require('jshint-stylish')
      });

  return {
    options: taskOptions,
    server: {
      options: {
        node: true
      },
      files: {
        src: ['src/server/**/*.js']
      }
    },
    client: ['src/client/scripts/**/*.js'],
    testClient: ['test/client/spec/**/*.js']
  };
};
