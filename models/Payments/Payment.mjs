import bcrypt from "bcrypt";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()

import evalidator from "validator";
import { elementStatusSchema } from '../elementsStatus.mjs'


const paymentSchema = mongoose.Schema({
  customerEmail:{
    type:String,
    required: [true, "Email is required"],
    validate: { 
      validator: function (email) {
        return evalidator.isEmail(email);
      },
      message: "Invalid email format",
    }
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required:true
  },
  amount:Number,
  currency:String,
  paid: {
    type:Boolean,
    default:false
  },
  elementStatus: {type:elementStatusSchema,default:{}},
}, { timestamps: true });



export const Payment = mongoose.model("Payment", paymentSchema);

