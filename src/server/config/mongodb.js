'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {
  var connection = mongoose.connection;
  var connect = function() {
    mongoose.connect(config.uri, config.options);
  };

  connection.on('open', function() {
    console.log('mongoose::open');
  });

  connection.on('disconnecting', function() {
    console.log('mongoose::disconnecting');
  });

  connection.on('disconnected', function() {
    console.log('mongoose::disconnected');
    setTimeout(connect, 1000);
  });

  connection.on('close', function() {
    console.log('mongoose::close');
  });

  connection.on('error', function(err) {
    console.log('mongoose::error', err);
  });

  connect();
};
