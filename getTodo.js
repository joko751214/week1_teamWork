function getToDo(todos, response, headers){
  response.writeHead(200, headers);
  response.write(JSON.stringify({
    status: 'success',
    data: todos,
  }));
  response.end();
}

module.exports = getToDo;