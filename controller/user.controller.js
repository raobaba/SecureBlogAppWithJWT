const bcrypt = require('bcryptjs');
const User = require('../model/user.model');
const asyncHandler = require('../middleware/asyncHandler.middleware');
const sendToken = require('../utils/snedToken')

const Register = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = new User({
    name,
    email,
    password: hashedPassword,
    age,
  });

  await user.save();
  sendToken(user, 201, res);
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please Enter Email And Password' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid Email or Password' });
  }
   sendToken(user, 201, res);
});

const Logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'strict',
  });

  res.status(200).json({ status: 200, message: 'Logged out successfully' });
});

module.exports = { Register, Login, Logout };
