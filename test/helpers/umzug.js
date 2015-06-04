'use strict';

var _ = require('lodash'),
    path = require('path'),
    config = require('./config');

module.exports = {
  getStorageOption: function (property, fallback) {
    return config.readConfig()[property] || fallback;
  },
  getStorage: function () {
    return this.getStorageOption('migrationStorage', 'sequelize');
  },
  getStoragePath: function () {
    var fallbackPath = path.join(process.cwd(), 'sequelize-meta.json');

    return this.getStorageOption('migrationStoragePath', fallbackPath);
  },
  getTableName: function () {
    return this.getStorageOption('migrationStorageTableName', 'SequelizeMeta');
  },
  getStorageOptions: function (extraOptions) {
    var options = {};

    if (this.getStorage() === 'json') {
      options.path = this.getStoragePath();
    } else {
      options.tableName = this.getTableName();
    }

    _.assign(options, extraOptions);

    return options;
  }
};