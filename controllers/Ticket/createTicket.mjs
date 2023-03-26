import  jwt  from "jsonwebtoken";
import { promisify } from "util";
import { Ticket } from "../../models/Tickets/Ticket.mjs";

export const createTicket=async(req,res,next)=>{
  const token = req.cookies.jwt;
  if (!token)
    return next();
  const decodedvalues=await promisify(jwt.verify)(token, process.env.JWT_KEY)
  await Ticket.create({user:decodedvalues.id,event:req.body.event})
  return res.status(200).json({message:"ticket created succesfully"})
  };
