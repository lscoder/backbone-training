'use strict';

module.exports = function(grunt, options) {
  return {
    target: ['<%= targetPath %>'],
    test: ['_SpecRunner.html']
  };
};
