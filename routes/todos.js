const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const {HEADERS} = require('../utils/constant')
const {getTodo, postTodo, deleteTodo, patchTodo} = require('../apis/index')
const routeWrapper = require('./common/routeWrapper')

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
  .then(() => console.log('Connection Successful!'))
  .catch(() => console.log('Connection Failed!'));

const routePath = 'todos'

const todosRoute = (req, res) => {
  let body = ''
  req.on('data', dataChunks => {
    body += dataChunks
  })

  const METHOD = req.method
  switch (METHOD) {
    case 'GET':
      getTodo(res, todos)
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
