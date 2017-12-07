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

  describe('POST endpoint for wizard list', function () {
    it('should add a wizard on POST', function () {
      const newWizard={
        name: 'Testopheles',
        level: 14,
        intelligence: 17,
        intelligenceModifier: 3,
        maxPrepared: 17
      };
      return chai.request(app)
        .post('/api/v1/wizards')
        .send(newWizard)
        .then(function(res){
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys('_id', 'name');
          res.body.should.not.be.null;
          res.body.name.should.equal(newWizard.name);
          res.body.level.should.equal(newWizard.level);
          res.body.intelligence.should.equal(newWizard.intelligence);
          res.body.intelligenceModifier.should.equal(newWizard.intelligenceModifier);
          res.body.maxPrepared.should.equal(newWizard.maxPrepared);
        });
    });
  });

  describe('PUT endpoint for wizard list', function () {
    it('should update a wizard on PUT', function(){
      const updateWizard={
        name: 'Shazam',
        level: 6,
        intelligence: 18
      };
      return chai.request(app)
        .get('/api/v1/wizards')
        .then(function(res){
          updateWizard.id=res.body[0]._id;
          return chai.request(app)
            .put(`/api/v1/wizards/${updateWizard.id}`)
            .send(updateWizard);
        })
        .then(function(res){
          res.should.have.status(204);
        });
    });
  });

  describe('DELETE endpoint for wizard list', function () {
    it('should delete a wizard on DELETE', function(){
      return chai.request(app)
        .get('/api/v1/wizards')
        .then(function(res){
          return chai.request(app)
            .delete(`/api/v1/wizards/${res.body[0]._id}`);
        })
        .then(function(res){
          res.should.have.status(204);
        });
    });
  });
});