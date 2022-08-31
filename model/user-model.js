const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "please specify a correct email address"],
      unique: [true, "email address is already taken"],
      required: [true, "email address is required"],
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "password is required"],
    },
    passwordConfirm: {
      type: String,
      required: [true, "password confirm is required"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "password must be the same as password confirm",
      },
      select: false,
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.methods.correctPassword = async (candidatePassword, password) => {
  return await bcrypt.compare(candidatePassword, password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
