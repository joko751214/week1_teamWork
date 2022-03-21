const {successHandle, errorHandle} = require('../handler/index')

const getTodo = (res, todos) => {
  try {
    successHandle(res, todos)
  } catch (error) {
    errorHandle(res, '頁面發生問題，請稍後再試。')
  }
}
module.exports = getTodo