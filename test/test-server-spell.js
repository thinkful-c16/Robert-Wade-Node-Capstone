'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;
const seedSpellData = require('../spells-seed-data');

const {Spell}=require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

// This function wraps all tests, to avoid table access errors.
describe('testing all spell data', function(){ 

  before(function() {
    return runServer(TEST_DATABASE_URL, 8081);
  });

  beforeEach(function() {
    return Spell.insertMany(seedSpellData);
  });

  after(function() {
    return closeServer();
  });

  afterEach(function() {
    return mongoose.connection.db.dropDatabase();
  });

  describe('GET endpoint for master spell list', function () {
    it('should return all spells and give correct status on GET', function() {
      let response;
      return chai.request(app)
        .get('/api/v1/spells')
        .then(function(res) {
          response = res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return Spell.find({ classes: { $in: [ 'wizard' ] } }).count();
        })
        .then(function(count) {
          response.body.should.have.lengthOf(count);
        });
    });

    it('should return spells in expected format with expected fields on GET', function() {
      let resSpell;
      return chai
        .request(app)
        .get('/api/v1/spells')
        .then(res=>{
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(spell=>{
            spell.should.be.a('object');
            spell.should.include.keys('name', 'description', 'level', 'type');  
          });
          resSpell = res.body[0];
          return Spell.findById(resSpell._id);
        })
        .then(spell=>{
          resSpell._id.should.equal(`${spell._id}`);
          resSpell.name.should.equal(spell.name);
          resSpell.description.should.equal(spell.description);
        });
    });
  });

  // describe('POST endpoint for spell list', function () {
  //   it('should add a spell on POST', function () {
  //     const newSpell={
  //       name: 'Testopheles',
  //       level: 14,
  //       intelligence: 17,
  //       intelligenceModifier: 3,
  //       maxPrepared: 17
  //     };
  //     return chai.request(app)
  //       .post('/api/v1/spells')
  //       .send(newSpell)
  //       .then(function(res){
  //         res.should.have.status(201);
  //         res.should.be.json;
  //         res.body.should.be.a('object');
  //         res.body.should.include.keys('_id', 'name');
  //         res.body.should.not.be.null;
  //         res.body.name.should.equal(newSpell.name);
  //         res.body.level.should.equal(newSpell.level);
  //         res.body.intelligence.should.equal(newSpell.intelligence);
  //         res.body.intelligenceModifier.should.equal(newSpell.intelligenceModifier);
  //         res.body.maxPrepared.should.equal(newSpell.maxPrepared);
  //       });
  //   });
  // });

  // describe('PUT endpoint for spell list', function () {
  //   it('should update a spell on PUT', function(){
  //     const updatespell={
  //       name: 'Shazam',
  //       level: 6,
  //       intelligence: 18
  //     };
  //     return chai.request(app)
  //       .get('/api/v1/spells')
  //       .then(function(res){
  //         updatespell.id=res.body[0]._id;
  //         return chai.request(app)
  //           .put(`/api/v1/spells/${updatespell.id}`)
  //           .send(updatespell);
  //       })
  //       .then(function(res){
  //         res.should.have.status(204);
  //       });
  //   });
  // });

  // describe('DELETE endpoint for spell list', function () {
  //   it('should delete a spell on DELETE', function(){
  //     return chai.request(app)
  //       .get('/api/v1/spells')
  //       .then(function(res){
  //         return chai.request(app)
  //           .delete(`/api/v1/spells/${res.body[0]._id}`);
  //       })
  //       .then(function(res){
  //         res.should.have.status(204);
  //       });
  //   });
  // });  
});