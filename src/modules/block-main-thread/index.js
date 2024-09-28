const blockMainThread = require('express').Router();

const { block } =  require('./controllers');

blockMainThread.get('/block',block);

module.exports = blockMainThread