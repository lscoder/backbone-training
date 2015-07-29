'use strict';

var path = require('path');
var extend = require('extend');
var pkgJson = require('../package.json');

var appConfig = {
  app: {
    name: pkgJson.name,
    version: pkgJson.version,
    description: pkgJson.description,
    author: pkgJson.author
  },
  envs: {
    common: {
      express: {
        static: {
          path: path.join(__dirname, '../public'),
          index: ['index.htm', 'index.html'],
        },
        views: {
          path: path.join(__dirname, '../app/views'),
          engine: 'jade'
        },
        cookie: {
          secret: process.env.WEB_COOKIE_SECRET || '01234567890123456789',
          options: {
            path: '/'
          }
        },
        session: {
          name: process.env.WEB_SESSION_NAME || 'SessionID',
          secret: process.env.WEB_SESSION_SECRET || '01234567890123456789',
          resave: (process.env.WEB_SESSION_RESAVE || 'false') === 'true',
          saveUninitialized: (process.env.WEB_SESSION_SAVE_UNINITIALIZED || 'false') === 'true'
        },
        compression: {
          threshold: parseInt(process.env.WEB_COMPRESSION_THRESHOLD || 512)
        }
      },
      passport: {
        facebook: {
          clientId: process.env.PASSPORT_FACEBOOK_CLIENT_ID,
          clientSecret: process.env.PASSPORT_FACEBOOK_CLIENT_SECRET,
          callbackUrl: process.env.PASSPORT_FACEBOOK_CALLBACK_URL,
          enableProof: process.env.PASSPORT_FACEBOOK_ENABLE_PROOF || false,
          profileFields: ['id', 'displayName', 'first_name', 'last_name', 'gender', 'emails', 'profileUrl', 'photos']
        }
      },
      mongodb: {
        uri: process.env.DB_MONGODB_URI,
        options: {
          server: {
            socketOptions: {
              keepAlive: 1
            }
          }
        }
      }
    },
    development: {
      express: {
        port: parseInt(process.env.PORT || 3000)
      }
    },
    production: {
      express: {
        port: parseInt(process.env.PORT || 80)
      }
    },
    test: {
    }
  }
};

function getEnvConfig(appConfig, env) {
  var config = extend({}, appConfig.envs.common);

  return extend(true, config, appConfig.envs[env] || {});
}

function getConfig(appConfig) {
  var env = process.env.NODE_ENV || 'development';
  console.log('Reading configuration (ENV: ' + env + ')');

  var config = {
    env: env,
    app: appConfig.app
  };

  return extend({}, config, getEnvConfig(appConfig, env));
}

module.exports = getConfig(appConfig);
