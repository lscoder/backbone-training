'use strict';
var userService = require('../../services/user'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  return new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done) {
      userService.signin(username, password, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        return done(null, user);
      });
    }
  );
};
