const {successHandle, errorHandle} = require('../handler/index')
const Todo = require('../models/todo');

const getTodo = async (res) => {
  try {
    const todos = await Todo.find();
    successHandle(res, todos)
  } catch (error) {
    errorHandle(res, '頁面發生問題，請稍後再試。')
  }
}
module.exports = getTodo