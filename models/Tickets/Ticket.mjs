import bcrypt from "bcrypt";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { AppError } from "../../utils/AppError.mjs";
import { Event } from "../Events/Event.mjs";
import { User } from "../Users/User.mjs";
dotenv.config()

import evalidator from "validator";


const ticketSchema = mongoose.Schema({
  user:{
    type:String,
    required: [true, "Email is required"],
    validate: {
      validator: function () {
        return evalidator.isEmail(this.user);
      },
      message: "Invalid email format",
    },

  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required:true
  },
  link:{
    type:String,
    required:false
  },
  entered:{
    type:Boolean,
    default:false
  }
}, { timestamps: true });



// all these validatiors where moved to booking Controller

/* ticketSchema.methods.alreadyReserved= async function(){
  const alreadyReserved=await Ticket.find({user:this.user,event:this.event}).count()
  if(alreadyReserved){
    return true
  }
  return false
}

//check that role foriegn key is valid. to avoid many requests to the data base, ticketcount is checked here as well?
ticketSchema.pre("save", async function (next) {
  const user =this.user// await User.findById (this.user);
  const event = await Event.findById (this.event);
  console.log('alo')
  if (!user||!event)
    return next(new AppError(400, "invalid email or event id"));
    
  //YAGNI
  if (!event.isVisible)
    return next(new AppError(400, "you can't make a reservation for this event"));
  
  const ticketCount=await Ticket.find({event:this.event}).count()
  if(ticketCount>=event.capacity)
    return next(new AppError(400, "No places left for this event"));
    
  next()
});
 */

//check if user already have a ticket for this event 
//moved to booking controller, stripe stuff
/* ticketSchema.pre('save',async function(next){
  if(await this.alreadyReserved())
    return next(new AppError(400, "you already have a reservation for this event"))
  next()
}) */

//hashing a value for the qrcode
ticketSchema.pre('save',async function(next){
  this.link = await bcrypt.hash(this.user.toString()+Date.now().toString(), 2);
  next();
})

export const Ticket = mongoose.model("Ticket", ticketSchema);

