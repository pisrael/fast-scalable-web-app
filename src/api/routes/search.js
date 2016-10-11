const Router = require('express').Router
const searchCtrl = require('../controllers/search')

const searchAPI = new Router();

searchAPI.post('/', (req, res) => {
    res.json(searchCtrl.search())
})

module.exports = searchAPI;