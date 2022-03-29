const EventEmitter = require("events");

module.exports = class Applicatiion {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
  }

  listen(port, callback){
      this.server.listen(port, callback)
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];

      Object.keys(endpoint).forEach((method) => {
        const handler = endpoint[method];

        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          handler(req, res);
        });
      });
    });
  }

  _createServer() {
    return require("http").createServer((req, res) => {
      if (!this.emitter.emit(this._getRouteMask(req.url, req.method), req, res))
        res.end();

      res.writeHead(200, { "content-type": "application/json" });

      if (req.url === "/greeting") {
        return res.end(JSON.stringify({ helo: 1 }));
      }
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }
};
