const {errorHandle} = require('../../handler/index')
const isRouteError = require('../routeErrorHandler/index')

const routeWrapper = (routePath, targetRoute) => {
  return (req, res) => {
    if (isRouteError(req, routePath)) {
      errorHandle(res, '無此網站路由', 404)
      return
    }
    return targetRoute.call(this, req, res)
  }
}

module.exports = routeWrapper
