/* eslint-disable no-console */

class ServerError {
  unCaughtException() {
    process.on('uncaughtException', err => {
      console.log('UNCAUGHT EXCEPTION! 💥💥💥 Shutting down...');
      console.log(err.name, err.message, err, err.stack);
      process.exit(1);
    });
  }

  //SIGTERM is a signal that is used to cause a program to stop process
  SIGTERM(server) {
    process.on('SIGTERM', () => {
      console.log('SIGTERM RECEIVED. Shutting down gracefully.');
      server.close(() => console.log('💥💥💥 Process terminated!'));
    });
  }

  // Unhandled Rejection Closes server
  unHandledRejection(server) {
    process.on('unhandledRejection', err => {
      console.log('UNHANDLED REJECTION! 💥💥💥 Shutting down...');
      console.log(err.name, err.message, err);
      server.close(() => process.exit(1));
    });
  }
}

module.exports = new ServerError();
