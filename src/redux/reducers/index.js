const Actions = require('../actions')

function fetchItems (state = {}, action) {
    switch (action.type) {
        case Actions.types.FETCH_ITEMS:
            return Object.assign({}, state, {
                isFetching: action.status === Actions.status.FETCHING,
                hasError: action.status === Actions.status.ERROR,
                msg: action.msg,
                items: action.items
            })
        default:
            return state
    }
}

module.exports = fetchItems 