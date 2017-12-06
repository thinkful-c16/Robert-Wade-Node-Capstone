'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL ||
global.DATABASE_URL ||
'mongodb://dev:devpass@ds129966.mlab.com:29966/wizardly-app';

exports.TEST_DATABASE_URL = (
  process.env.TEST_DATABASE_URL ||
  'mongodb://localhost/wizardly-app');

exports.PORT = process.env.PORT || 8080;