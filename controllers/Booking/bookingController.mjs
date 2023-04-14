import Stripe from "stripe";
import { Event } from "../../models/Events/Event.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { generateToken } from "../../utils/generteToken.mjs";
const stripe=Stripe(process.env.STRIPE_SK)

async  function getCheckoutStripeSession(req,event){
    const Token=generateToken({email:req.body.email,event:event.id},60*60*24*90)
    const session= await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        success_url:`${req.protocol}://${req.get('host')}/vishome`,
        cancel_url:`${req.protocol}://${req.get('host')}/?message=${`couldn't book the event`}`,
        customer_email:req.body.email,
        client_reference_id:req.params.id,
        line_items:[{
            price_data: {
                currency: 'eur',
                unit_amount: event.price*100,
                product_data: {
                    name:event.title,
                    description:event.description,
                    images:[`${req.protocol}://${req.get('host')}/images/${event.banner}`],
                },
              },quantity:1,    
        }],
        mode:'payment'

    })
    return session
}
//POST  /book/:eventId  <- requires email in body
export const getCheckoutSession= catchAsync(
    async (req,res,next)=>{
        let id = req.params.eventId
        if(!id|!req.body.email)
            return next(new AppError(400,`email must be provided`))

        let event = await Event.findById(id)
        if (!event)
            return next(new AppError(404,`this event doesn't exist`))
        if (!event.isVisible)
            return next(new AppError(403,`this event can not be booked`))
        if(await Ticket.find({event:id})>=event.capacity)
            return next(new AppError(400,`this event is full`))
        const session= await getCheckoutStripeSession(req,event)

        res.status(200).json({
            status:'success',
            session
        })
    }
)