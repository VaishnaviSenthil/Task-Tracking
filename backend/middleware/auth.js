const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// check user is authorized

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("TOKEN ^^^^", token);
  if (!token) {
    return next(new ErrorResponse("Not Authorized to access", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("Session Expired Please Log in ", 401));
  }
};
