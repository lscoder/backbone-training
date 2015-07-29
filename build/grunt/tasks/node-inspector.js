'use strict';

module.exports = function() {
  return {
    dev: {
      options: {
        'web-port': 1337,
        'hidden': ['node_modules']
      }
    }
  };
};
