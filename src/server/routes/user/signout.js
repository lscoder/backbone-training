'use strict';

var statuses = require('statuses');

module.exports = function(req, res) {
  req.logout();
  res.status(statuses('Ok')).end();
};
