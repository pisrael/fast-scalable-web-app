import React from 'react'
import { match, Router } from 'react-router'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import routes from './routes/RootRoute'
import reducer from './reducers/index'

//creates the store using the preloaded state sent from the server at window._PRELOADED_STATE_
let store = createStore(reducer, window.__PRELOADED_STATE__)

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

