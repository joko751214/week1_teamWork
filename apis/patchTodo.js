const successHandle = require('../handler/successHandle')
const errorHandle = require('../handler/errorHandle')

const patchTodo = (req, res, body, todos) => {
  const id = req.url.split('/').pop()
  const index = todos.findIndex(item => item.id === id)
  try {
    const {title} = JSON.parse(body)
    if (title !== undefined && index !== -1) {
      todos[index].title = title
      successHandle(res, todos)
    } else if (title === undefined) {
      errorHandle(res, 'title 未正確填寫')
    } else if (index === -1) {
      errorHandle(res, '查無id')
    }
  } catch (err) {
    errorHandle(res, 'JSON 格式錯誤')
  }
}
module.exports = patchTodo
