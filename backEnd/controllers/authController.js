const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const { catchAsync } = require("../utils/catchAsync");
const crypto = require("crypto");
const express = require("express");
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  console.log(res.cookie)
  user.password = undefined;
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_S, {
    expiresIn: process.env.JWT_E,
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 200, res);
  } catch (err) {
    console.log(err);
    res.status(404).send({
      status: "failed",
      msg: err,
    });
  }
};
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  const correct = await bcrypt.compare(password, user.password);
  if (!user || !correct) {
    return next(new AppError("incorrect email or password", 401));
  }
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log('token in protect :',token)
  } else if (req.cookies.jwt) {
    console.log('in else')
    token = req.cookies.jwt;
  }
  console.log(token);
  if (!token) {
    return next(new AppError("you are not logged in! please login", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_S);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new Error("The user belonging to this token no longer exist", 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_S
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }
      res.locals.user = currentUser;
    } catch (error) {
      return next();
    }
  }
  return next();
};
exports.logOut = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send({
    status: "success",
  });
});
exports.updateSugar = catchAsync(async (req, res, next) => {
  const sugarValue = req.body.sugar;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { sugar: sugarValue } },
    { new: true, runValidators: true }
  );
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
exports.updateBP = catchAsync(async (req, res, next) => {
  const { bp } = req.body;

  if (!bp) {
    return res.status(400).json({
      status: "fail",
      message: "BP value is required",
    });
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $push: { bp: bp } },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
