'use strict';

var passport = require('passport'),
    localStrategy = require('../passport/strategies/local'),
    facebookStrategy = require('../passport/strategies/facebook'),
    userSerializer = require('../passport/serialization/serializer'),
    userDeserializer = require('../passport/serialization/deserializer');

module.exports = function(app, config) {
  passport.use(localStrategy());
  passport.use(facebookStrategy(config.passport.facebook));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(userSerializer);
  passport.deserializeUser(userDeserializer);
};

