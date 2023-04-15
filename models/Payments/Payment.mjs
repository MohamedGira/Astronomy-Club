import bcrypt from "bcrypt";
import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config()

import evalidator from "validator";


const paymentSchema = mongoose.Schema({
  customer_email:{
    type:String,
    required: [true, "Email is required"],
    validate: { 
      validator: function () {
        return evalidator.isEmail(this.user);
      },
      message: "Invalid email format",
    }
  },
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    required:true
  },
  paid: {
    type:Boolean,
    default:false
  }
}, { timestamps: true });



export const Payment = mongoose.model("Payment", paymentSchema);

