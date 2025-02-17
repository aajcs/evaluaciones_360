class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log(socket.id + " connected");
      socket.on("mensaje-cliente", (data) => {
        console.log(data);
        this.io.emit("mensaje-servidor", data);
      });
    });
  }
}

module.exports = Sockets;
