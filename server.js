/* eslint-disable no-console */
const dotenv = require("dotenv");
const ProcessError = require("./src/error/ProcessError");
const DB = require("./src/db/db");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config({ path: "./config.env" });

const { DATABASE_URL, PORT } = process.env;
// Exit process for UncaughtException
ProcessError.unCaughtException();
// Connect Mongo DB
DB.connectMongoDB(DATABASE_URL);

const app = require("./app");

const port = PORT || 3000;

const server = http.createServer(app);

const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

io.attach(server);
// Exit(1)
ProcessError.unHandledRejection(server);
ProcessError.SIGTERM(server);
console.log(process.env.NODE_ENV);

module.exports = server;
