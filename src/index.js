const modulesRouter = require('express').Router();

const { blockMainThread, nonBlockMainThread } = require('./modules')

modulesRouter.use( '/', blockMainThread );
modulesRouter.use( '/', nonBlockMainThread )

module.exports = modulesRouter
