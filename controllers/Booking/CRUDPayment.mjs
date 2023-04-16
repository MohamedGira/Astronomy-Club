import { Payment } from "../../models/Payments/Payment.mjs";
import * as factory from "../CRUDFactory.mjs";


export const  getPayments= factory.getAll(Payment)

// POST payments/
export const  addPayment= factory.CreateOne(Payment)

// GET Payments/:elementId 
export const  getPayment= factory.getOne(Payment)

// PATCH Payments/:elementId 
export const  updatePayment= factory.updateOne(Payment)

// DELETE Payments/:elementId
export const  deletePayment= factory.deleteOne(Payment)
