const {successHandle, errorHandle} = require('../handler/index')

const deleteTodo = (req, res, todos) => {
  const splitUrl = req.url.split('/').filter(e => e)

  switch (splitUrl.length) {
    case 1:
      todos.length = 0
      successHandle(res, todos)
      break
    case 2: // delete specific id
      const index = todos.findIndex(e => e.id === splitUrl[1])
      if (index !== -1) {
        todos.splice(index, 1)
        successHandle(res, todos)
      } else {
        errorHandle(res, '此id不存在')
      }
      break
    default:
      errorHandle(res, '此id不存在')
      break
  }
}

module.exports = deleteTodo
