'use strict';

module.exports = function(grunt, options) {
  return {
    html: {
      files: ['src/client/**/*.html'],
      tasks: ['copy:clientHtml', 'notify:copyClientHtml']
    },
    server: {
      files: ['src/server/**/*.js', 'src/server/**/*.jade'],
      tasks: ['jshint:server', 'copy:server', 'notify:copyServerScripts']
    },
    pkg: {
      files: ['package.json'],
      tasks: ['copy:pkg']
    },
    procfile: {
      files: ['Procfile'],
      tasks: ['copy:procfile']
    },
    clientScripts: {
      files: ['src/client/scripts/**/*.js'],
      tasks: ['jshint:client', 'copy:clientScripts', 'notify:copyClientScripts']
    },
    testClient: {
      files: ['test/client/spec/**/*.js'],
      tasks: ['jshint:testClient', 'jasmine:client', 'notify:jasmineClientTests']
    },
    sass: {
      files: ['src/**/*.scss'],
      tasks: ['sass', 'notify:sass']
    }
  };
};
