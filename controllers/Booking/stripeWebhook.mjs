import Stripe from "stripe";
let stripe=Stripe(process.env.STRIPE_SK)
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";

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
    if(event.type=='checkout.session.completed'){
      const data = event.data.object;
      console.log(data)
      const ticket= await Ticket.create({user:data.customer_email,event:data.client_reference_id})
      console.log('tiketID: ',ticket._id)
      return res.status(201).json(
        {
          message:'ticket created successfully',
          ticket
        }
      )
    }
    else{
      console.log(`Unhandled event type ${event.type}`);
    }
  
    return  res.status(500).json({
      message:`shouldn't reach here`,
      event
    });
  });