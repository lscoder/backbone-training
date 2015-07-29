'use strict';

module.exports = function(user, done) {
  done(null, {
    id: user._id.toString()
  });
};
