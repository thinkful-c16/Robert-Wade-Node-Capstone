'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');

chai.should();

chai.use(chaiHttp);

describe('spells list', function () {
  it('should exist', function () {
    return chai.request(app)
      .get('/api/v1/spells')
      .then(function (res) {
        res.should.have.status(200);
      });
  });
});