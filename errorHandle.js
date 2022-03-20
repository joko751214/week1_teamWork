const { HEADERS } = require('./utils/constant');

function errorHandle(res, message, errorCode = 400) {
  res.writeHead(errorCode, HEADERS);
  res.write(
    JSON.stringify({
      status: "false",
      message,
    })
  );
  res.end();
}

module.exports = errorHandle;
