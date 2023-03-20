import express from "express";
import {catchAsync} from "../utils/catchAsync.mjs";
import {login} from "../controllers/Authentication/login.mjs";
import {logout} from "../controllers/Authentication/logout.mjs";
import { isLoggedIn } from "../controllers/Authentication/AuthUtils.mjs";
import * as regisrationController from "../controllers/Authentication/register.mjs";

export const AuthRouter=express.Router()
AuthRouter.route('/register').post(isLoggedIn,catchAsync(regisrationController.registerUser))
AuthRouter.route('/confirmRegistration').get(catchAsync(regisrationController.confirmRegisteration))

AuthRouter.route('/login').post(isLoggedIn,catchAsync(login))
AuthRouter.route('/logout').post(logout)




