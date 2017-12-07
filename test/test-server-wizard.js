'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;
const seedWizardData = require('../wizards-seed-data');

const {Wizard}=require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// This function wraps all tests, to avoid table access errors.
describe('testing all wizard data', function(){

  before(function() {
    return runServer(TEST_DATABASE_URL, 8081);
  });

  beforeEach(function() {
    return Wizard.insertMany(seedWizardData);
  });

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint for wizard list on GET', function () {
    it('should return all wizards and give correct status', function() {
      let response;
      return chai.request(app)
        .get('/api/v1/wizards')
        .then(function(res) {
          response = res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Wizard.count();
        });
    });

    it('should return spells in expected format with expected fields on GET', function() {
      let resWizard;
      return chai
        .request(app)
        .get('/api/v1/wizards')
        .then(res=>{
          res.should.be.json;
          res.body.should.be.a('array');

          res.body.forEach(wizard=>{
            wizard.should.be.a('object');
            wizard.should.include.keys('name', 'level', 'intelligence', 'intelligenceModifier', 'maxPrepared', 'spellBook');  
          });
          resWizard = res.body[0];
          return Wizard.findById(resWizard._id);
        })
        .then(wizard=>{
          resWizard._id.should.equal(`${wizard._id}`);
          resWizard.name.should.equal(wizard.name);
          resWizard.level.should.equal(wizard.level);
          resWizard.intelligence.should.equal(wizard.intelligence);
          resWizard.intelligenceModifier.should.equal(wizard.intelligenceModifier);
          resWizard.maxPrepared.should.equal(wizard.maxPrepared);
        });
    });
  });

  // describe('POST endpoint for wizard list', function () {
  //   it('should add a wizard on POST', function () {
  //     const newWizard={name: 'Testopheles', level: 14, intelligence: 17, intelligenceModifier: 3, maxPrepared: 17}
  //   });
  // });

  // describe('PUT endpoint for wizard list', function () {
  //   //
  // });

  // describe('DELETE endpoint for wizard list', function () {
  //   //
  // });

});