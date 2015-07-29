'use strict';

var express = require('express'),
    app = express(),
    config  = require('./config');

// Express
require('./config/express')(app, config);

// Passport
require('./config/passport')(app, config);

// Routes
require('./config/routes')(app);

// MongoDB
require('./config/mongodb')(config.mongodb);

// `Not found` handler
app.use(function(req, res, next) {
  res.status(404);
  console.log('File not found! [' + req.url + ']');
  res.render('error/404');
});

// Start application
var server = app.listen(config.express.port, function() {
  console.log('Express server listening on port %d', server.address().port);
});
