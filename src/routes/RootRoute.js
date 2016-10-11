import App from '../components/app'
import Index from '../components/index'

export default {
  path: '/',
  component: App,
  childRoutes: [
    require('./LazyLoadRoute').default,
    require('./APIRoute').default
  ],
  indexRoute: {
    component: Index
  }
}

