import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { fetchItemsIfNeeded, fetchItemsFromServer } from '../../redux/actions'

export class UseAPI extends Component {

    static fetchData(store) {
        return store.dispatch(fetchItemsFromServer())
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(fetchItemsIfNeeded())
    }

    render() {
        let items;
        if (this.props.items) {
            items = this.props.items.map(item=>(<div>{item}</div>))
        }
        return (
            <div>
                <h2>Use API</h2>
                <p>
                The content below is obtained by calling an async API
                </p>
                {items}
            </div>
        )
    }
}

UseAPI.propTypes = {
    items: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    const { items } = state

    return {
        items: items || []
    }
}

export default connect(mapStateToProps)(UseAPI)
