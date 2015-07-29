'use strict';

module.exports = function(grunt, options) {
  var files = {
    '<%= clientPath %>/styles/main.css': 'src/client/styles/main.scss'
  };

  return {
    dev: {
      options: {
        style: 'expanded'
      },
      files: files
    },
    prod: {
      options: {
        style: 'compressed'
      },
      files: files
    }
  };
};
