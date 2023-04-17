import express from "express";
import {catchAsync} from "../utils/catchAsync.mjs";
import {login, loginMember} from "../controllers/Authentication/login.mjs";
import {logout} from "../controllers/Authentication/logout.mjs";
import { isLoggedInMw } from "../controllers/Authentication/AuthUtils.mjs";
import * as regisrationController from "../controllers/Authentication/register.mjs";
import * as resetPasswordController from "../controllers/Authentication/resetPassword.mjs";
import { deactevatedEndpoint } from "../utils/deactivatedEndpoint.mjs";

export const AuthRouter=express.Router()

//AuthRouter.route('/api/v1/auth/register').post(isLoggedInMw,catchAsync(regisrationController.registerUser))
AuthRouter.route('/register').post(isLoggedInMw,catchAsync(regisrationController.registerMember))
AuthRouter.route('/confirmRegistration').get(catchAsync(regisrationController.confirmRegisteration))

AuthRouter.route('/logout').post(logout)


AuthRouter.route('/resetPassword').post(isLoggedInMw,catchAsync(resetPasswordController.resetPassword))
AuthRouter.route('/changePassword').post(catchAsync(resetPasswordController.changePassword))



AuthRouter.route('/login').post(isLoggedInMw,catchAsync(loginMember))
//AuthRouter.route('/api/v1/auth/login').post(isLoggedInMw,catchAsync(login))
