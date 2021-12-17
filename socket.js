const socketIO = require("socket.io");

class Socket {
  constructor(server) {
    this.server = server;
    this.createSocket();
  }

  createSocket() {
    const options = {
      transports: ["polling"],
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true,
      },
    };

    const io = socketIO(this.server, options);

    io.on("connection", (socket) => {
      console.log(`${socket.id} is connected`);
    });

    io.on("disconnection", (socket) =>
      console.log(`${socket.id} disconnected`)
    );

    global._io = io;
  }
}

module.exports = { Socket };
