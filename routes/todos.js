const {v4: uuidv4} = require('uuid')
const mongoose = require('mongoose');
const {HEADERS} = require('../utils/constant')
const {getTodo, postTodo, deleteTodo, patchTodo} = require('../apis/index')
const routeWrapper = require('./common/routeWrapper')

const routePath = 'todos'

// DB 連線
mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{
    console.log('DB連線成功');
  }).catch((err)=>{
    console.log(err.reason);
  })

const todosRoute = (req, res) => {
  let body = ''
  req.on('data', dataChunks => {
    body += dataChunks
  })

  const METHOD = req.method
  switch (METHOD) {
    case 'GET':
      getTodo(res)
      break
    case 'POST':
      req.on('end', () => {
        postTodo(req, res, body)
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
