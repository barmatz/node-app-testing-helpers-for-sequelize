'use strict';

var args = require('yargs').argv;

module.exports = {
  getEnvironment: function () {
    return args.env || process.env.NODE_ENV || 'development';
  }
};