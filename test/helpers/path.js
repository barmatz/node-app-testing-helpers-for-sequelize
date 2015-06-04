'use strict';

var path = require('path'),
    args = require('yargs').argv;

module.exports = {
  getMigrationsPath: function () {
    var result = args.migrationsPath || path.resolve(process.cwd(), 'migrations');

    if (path.normalize(result) !== path.resolve(result)) {
      result = path.resolve(process.cwd(), result);
    }

    return result;
  }
};