'use strict';

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    responseTime = require('response-time'),
    serveStatic = require('serve-static'),
    errorhandler = require('errorhandler'),
    compression = require('compression'),
    flash = require('connect-flash');

module.exports = function(app, config) {
  // View engine setup
  app.set('views', config.express.views.path);
  app.set('view engine', config.express.views.engine);

  // Middlewares
  app.use(flash());
  app.use(responseTime());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(session({
    name: config.express.session.name,
    secret: config.express.session.secret,
    resave: config.express.session.resave,
    saveUninitialized: config.express.session.saveUninitialized
  }));

  app.use(compression({ threshold: config.express.compression.threshold }));
  app.use(cookieParser(config.express.cookie.secret, config.express.cookie.options));
  app.use(serveStatic(config.express.static.path, { index: config.express.static.index }));

  // Development settings
  if (config.env === 'development') {
    app.use(errorhandler());
  }
};
