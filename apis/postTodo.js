const {successHandle, errorHandle} = require('../handler/index')
const Todo = require('../models/todo');

const postTodo = async (req, res, body) => {
  try {
    const { title } = JSON.parse(body)
    if (title !== undefined) {
      // 新增
      await Todo.create({title});
      // 取得所有
      const todos = await Todo.find();
      successHandle(res, todos)
    } else {
      errorHandle(res, 'title 未正確填寫')
    }
  } catch (error) {
    // 非JSON格式
    errorHandle(res, 'JSON 格式錯誤')
  }
}
module.exports = postTodo
