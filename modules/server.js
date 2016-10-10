const express = require('express')
const path = require('path')
const compression = require('compression')

const React = require('react')

const ReactRouter = require('react-router')
const handleServerRender = require('./handleServerRender')
const routes = require('./server.routes.bundle').default;

var app = express()
app.use(compression())

// serve our static stuff
app.use(express.static(path.join(__dirname, '..', 'public')))


// send all requests to index.html so browserHistory in React Router works
app.get("*", function (req, res) {
    // match the routes to the url
    ReactRouter.match({ routes: routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search)
        } else if (props) {
            res.send(handleServerRender(props))
        } else {
            res.status(404).send('Not Found')
        }
    })
})

var PORT = process.env.PORT || 5000
const httpServer = require('http').createServer(app);

httpServer.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})

