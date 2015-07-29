'use strict';

module.exports = function(grunt, options) {
  return {
    main: {
      options: {
        targetDir: '<%= clientPath %>/scripts/lib',
        cleanTargetDir: false,
        install: true
      }
    }
  };
};
