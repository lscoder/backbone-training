'use strict';

module.exports = function(grunt, options) {
  return {
    build: {
      options: {
        title: 'Build complete',
        message: 'All the grunt tasks are finished.'
      }
    },
    test: {
      options: {
        title: 'Tests complete',
        message: 'All tests tasks are finished.'
      }
    },
    copyClientHtml: {
      options: {
        title: 'Client HTML',
        message: 'Task complete.'
      }
    },
    copyClientScripts: {
      options: {
        title: 'Client Scripts',
        message: 'Client scripts copy complete.'
      }
    },
    copyServerScripts: {
      options: {
        title: 'Server Scripts',
        message: 'Server scripts copy complete.'
      }
    },
    jasmineClientTests: {
      options: {
        title: 'PASSED',
        message: 'All client-side Jasmine tests passed.'
      }
    },
    sass: {
      options: {
        title: 'SASS',
        message: 'Task complete'
      }
    }
  };
};
