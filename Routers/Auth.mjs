import express from "express";
import * as regisrationController from "../controllers/Authentication/register.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";


export const AuthRouter=express.Router()
AuthRouter.route('/register').post(catchAsync(regisrationController.registerUser))
AuthRouter.route('/confirmRegistration').get(catchAsync(regisrationController.confirmRegisteration))



