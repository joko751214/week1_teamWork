const successHandle = require('../handler/successHandle')
const errorHandle = require('../handler/errorHandle')

const deletTodo = (req, res, todos) => {
  const splitUrl = req.url.split('/').filter(e => e)
  const isDeleteAll = splitUrl.length === 1

  if (isDeleteAll) {
    // delete all
    todos.length = 0
    successHandle(res, todos)
  } else {
    // delete specific id
    const index = todos.findIndex(e => e.id === splitUrl[1])

    if (index !== -1) {
      todos.splice(index, 1)
      successHandle(res, todos)
    } else {
      errorHandle(res, '此id不存在')
    }
  }
}

module.exports = deletTodo
