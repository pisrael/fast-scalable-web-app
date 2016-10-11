const fetch = require('isomorphic-fetch')

//ACTION TYPES
const FETCH_ITEMS = 'FETCH_ITEMS'

//STATUS CONSTS
const FETCHING = 'fetching'
const SUCCESS = 'success'
const ERROR = 'error'


function shouldFetchItems(state) {
    if (!state.items) {
        return true
    } else if (state.items.isFetching) {
        return false
    } else {
        return state.items.hasError
    }
}

function receiveItems(items) {
    return {
        type: FETCH_ITEMS,
        status: SUCCESS,
        items
    }
}

function errorFetchingItems(msg) {
    return {
        type: FETCH_ITEMS,
        status: ERROR,
        msg
    }
}

function fetchItems() {
    return dispatch => {
        return fetch('/api/search', { method: 'POST' })
            .then(res => res.json())
            .then(json => dispatch(receiveItems(json)))
            .catch(err => dispatch(errorFetchingItems(err.msg)))
    }
}

function fetchItemsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchItems(getState())) {
            return dispatch(fetchItems())
        }
    }
}

module.exports = {
    types: {
        FETCH_ITEMS
    },

    status: {
        FETCHING,
        SUCCESS,
        ERROR
    },

    receiveItems,
    errorFetchingItems,
    fetchItems,
    fetchItemsIfNeeded
}
