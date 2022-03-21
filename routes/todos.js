const {v4: uuidv4} = require('uuid')
const {HEADERS} = require('../utils/constant')
const {successHandle} = require('../handler/index')
const {postTodo, deleteTodo, patchTodo} = require('../apis/index')
const routeWrapper = require('./common/routeWrapper')

const routePath = 'todos'
const todos = [
  {
    title: '刷牙唷!',
    id: uuidv4(),
  },
]

const todosRoute = (req, res) => {
  let body = ''
  req.on('data', dataChunks => {
    body += dataChunks
  })

  const METHOD = req.method
  switch (METHOD) {
    case 'GET':
      successHandle(res, todos)
      break
    case 'POST':
      req.on('end', () => {
        postTodo(req, res, body, todos)
      })
      break
    case 'DELETE':
      deleteTodo(req, res, todos)
      break
    case 'PATCH':
      req.on('end', () => {
        patchTodo(req, res, body, todos)
      })
      break
    case 'OPTIONS':
      res.writeHead(200, HEADERS)
      res.end()
      break
    default:
      break
  }
}

module.exports = routeWrapper(routePath, todosRoute)
