/* eslint-disable no-console */
const mongoose = require('mongoose');

class Database {
  connectMongoDB(dbUrl) {
    mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => console.log('Database connection successful!'))
      .catch(err => console.log('Database connection failed', err));
  }
}

module.exports = new Database();
