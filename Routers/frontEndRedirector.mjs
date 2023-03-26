import express from "express";
import {catchAsync} from "../utils/catchAsync.mjs";
import {login} from "../controllers/Authentication/login.mjs";
import {logout} from "../controllers/Authentication/logout.mjs";
import * as regisrationController from "../controllers/Authentication/register.mjs";
import * as resetPasswordController from "../controllers/Authentication/resetPassword.mjs";
import { AuthRouter } from "./Auth.mjs";

export const frontEndRedirector=express.Router()

frontEndRedirector.route('/api/account/register').post((req,res,next)=>{
    req.url='/api/v1/auth/register'
    return AuthRouter(req,res,next)
})
frontEndRedirector.route('/api/account/confirmRegistration').get((req,res,next)=>{
    req.url='/api/v1/auth/register'
    return AuthRouter(req,res,next)
})

frontEndRedirector.route('/api/account/login').post((req,res,next)=>{
    req.url='/api/v1/auth/login'
    return AuthRouter(req,res,next)
})
frontEndRedirector.route('/api/account/logout').post((req,res,next)=>{
    req.url='/api/v1/auth/register'
    return AuthRouter(req,res,next)
})


frontEndRedirector.route('/api/account/reset-password').post((req,res,next)=>{
    req.url='/api/v1/auth/register'
    return AuthRouter(req,res,next)
})

frontEndRedirector.route('/api/account/changePassword').post((req,res,next)=>{
    req.url='/api/v1/auth/register'
    return AuthRouter(req,res,next)
})


