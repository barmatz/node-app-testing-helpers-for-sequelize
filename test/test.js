'use strict';

process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    db = require('./helpers/sequelize');

 describe('A test', function () {
  beforeEach(function (done) {
    this.timeout(10000);
    db.setup(done);
  });
  
  afterEach(function (done) {
    this.timeout(10000);
    db.teardown(done);
  });

  it('can do something', function () {
    expect(1).to.be.ok;
  });
});