const Router = require('express').Router
const Search = require('./search')

const apiRouter = new Router();

apiRouter.use('/search', Search)

module.exports = apiRouter;