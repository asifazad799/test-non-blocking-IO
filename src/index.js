const modulesRouter = require('express').Router();

const { blockMainThread, test } = require('./modules')

modulesRouter.use('/', blockMainThread);
modulesRouter.use('/', test)

module.exports = modulesRouter
