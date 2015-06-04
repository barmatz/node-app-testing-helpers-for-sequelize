'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    Umzug = require('umzug'),
    db = require('../../models'),
    umzug = require('./umzug'),
    path = require('./path'),
    Sequelize = db.Sequelize,
    sequelize = db.sequelize;

function migrate() {
  var migrator = new Umzug({
    storage: umzug.getStorage(),
    storageOptions: umzug.getStorageOptions({ sequelize: sequelize }),
    logging: console.log,
    migrations: {
      params: [ sequelize.getQueryInterface(), Sequelize ],
      path: path.getMigrationsPath(),
      pattern: /\.js$/,
      wrap: function (callback) {
        if (callback.length === 3) {
          return Promise.promisify(callback);
        } else {
          return callback;
        }
      }
    }
  });

  return migrator.pending();
}

module.exports = _.assign({
  setup: function (done) {
    sequelize.authenticate()
      .then(function () {
        return migrate();
      })
      .then(function () {
        return sequelize.sync();
      })
      .then(function () {
        done();
      })
      .catch(done);
  },
  teardown: function (done) {
    var queryInterface = sequelize.getQueryInterface();

    Promise.all([
      queryInterface.dropAllTables(),
      queryInterface.dropAllEnums()
    ]).then(function () {
      done();
    }).catch(done);
  }
}, db);