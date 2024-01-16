const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncHandler.middleware')

const isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Please Login to Access', 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid Token', 401));
  }
});

module.exports = isAuthenticatedUser;
