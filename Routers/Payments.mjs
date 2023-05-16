import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const PaymentRouter=express.Router()

import * as PaymentsController from "../controllers/Booking/CRUDPayment.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

PaymentRouter.use(protect)
PaymentRouter.route('/')
.get(PaymentsController.getPayments)
.post(isAuthorizedMw('admin'),PaymentsController.addPayment)

PaymentRouter.route('/:elementId')
.get(PaymentsController.getPayment)
.patch(isAuthorizedMw('admin'),PaymentsController.updatePayment)
.delete(isAuthorizedMw('admin'),PaymentsController.deletePayment)
