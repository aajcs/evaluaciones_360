const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.conectarDB();
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {});
  }
  async conectarDB() {
    await dbConnection();
  }
  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use("/api/user", require("../routes/user"));
  }
  configureSockets() {
    new Sockets(this.io);
  }
  execute() {
    this.middlewares();
    this.configureSockets();
    this.server.listen(this.port, () => {
      console.log("Server started on http://localhost:" + this.port);
    });
  }
}

module.exports = Server;
