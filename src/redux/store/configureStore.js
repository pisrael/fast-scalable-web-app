const Redux = require('redux')
const ReduxThunk = require('redux-thunk').default
const reducer = require('../reducers')

module.exports = function configureStore(preloadedState) {
    return Redux.createStore(
        reducer,
        preloadedState,
        Redux.applyMiddleware(ReduxThunk)
    )
}