'use strict';

/**
 * Environment variables and application configuration.
 */

var path = require('path'),
    _ = require('lodash');

var baseConfig = {
  app: {
    root: path.normalize(__dirname + '/../..'),
    env: process.env.NODE_ENV,
    secret: 'secret key' /* used in signing the jwt tokens */
  }
};

var platformConfig = {
  development: {
    app: {
      port: 8000
    },
  },

  test: {
    app: {
      port: 8001
    },
  },

  production: {
    app: {
      port: 8002,
    },
  }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')]);

