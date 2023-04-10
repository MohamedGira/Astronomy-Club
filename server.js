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
import { catchAsync } from "./utils/catchAsync.mjs";
import { TicketRouter } from "./Routers/Ticket.mjs";
import { updatePassword } from "./controllers/Authentication/resetPassword.mjs";
import {  protect } from "./controllers/Authentication/AuthUtils.mjs";
import { UserRouter } from "./Routers/User.mjs";
import { setCache } from "./utils/cache.mjs";
import { Event } from "./models/Events/Event.mjs";
import { User } from "./models/Users/User.mjs";
import { gatheringPointsRouter } from "./Routers/GatheringPoints.mjs";
import { CheckpointsRouter } from "./Routers/Checkpoints.mjs";
import { FsRouter } from "./Routers/FsRouter.mjs";
import { imageHandler } from "./utils/uploads/ImageCompression/compressor.mjs";
import { saveImage } from "./utils/uploads/saveImage.mjs";
import { addSpeaker } from "./controllers/Event/speakers/CRUDSpeaker.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.on('uncaughtException',err=>{
    console.trace(`Error: ${err}`)
    console.log('Uncaught Exception')
    process.exit(1)
})


const app = express()





dotenv.config()
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
app.use('/api/v1/files/',FsRouter)
app.use('/api/v1/auth/',AuthRouter)
app.use('/api/v1/users/',UserRouter)
app.use('/api/v1/events/',EventRouter)
app.use('/api/v1/gatheringPoints/',gatheringPointsRouter)
app.use('/api/v1/checkpoints/',CheckpointsRouter)
app.use('/api/v1/tickets/',TicketRouter)
app.use('/api/v1/checkpoints/',CheckpointsRouter)
app.use('/api/v1/gatheringPoints/',gatheringPointsRouter)           

app.get('/delall',isAuthorizedMw('admin'),async(req,res,next)=>{
    await Event.deleteMany({})
    
    return res.json({ok:'ok'})
}) 

app.patch('/updatePassword',protect,    updatePassword
)
//testing authorizer functionality
app.get('/vishome',isAuthorizedMw('visitor'),(req,res,next)=>{
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


const server=  app.listen(process.env.PORT, () =>{ console.log(`connected on port ${process.env.PORT}`)})



//saftey net
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.name}. ${err.message}`)
    console.log('Uhnandled Rejection',err)
    server.close(()=>{
        process.exit(1)
    })
})
