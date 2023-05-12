import bcrypt from "bcrypt";
import mongoose from "mongoose";
import evalidator from "validator";
import { UserRole } from "./UserType.mjs";
import phoneUtils from "google-libphonenumber";

import dotenv from "dotenv";
import { AppError } from "../../utils/AppError.mjs";

import { committeeSchema } from "../../models/Events/subSchemas/committee.mjs";

dotenv.config();

const STATUS_MAP = {
  0: "pending",
  1: "approved",
  2: "declined",
};

const phoneUtil = phoneUtils.PhoneNumberUtil.getInstance();

const userScema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first is required"],
    minLength: [2, "first is too short"],
    maxLength: [300, "first is too long"],
  },
  lastName: {
    type: String,
    required: [true, "last is required"],
    minLength: [2, "last is too short"],
    maxLength: [300, "last is too long"],
  },

  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [5, "password is too short"],
    validate: {
      validator: function (password) {
        if (Buffer.from(password).length > 72) return false;
      },
      message: "password is too long",
    },
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "password confirmation is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already in use"],
    validate: {
      validator: function (email) {
        return evalidator.isEmail(email);
      },
      message: "Invalid email format",
    },
  },

  profileImage: {
    type: String,
  },

  phoneNumber: {
    type: String,
    minLength: [10, "invalid phone number,tshort"],
    required:[true, "You must provide a phone number"],
    unique: [true, "This phone number is already in use"],
    validate: {
      validator: function (number) {
          try {
            phoneUtil.isValidNumberForRegion(
              phoneUtil.parse(number, "EG"),
              "EG"
            );
          } catch (e) {
            return false;
          }
      },
      message: "invalid phone number",
    },
  },

  role: {
    type: String,
    default: "member",
  },

  committee: {
    type: committeeSchema,
  },

  status: {
    type: String,
    required: true,
    enum: Object.values(STATUS_MAP),
    default: STATUS_MAP[0],
  },
  confirmationToken: {
    type: String,
  },
});



//check that passwords match
userScema.pre("save", function (next) {
  if (this.password != this.passwordConfirm)
    return next(new AppError(400, "passwords doesn't match"));
  this.passwordConfirm = undefined;
  next();
});

//check that role foriegn key is valid
userScema.pre("save", async function (next) {
  const data = await UserRole.find({ role: this.role });
  if (data.length == 0) return next(new AppError(400, "invalid role id"));
  next();
});

//encrypt password before storing it to the database
userScema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.HASH_SALT)
  );
  next();
});




export const User = mongoose.model("User", userScema);
