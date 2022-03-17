function errorHandle(res, headers, message) {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: "false",
      message,
    })
  );
  res.end();
}

module.exports = errorHandle;
