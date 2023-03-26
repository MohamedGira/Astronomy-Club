import express from "express";
import {catchAsync} from "../utils/catchAsync.mjs";
import {login} from "../controllers/Authentication/login.mjs";
import {logout} from "../controllers/Authentication/logout.mjs";
import { isLoggedInMw } from "../controllers/Authentication/AuthUtils.mjs";
import * as regisrationController from "../controllers/Authentication/register.mjs";
import * as resetPasswordController from "../controllers/Authentication/resetPassword.mjs";

export const AuthRouter=express.Router()

AuthRouter.route('/register').post(isLoggedInMw,catchAsync(regisrationController.registerUser))
AuthRouter.route('/confirmRegistration').get(catchAsync(regisrationController.confirmRegisteration))

AuthRouter.route('/login').post(isLoggedInMw,catchAsync(login))
AuthRouter.route('/logout').post(logout)


AuthRouter.route('/resetPassword').post(isLoggedInMw,catchAsync(resetPasswordController.resetPassword))
AuthRouter.route('/changePassword').post(catchAsync(resetPasswordController.changePassword))


