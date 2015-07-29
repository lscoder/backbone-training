'use strict';

module.exports = {
  runBuildOnly: function(grunt) {
    return (grunt.cli.tasks.length === 0) ||
           (grunt.cli.tasks.length === 1 && grunt.cli.tasks[0] === 'build');
  }
};
