const {Schema, model} = require('mongoose');

// Schema 定義
const todoSchema = new Schema(
  {
    title:{
      type: String,
      require: [true, "title為必填"]
    },
    createdAt:{
      type: Date,
      default: Date.now,
      select: false, // 隱藏欄位
    }
  },
  {
    versionKey: false, // 移除 versionKey
  }
)

const Todo = model('Todo', todoSchema);
module.exports = Todo;