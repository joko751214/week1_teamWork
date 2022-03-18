const successHandle = require('./successHandle');
const errorHandle = require('./errorHandle');

const patchTodo = (req, res, headers, body, todos) => {
  const id = req.url.split('/').pop();
  const index = todos.findIndex(item=> item.id === id);
  try{
      const { title } = JSON.parse(body);
      const id = req.url.split('/').pop();
      const index = todos.findIndex(item=> item.id === id);

      if( title !== undefined && index !== -1) {
        todos[index].title = title;
        successHandle(res, headers, todos);
      } else if ( title === undefined) {
        errorHandle(res, headers, 'title 未正確填寫');
      } else if ( index === -1){
        errorHandle(res, headers, '查無id');
      }
    } catch(err){
      errorHandle(res, headers, 'JSON 格式錯誤');
    }
}
module.exports = patchTodo;