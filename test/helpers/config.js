'use strict';

var _ = require('lodash'),
    path = require('path'),
    args = require('yargs').argv,
    generic = require('./generic');

module.exports = {
  readConfig: function (options) {
    var env = generic.getEnvironment();

    options = _.assign({ logging: true }, options || {});

    if (!this.config) {
      if (args.url) {
        this.config = this.parseDbUrl(args.url);
      } else {
        try {
          this.config = require(this.getConfigFile());
        } catch (e) {
          throw new Error('Error reading "' + this.relativeConfigFile() + '". Error: ' + e.message);
        }
      }

      if (typeof this.config !== 'object') {
        throw new Error('Config must be an object: ' + this.relativeConfigFile());
      }

      if (options.logging) {
        if (args.url) {
          console.log('Parsed url ' + args.url);
        } else {
          console.log('Loaded configuration file "' + this.relativeConfigFile() + '".');
        }
      }

      if (this.config[env]) {
        if (options.logging) {
          console.log('Using environment "' + env + '".');
        }

        this.config = this.config[env];
      }
    }

    return this.config;
  },
  relativeConfigFile: function () {
    return path.relative(process.cwd(), this.getConfigFile());
  },
  getConfigFile: function () {
    if (args.config) {
      return path.resolve(process.cwd(), args.config);
    }

    return path.resolve(process.cwd(), 'config', 'config.json');
  }
};