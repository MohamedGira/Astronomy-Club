import express from "express";
import {catchAsync} from "../utils/catchAsync.mjs";
import { loginMember} from "../controllers/Authentication/login.mjs";
import {logout} from "../controllers/Authentication/logout.mjs";
import { alreadyLoggedIn } from "../controllers/Authentication/AuthUtils.mjs";
import * as regisrationController from "../controllers/Authentication/register.mjs";
import * as resetPasswordController from "../controllers/Authentication/resetPassword.mjs";
import { RBACAutorizerMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";

export const AuthRouter=express.Router()

//AuthRouter.route('/api/v1/auth/register').post(alreadyLoggedIn,catchAsync(regisrationController.registerUser))
AuthRouter.route('/register').post(alreadyLoggedIn,catchAsync(regisrationController.registerMember))
AuthRouter.route('/confirmRegistration').get(catchAsync(regisrationController.confirmRegisteration))

AuthRouter.route('/logout').post(logout)


AuthRouter.route('/resetPassword').post(alreadyLoggedIn,catchAsync(resetPasswordController.resetPassword))
AuthRouter.route('/changePassword').post(catchAsync(resetPasswordController.changePassword))

AuthRouter.route('/updatePassword').patch(RBACAutorizerMw,resetPasswordController.updatePassword)

AuthRouter.route('/login').post(alreadyLoggedIn,catchAsync(loginMember))
//AuthRouter.route('/api/v1/auth/login').post(alreadyLoggedIn,catchAsync(login))
