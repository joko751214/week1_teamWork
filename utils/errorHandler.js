const errorMsgHandler = error => {
  let msg = {}

  if (error?.errors) {
    const res = Object.keys(error?.errors).reduce((acc, item) => {
      acc[item] = error?.errors[item].message
      return acc
    }, {})

    msg = {...res}
  }

  return msg
}

module.exports = errorMsgHandler
