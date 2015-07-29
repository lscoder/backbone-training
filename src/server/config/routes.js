'use strict';

var path = require('path'),
    rootPath = path.join(__dirname, '../public'),
    passport = require('passport'),
    passportLocal = passport.authenticate('local'),
    passportFacebook = passport.authenticate('facebook', { scope: ['email'] });

module.exports = function(app) {
  app.post('/api/user/signin', passportLocal, require('../routes/user/signin'));
  app.post('/api/user/signup', require('../routes/user/signup'));
  app.get('/api/user/signout', require('../routes/user/signout'));

  // Facebook authentication
  app.get('/api/user/signin/facebook', passportFacebook);
  app.get('/api/user/signin/facebook/callback', passportFacebook, require('../routes/user/signin'));

  app.get('*', function(req, res) {
    res.sendFile('index.html', { root: rootPath });
  });
};
