'use strict';

module.exports = function(grunt, options) {
  return {
    dev:  {
      tasks: ['nodemon', 'node-inspector', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  };
};
