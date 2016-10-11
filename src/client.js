import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import routes from './routes/RootRoute'
import configureStore from './redux/store/configureStore'

//creates the store using the preloaded state sent from the server at window._PRELOADED_STATE_
let store = configureStore(window.__PRELOADED_STATE__)

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  render(
    <Provider store={store}>
      <Router routes={routes} history={createHistory()} />
    </Provider>,
    document.getElementById('app')
  )
})

