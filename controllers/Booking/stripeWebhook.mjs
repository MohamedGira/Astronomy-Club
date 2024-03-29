import Stripe from "stripe";
let stripe=Stripe(process.env.STRIPE_SK)
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";
import { Payment } from "../../models/Payments/Payment.mjs";



const endpointSecret = process.env.STRIPE_ENDPOINT_SK

async function SessionCompleted(event,req,res,next){
  const data = event.data.object;

  const ticket= await Ticket.findOne({user:data.customer_email,event:data.client_reference_id})
  let payment=await Payment.findOne({ticketId:ticket._id})
  if(!payment)
    {
      payment= await Payment.create({
        customerEmail:data.customer_email,
        ticketId:ticket._id,
        amount:data.amount_total/100,
        currency:data.currency,
        paid:true,
      })
      return res.status(201).json(
        {
          message:'successful payment',
          payment
        }
      )
    }
  else{
    //souldn't reach here
    return res.status(200).json(
    {
      message:'a payment already exists..hmmm, shouldn\t reach here',
      payment
    }
    )  
  }

}

async function SessionExpired(event,req,res,next){
  const data = event.data.object;

  const ticket= await Ticket.findOne({user:data.customer_email,event:data.client_reference_id})
  if(!ticket)
    return  res.status(200).json({
    message:`ticket doesn't exist`,
    event
  });
  let payment=await Payment.findOne({ticketId:ticket._id})
  if(!payment){
    let t=await Ticket.findByIdAndDelete(ticket._id)
    console.log(`removed ticket ${t}`)
    return  res.status(204).json({
    message:`this reservation is expired, removing ticket ${ticket}`,
    });
  }else{
    //shouldn't reach here
    return  res.status(400).json({
      message:`a payment ${payment} is already made`,
      });
  }
}

export const webhook= catchAsync(async (req,res,next) => {
    const sig = req.headers['stripe-signature'];
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      return next(new AppError(300,`Webhook Error: ${err.message}`))
    }
    

    if(event.type=='checkout.session.completed')
      return SessionCompleted(event,req,res,next)
    else if(event.type=='checkout.session.expired')
      return SessionExpired(event,req,res,next)
    else
      console.log(`Unhandled event type ${event.type}`);
  
    return  res.status(500).json({
      message:`shouldn't reach here`,
      event
    });
})