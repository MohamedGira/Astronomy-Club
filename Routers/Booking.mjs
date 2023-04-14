import express from "express";
import { getCheckoutSession } from "../controllers/Booking/bookingController.mjs";


export const BookingRouter=express.Router()

BookingRouter.route('/:eventId')
.post(getCheckoutSession)
