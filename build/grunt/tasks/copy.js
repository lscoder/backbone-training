'use strict';

module.exports = function(grunt, options) {
  return {
    pkg: {
      files: [
        {
          src: 'package.json',
          dest: '<%= targetPath %>/package.json'
        }
      ]
    },
    procfile: {
      files: [
        {
          src: 'Procfile',
          dest: '<%= targetPath %>/Procfile'
        }
      ]
    },
    server: {
      files: [
        {
          expand: true,
          cwd: 'src/server/',
          src: ['**/*.js', '**/*.jade'],
          dest: '<%= serverPath %>'
        }
      ]
    },
    clientHtml: {
      files: [
        {
          expand: true,
          cwd: 'src/client/',
          src: '**/*.html',
          dest: '<%= clientPath %>'
        }
      ]
    },
    clientScripts: {
      files: [
        {
          expand: true,
          cwd: 'src/client/scripts/',
          src: '**/*.js',
          dest: '<%= clientPath %>/scripts/app/'
        }
      ]
    },
    nodeModules: {
      files: [
        {
          expand: true,
          cwd: 'node_modules',
          src: '**/*.*',
          dest: '<%= targetPath %>/node_modules'
        }
      ]
    }
  };
};
