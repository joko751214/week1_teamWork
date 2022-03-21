const routeErrorHandler = (req, routePath) => {
  let error = true
  const routePathName = routePath.split('/').filter(e => e)[0]
  const splitReqUrl = req.url.split('/').filter(e => e)

  if (splitReqUrl.includes(routePathName)) {
    if (req.url.startsWith(`/${routePathName}`)) {
      switch (req.method) {
        case 'DELETE':
        case 'PATCH':
          error = false
          break
        case 'GET':
        case 'POST':
        case 'OPTIONS':
        default:
          if (splitReqUrl.length === 1) error = false
          break
      }
    }
  }

  return error
}

module.exports = routeErrorHandler
