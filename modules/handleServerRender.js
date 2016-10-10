const React = require('react')
const Provider = React.createFactory(require('react-redux').Provider)
const RouterContext = React.createFactory(require('react-router').RouterContext)
const ReactDOMServer = require('react-dom/server')
const Redux = require('redux')
const reducer = require('./reducers')


const handleServerRender = (props) => {
    //creates a new state object
    const store = Redux.createStore(reducer)

    //renders the app
    const appHtml = ReactDOMServer.renderToString(Provider({ store }, RouterContext(Object.assign({}, props))))

    //passes the preloaded state
    return renderPage(appHtml, store.getState())
}

function renderPage(appHtml, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>My Fast App</title>
      </head>
      <body>
        <div id="app">${appHtml}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `
}


module.exports = handleServerRender