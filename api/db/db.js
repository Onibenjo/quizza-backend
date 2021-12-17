/* eslint-disable no-console */
const mongoose = require("mongoose");

class Database {
  async connectMongoDB(dbUrl) {
    try {
      const db = await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      console.info("Database connected successfully");
    } catch (err) {
      console.error("Database failed to connect", err);
    }
  }
}

module.exports = new Database();
