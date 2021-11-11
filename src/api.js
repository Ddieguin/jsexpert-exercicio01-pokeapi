const http = require("http");
const fs = require("fs/promises");
const { routes } = require("./routes");


const handler = (req, res) => {
  return routes[req.method]
    ? routes[req.method][routes[req.method][req.url] ? req.url : "default"](req, res)
    : routes["undefinedMethod"](req, res);
};

const server = http.createServer(handler);

module.exports = { server };


