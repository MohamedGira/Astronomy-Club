import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { Database } from "./models/DbConnection.mjs";
import cookieParser from "cookie-parser";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./Routers/Auth.mjs";
import { isAuthorizedMw } from "./controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { EventRouter } from "./Routers/Event.mjs";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import { TicketRouter } from "./Routers/Ticket.mjs";
import { updatePassword } from "./controllers/Authentication/resetPassword.mjs";
import {  protect } from "./controllers/Authentication/AuthUtils.mjs";
import { UserRouter } from "./Routers/User.mjs";
import { Event } from "./models/Events/Event.mjs";
import { gatheringPointsRouter } from "./Routers/GatheringPoints.mjs";
import { CheckpointsRouter } from "./Routers/Checkpoints.mjs";
import { FsRouter } from "./Routers/FsRouter.mjs";
import { addSpeaker } from "./controllers/Event/CRUDSpeaker.mjs";
import { SpeakerRouter } from "./Routers/Speakers.mjs";
import { Speaker } from "./models/Events/subSchemas/Speaker.mjs";
import { BookingRouter } from "./Routers/Booking.mjs";
import { webhook } from "./controllers/Booking/stripeWebhook.mjs";
import compression from "compression"
import { deploymentTrick } from "./models/deploymentTrick.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.on('uncaughtException',err=>{
    console.trace(`Error: ${err}`)
    console.log('Uncaught Exception')
    process.exit(1)
})


const app = express()





dotenv.config()
//this webhook uses request body as raw format, not as a json, so it must be defiend before we user expressjson() middleware,, DONT MOVE IT
app.post('/api/v1/events/confirmPayment/',express.raw({type: 'application/json'}),webhook)
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

await Database.getInstance()




app.use(cors({
   origin:'*', 
   credentials:true, 
   optionSuccessStatus:200,
}))
app.use(
    fileUpload({
        limits: {
            fileSize: 150000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.static('upload'))
app.use(compression())

app.use('/api/v1/book/',BookingRouter)
app.use('/api/v1/files/',FsRouter)
app.use('/api/v1/auth/',AuthRouter)
app.use('/api/v1/users/',UserRouter)
app.use('/api/v1/events/',EventRouter)
app.use('/api/v1/tickets/',TicketRouter)
app.use('/api/v1/speakers/',SpeakerRouter)
app.use('/api/v1/checkpoints/',CheckpointsRouter)
app.use('/api/v1/gatheringPoints/',gatheringPointsRouter)       

app.get('/delall',isAuthorizedMw('admin'),async(req,res,next)=>{
    await Event.deleteMany({})
    return res.json({ok:'ok'})
}) 

app.patch('/updatePassword',protect,    updatePassword
)
//testing authorizer functionality
app.get('/vishome',(req,res,next)=>{
    return res.status(200).json({home:'home'})
})
app.get('/adhome',isAuthorizedMw('admin'),(req,res,next)=>{
    return res.status(200).json({home:'home'})
})
     
/* app.post('/uploadImage',catchAsync ( async (req,res,next)=>{
   let name=await saveImage(req.files.image,{compress:true,subfolder:'a/a/'})
   return res.json(name)
})) */
app.post('/addSpeaker',isAuthorizedMw('admin'),addSpeaker)

app.get('images/*',(req,res,next)=>{
    return next(new AppError(404,`requested image not found :${req.path},${req.method}`))
})
app.all('*',(req,res,next)=>{
    return next(new AppError(404,`cant find this route :${req.path},${req.method}`))
})
app.use(ErrorHandler)


// a trick to stay up on the deployed site
var stayup={}
stayup=(await deploymentTrick.findOne())._doc

var refreshEveryMins=stayup.refreshEvery||12
setInterval(async () => {
    stayup=(await deploymentTrick.findOne())._doc
    console.log(stayup)
    if(stayup.stayup){ 
        refreshEveryMins=stayup.refreshEvery||12
        await fetch(`${stayup.siteUrl}/`).catch(err=>{
            console.log(`couldn't send to ${stayup.siteUrl}/  ,  ${err.message}`)
        })
    }        
},refreshEveryMins*60000) 


try{
const server=  app.listen(process.env.PORT, () =>{ console.log(`connected on port ${process.env.PORT}`)})
}catch(err){
    console.log(err)
}


//saftey net
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.name}. ${err.message}`)
    console.log('Uhnandled Rejection',err)
    server.close(()=>{
        process.exit(1)
    })
})
