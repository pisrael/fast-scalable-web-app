
export default {
  path: 'lazyload',
  getComponents(nextState, cb) {
    require.ensure([], function (require) {
      cb(null, require('../components/lazy-load').default)
    })
  }
}

