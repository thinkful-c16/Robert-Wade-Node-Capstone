'use strict';

const express = require('express');

const data = require('./spells-seed-data');

console.log(data);

const app = express();

app.use(express.static('public'));

app.get('/api/v1/spells', (req, res) => {
  res.status(200).json(data);
});

app.get('/api/v1/spells/:id', (req, res) => {
  res.json(data[req.params.id]);
});

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function () {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = app;