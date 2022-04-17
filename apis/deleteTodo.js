const {successHandle, errorHandle} = require('../handler/index')
const Todo = require('../models/todo')

const isDeleteAll = requestUrl =>
  requestUrl.split('/').filter(e => e).length === 1

const deleteTodo = (req, res, todos) => {
  const splitUrl = req.url.split('/').splice(2)
  const ID = splitUrl[0]
  const isRouteError = splitUrl.length > 1

  try {
    if (isDeleteAll(req.url)) {
      // delete all
      await Todo.deleteMany({})
      successHandle(res, {data: []})
    } else {
      // delete one

      if (isRouteError) {
        // catch '/rooms/as123as4/XXXX' or ''/rooms//XXXX''
        errorHandle(res, {data: `DELETE 無此路由`}, 404)
      }

      if (ID) {
        const rooms = await Todo.findByIdAndDelete(ID)

        if (rooms) {
          successHandle(res, {data: `${ID} 成功刪除`})
        }
        // ID.length === 24 & not exsit in DB
        errorHandle(res, {data: `ID: '${ID}' 不存在`})
      }
    }
  } catch (error) {
    // other error (// ID.length !== 24)
    errorHandle(res, {data: `ID: '${ID}' 不存在`})
  }
}

module.exports = deleteTodo
