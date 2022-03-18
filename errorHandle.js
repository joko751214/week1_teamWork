const { HEADERS } = require('./utils/constant');

function errorHandle(res, message) {
  res.writeHead(400, HEADERS);
  res.write(
    JSON.stringify({
      status: "false",
      message,
    })
  );
  res.end();
}

module.exports = errorHandle;
