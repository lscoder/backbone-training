'use strict';

var _ = require('lodash'),
    UserModel = require('../models/user');

module.exports = {
  createUser: function(model, callback) {
    var user = new UserModel(model);
    callback = callback || function() { };

    user.save(function(err, savedModel) {
      if (err) {
        callback(err);
      }

      callback(null, savedModel);
    });
  },

  signup: function(data, callback) {
    var credentials = data.credentials || {};

    var modelData = _.extend({}, data, {
      accounts: {
        local: {
          username: credentials.username,
          password: credentials.password
        }
      }
    });

    this.createUser(modelData, callback);
  },

  signin: function(username, password, callback) {
    var criteria = {
      $or: [{
        email: username
      }, {
        'accounts.local.username': username
      }]
    };

    UserModel.where(criteria).findOne(function(err, user) {
      if (err) {
        callback(err, null);
      } else if (!user) {
        callback(null, null);
      } else {
        user.comparePassword(password, function(err, isMatch) {
          callback(null, isMatch ? user : null);
        });
      }
    });
  },

  createUserBySocialProfile: function(profile, callback) {
    var model = this.createModelFromSocialProfile(profile);

    this.createUser(model, callback);
  },

  createModelFromSocialProfile: function(profile) {
    var email = profile.emails[0].value,
        model = {
          name: profile.displayName,
          email: email,
          gender: (profile.gender).toUpperCase().substring(0, 1),
          accounts: {}
        };

    model.accounts[profile.provider] = {
      id: profile.id,
      email: email,
      url: profile.profileUrl,
      pictureUrl: profile.photos[0].value
    };

    return model;
  },

  findBySocialProfile: function(profile, callback) {
    var criteria = { },
        socialProfileIdPath = ['accounts', profile.provider, 'id'].join('.');

    criteria[socialProfileIdPath] = profile.id;

    UserModel.findOne(criteria, callback);
  },

  findByEmail: function(email, callback) {
    UserModel.findOne({ email: email }, callback);
  }

};
