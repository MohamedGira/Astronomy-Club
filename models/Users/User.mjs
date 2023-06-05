import bcrypt from "bcrypt";
import mongoose from "mongoose";
import evalidator from "validator";
import { UserRole } from "./UserRole.mjs";
import phoneUtils from "google-libphonenumber";
import dotenv from "dotenv";
import { AppError } from "../../utils/AppError.mjs";
import { Committee } from "../Committees/Committee.mjs";
dotenv.config();

import { elementStatusSchema } from '../elementsStatus.mjs'

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
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },

  committee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Committee",
  },
  confirmed:{
    type:Boolean,
    default:false
  },


  confirmationToken: {
    type: String,
  },
  elementStatus: {type:elementStatusSchema,default:{}},
});


userScema.pre(/^find/, function (next) {
  this.populate("role committee", "-__v -elementStatus");
  next();
});

//check that  foriegn keys are valid
userScema.pre("save", async function (next) {
  
  if(await User.find({firstName:this.firstName,lastName:this.lastName,
    _id:{$ne:this._id},'elementStatus.isDeleted':{$ne:true}}).countDocuments()>0)
    return next(new AppError(400, "This username is already in use"));
  if(this.role)
  {
    const data = await UserRole.findById( this.role);
    if (!data) return next(new AppError(400, "invalid role id"));
  }
  if(this.committee)
  {
    const data = await Committee.findById( this.committee);
    if (!data) return next(new AppError(400, "invalid committee id"));
  }

  next();
});







export const User = mongoose.model("User", userScema);
