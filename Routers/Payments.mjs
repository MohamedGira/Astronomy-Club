import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const PaymentRouter=express.Router()

import * as PaymentsController from "../controllers/Booking/CRUDPayment.mjs"


PaymentRouter.use(RBACAutorizerMw)
PaymentRouter.route('/')
.get(PaymentsController.getPayments)
.post(RBACAutorizerMw,PaymentsController.addPayment)

PaymentRouter.route('/:elementId')
.get(PaymentsController.getPayment)
.patch(RBACAutorizerMw,PaymentsController.updatePayment)
.delete(RBACAutorizerMw,PaymentsController.deletePayment)
