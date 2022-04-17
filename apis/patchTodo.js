const {successHandle, errorHandle} = require('../handler/index')
const errorMsgHandler = require('../../utils/errorMsgHandler')
const Todo = require('../models/todo')

const patchTodo = (req, res, body, todos) => {
  const splitUrl = req.url.split('/').splice(2)
  const ID = splitUrl[0]
  const isRouteError = splitUrl.length > 1

  try {
    if (isRouteError) {
      // catch '/rooms/as123as4/XXXX' or ''/rooms//XXXX''
      errorHandle(res, {data: `PATCH 無此路由`}, 404)
    }

    if (ID) {
      const data = await JSON.parse(body)
      const todos = await Todo.findByIdAndUpdate(
        ID,
        {...data},
        {
          returnDocument: 'after',
        }
      )
      if (rooms) {
        successHandle(res, {data: todos})
      }

      // ID.length === 24 & not exsit in DB
      errorHandle(res, {data: `ID: '${ID}' 不存在`})
    }
  } catch (error) {
    if (error?.errors) {
      // catch update error
      errorHandle(res, {data: errorMsgHandler(error)})
    }
    // other error (// ID.length !== 24)
    errorHandle(res, {data: `ID: '${ID}' 不存在`})
  }
}
module.exports = patchTodo
