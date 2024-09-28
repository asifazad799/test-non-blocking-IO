const nonBlockMainThread = require('express').Router();

const { test } = require('./controllers');

nonBlockMainThread.get('/test', test);

module.exports = nonBlockMainThread
