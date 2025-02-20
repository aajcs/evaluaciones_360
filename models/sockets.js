const {
  userDesconectado,
  userConectado,
  getUser,
} = require("../controllers/sockets");
const { comprobarJWT } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    console.log("socketEvents called");
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, id] = comprobarJWT(socket.handshake.query["x-token"]);

      if (!valido) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      await userConectado(id);
      console.log("usuario conectado", id);
      this.io.emit("lista-usuarios", await getUser());
      socket.on("disconnect", async () => {
        await userDesconectado(id);
      });
    });
  }
}

module.exports = Sockets;
