const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const QuizMaster = require('./../model/quizMasterModel');
const catchAsync = require('../error/catchAsync');
const AppError = require('../error/apiError');


// FUNCTIONS
const generateOTP = function() {
  // 1.) generate random 4 digit statusCode
  const code = Math.floor(Math.random() * 8999 + 1000);
  // 2.)hash it

  const hash = crypto
    .createHash('md5')
    .update(`${code}`)
    .digest('hex');

  return { hash, code };
};

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  //Remove passsword from the output of signing up a new user.
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// HANDLERS
exports.login = catchAsync(async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return next(new AppError('Please provide phone number and password!', 400));
  }

  const user = await QuizMaster.findOne({ phoneNumber }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Phone number or password!', 401));
  }

  if (!user.isVerified)
    return next(
      new AppError(
        'Your account has not been verified, Please make sure to verify your phone number!',
        401
      )
    );
  createSendToken(user, 200, req, res);
});


exports.signup = catchAsync(async (req, res, next) => {
  // 1.) Create instance
  const newUser = new QuizMaster();
  
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  
  await newUser.save();

  createSendToken(newUser, 201, req, res);
});

// protecting route
exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token)
    return next(
      new AppError('You are not Logged in, Login to get access', 401)
    );
  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The token for this user does not exist', 401));
  }
  // GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = freshUser;
  next();
});