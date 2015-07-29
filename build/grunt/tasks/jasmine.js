'use strict';

module.exports = function(grunt, options) {
  return {
    client: {
      src: '<%= clientPath %>/scripts/app/**.js',
      options: {
        keepRunner: true,
        specs: 'test/client/spec/**/**.js',
        template: require('grunt-template-jasmine-requirejs/src/template-jasmine-requirejs'),
        templateOptions: {
          requireConfigFile: '<%= clientPath %>/scripts/app/main.js',
          requireConfig: {
            baseUrl: '<%= clientPath %>/scripts/app'
          }
        }
      }
    }
  };
};
