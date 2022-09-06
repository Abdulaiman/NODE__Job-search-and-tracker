const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");
const User = require("../model/user-model");
const jwt = require("jsonwebtoken");

exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    message: "success",
    token,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("there is no  email address or password"));

  const user = await User.findOne({ email });

  const correct = await user?.correctPassword(password, user.password);
  if (!correct || !user) {
    return next(
      new AppError("wrong email or password please check and try again", 400)
    );
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    message: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(
      new AppError("you are not logged in please log in to have access", 401)
    );
  }
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!verified) {
    return next(
      new AppError("verification token is invalid please try again", 401)
    );
  }

  const user = await User.findById(verified.id);

  req.user = user;
  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  const id = req.user._id;

  const user = await User.findById(id);

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "you can't update your password using this route please use the /update-password route",
        400
      )
    );
  }
  const id = req.user._id;

  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const id = req.user._id;

  const { password, newPassword, newPasswordConfirm } = req.body;
  if (!password || !newPassword || !newPasswordConfirm) {
    return next(
      new AppError(
        "password, new password and new password confirm must all be present",
        400
      )
    );
  }
  const user = await User.findById(id);
  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError("password is incorrect please try again", 403));
  }
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.passwordChangedAt = Date.now() - 2000;
  await user.save();
  const newUser = await User.findById(id);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    message: "success",
    token,
    user: newUser,
  });
});
