const http = require('http')
const errorHandle = require('./handler/errorHandle')
const getTodo = require('./apis/getTodo')
const postTodo = require('./apis/postTodo')
const deletTodo = require('./apis/deleteTodo')
const patchTodo = require('./apis/patchTodo')
const todos = []

const requestListener = (req, res) => {
  const headers = {
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json',
  }
  let body = ''

  req.on('data', chunk => {
    body += chunk
  })

  if (req.url == '/todos' && req.method == 'GET') {
    getTodo(todos, res, headers)
  } else if (req.url == '/todos' && req.method == 'POST') {
    // postTodo.js
    req.on('end', () => {
      postTodo(req, res, body, todos)
    })
  } else if (req.url.startsWith('/todos') && req.method == 'DELETE') {
    // deleteTodo.js
    deletTodo(req, res, todos)
  } else if (req.url.startsWith('/todos/') && req.method == 'PATCH') {
    // patchTodo.js
    req.on('end', () => {
      patchTodo(req, res, body, todos)
    })
  } else if (req.method == 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandle(res, '無此網站路由', 404)
  }
}

const server = http.createServer(requestListener)
server.listen(process.env.PORT || 3005)
