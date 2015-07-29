'use strict';

var UserService = require('../../services/user'),
    FacebookStrategy = require('passport-facebook').Strategy;

function findBySocialProfile(profile, callback) {
  UserService.findBySocialProfile(profile, function(err, user) {
    if (err) {
      return callback(err);
    }

    if (user) {
      callback(null, user);
      return;
    }

    createUser(profile, callback);
  });
}

function createUser(profile, callback) {
  UserService.createUserBySocialProfile(profile, function(err, user) {
    if (err) { return callback(err); }
    callback(null, user);
  });
}

module.exports = function(options) {
  return new FacebookStrategy({
    clientID: options.clientId,
    clientSecret: options.clientSecret,
    callbackURL: options.callbackUrl,
    enableProof: options.enableProof,
    profileFields: options.profileFields
  }, function(accessToken, refreshToken, profile, callback) {
    findBySocialProfile(profile, callback);
  });
};
