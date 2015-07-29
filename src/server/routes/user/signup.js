'use strict';

var statuses = require('statuses'),
    userService = require('../../services/user');

module.exports = function(req, res) {
  var data = req.body || {};

  userService.signup(data, function(err, data) {
    if (err) {
      res.status(statuses('Unprocessable Entity')).send(err);
      return;
    }

    res.json(data);
  });
};
