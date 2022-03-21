const {HEADERS} = require('../utils/constant')

function successHandle(res, todos) {
  res.writeHead(200, HEADERS)
  res.write(
    JSON.stringify({
      status: 'success',
      todos,
    })
  )
  res.end()
}

module.exports = successHandle
