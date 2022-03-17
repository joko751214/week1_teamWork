function successHandle(res, headers, todos) {
  res.writeHead(200, headers);
  res.write(
    JSON.stringify({
      status: "success",
      todos,
    })
  );
  res.end();
}

module.exports = successHandle;
