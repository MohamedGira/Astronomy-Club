import Stripe from "stripe";
let stripe=Stripe(process.env.STRIPE_SK)
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";
import { Payment } from "../../models/Payments/Payment.mjs";

const endpointSecret = process.env.STRIPE_ENDPOINT_SK
export const webhook= catchAsync(async (req,res,next) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      return next(new AppError(300,`Webhook Error: ${err.message}`))
    }
    
    const data = event.data.object;

    if(event.type=='checkout.session.completed'){
      const ticket= await Ticket.findOne({user:data.customer_email,event:data.client_reference_id})
      const payment= await Payment.create({customer_email:data.customer_email,ticketId:ticket._id,paid:true})

      return res.status(201).json(
        {
          message:'successful payment',
          payment
        }
      )
    }else if(event.type=='checkout.session.expired'){
      const ticket= await Ticket.findOne({user:data.customer_email,event:data.client_reference_id})
      if(!await Payment.findOne({ticketId:ticket._id})){
        Ticket.findByIdAndDelete(ticket._id)
      }
    }

    else{
      console.log(`Unhandled event type ${event.type}`);
    }
    return  res.status(500).json({
      message:`shouldn't reach here`,
      event
    });
  });