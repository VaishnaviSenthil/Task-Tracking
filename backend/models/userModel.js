
const mongoose = require("mongoose");
 const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = mongoose.Schema;



const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
      maxlength: 31,
    },
    lastName: {
      type: String,
      trim: true,
      // required :[true,'last name is required'],
      maxlength: 31,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please provide valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      // required :[true,'password is required'],
      minlength: [6, "password should be more than 6 characters"],
    },
    mobileNumber: {
      type: Number,
      trim: true,
      // required :[true,'mobile number is required'],
      minlength: [10, "Enter valid mobile number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function () { 
  console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);