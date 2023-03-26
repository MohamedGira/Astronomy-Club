import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { connectDb } from "./models/DbConnection.js";
import cookieParser from "cookie-parser";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./Routers/Auth.mjs";
import { isAuthorizedMw } from "./controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { EventRouter } from "./Routers/Event.mjs";
import fileUpload from "express-fileupload";
import { saveImage } from "./utils/image/saveImage.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { catchAsync } from "./utils/catchAsync.mjs";
import { TicketRouter } from "./Routers/Ticket.mjs";
import { updatePassword } from "./controllers/Authentication/resetPassword.mjs";
import { isLoggedInMw, protect } from "./controllers/Authentication/AuthUtils.mjs";
import { UserRouter } from "./Routers/User.mjs";
import { Event } from "./models/Events/Event.mjs";
import { Speaker } from "./models/Events/subSchemas/Speaker.mjs";
import { Checkpoint } from "./models/Events/subSchemas/checkpoint.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.on('uncaughtException',err=>{
    console.trace(`Error: ${err}`)
    console.log('Uncaught Exception')
    process.exit(1)
})

const app = express()
await connectDb()
dotenv.config()

   
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({origin:""}))
app.use(
    fileUpload({
        limits: {
            fileSize: 150000000,
        },
        abortOnLimit: true,
    })
);


app.use(express.static('upload'))
app.use('/',AuthRouter)
app.use('/api/v1/events/',EventRouter)
app.use('/api/v1/tickets/',TicketRouter)
app.use('/api/v1/users/',UserRouter)
app.get('/delall',isAuthorizedMw('admin'),async(req,res,next)=>{
    await Event.deleteMany({})
    await Speaker.deleteMany({})
    await Checkpoint.deleteMany({})
    return res.json({ok:'ok'})
})
//test image saving
app.post('/upload',catchAsync(
    async (req,res,next)=>{
        if(req.files){
            await saveImage(req.files.image,__dirname+'/upload/')
            return res.status(200).json({message:'success'})
        }
        return res.status(500).json({message:'fail'})
    }
))
//test image saving
app.patch('/updatePassword',protect,    updatePassword
)
//testing authorizer functionality
app.get('/vishome',isAuthorizedMw('visitor'),(req,res,next)=>{
    return res.status(200).json({home:'home'})
})
app.get('/adhome',isAuthorizedMw('admin'),(req,res,next)=>{
    return res.status(200).json({home:'home'})
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