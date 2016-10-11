import App from '../components/app'
import Index from '../components/index'

export default {
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [require('./LazyLoadRoute').default])
    })
    require.ensure([], (require) => {
      cb(null, [require('./APIRoute').default])
    })
  },
  indexRoute: {
    component: Index
  }
}

