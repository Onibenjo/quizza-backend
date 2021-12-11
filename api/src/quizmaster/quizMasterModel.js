const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const quizMasterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password!'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

//Hashing the password
quizMasterSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

//FOR LOGGING IN: Checking if the inputted password matches that in the database
quizMasterSchema.methods.correctPassword = async function(
  candidatePassword,
  quizMasterPassword
) {
  return await bcrypt.compare(candidatePassword, quizMasterPassword);
};

const QuizMaster = mongoose.model('quizMaster', quizMasterSchema);
module.exports = QuizMaster;