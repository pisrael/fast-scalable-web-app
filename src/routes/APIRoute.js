
export default {
  path: 'api',
  getComponents(nextState, cb) {
    require.ensure([], function (require) {
      cb(null, require('../components/use-api').default)
    })
  }
}

