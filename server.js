const http = require('http')
const todosListener = require('./routes/todos')

const server = http.createServer(todosListener)
server.listen(process.env.PORT || 3005)
