'use strict';

const express = require('express');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

// const data = require('./spells-seed-data');

const {Spell, Wizard}=require('./models');

// console.log(data);

const app = express();

app.use(express.static('public'));

// app.get('/api/v1/spells', (req, res) => {
//   res.status(200).json(data);
// });

// app.get('/api/v1/spells/:id', (req, res) => {
//   res.json(data[req.params.id]);
// });

// endpoints for spells

app.get('/api/v1/spells', (req, res) => {
  Spell
    .find()
    .then(spells=>{
      res.status(200).json(spells);
    })
    .catch(err=>{
      console.error(err);
      res.status(500).json({error: 'Something went wrong.'});
    });
});

app.get('/api/v1/spells/:id', (req, res) => {
  Spell
    .findById(req.params.id)
    .then(spell => {
      res.status(200).json(spell);
    })
    .catch(err=>{
      console.error(err);
      res.status(500).json({error: 'Something went wrong.'});
    });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise ((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
  // app.listen(process.env.PORT || 8080, function () {
  //   console.info(`App listening on ${this.address().port}`);
  // });
}

module.exports = {app, runServer, closeServer};