
import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { connectDb } from "./models/DbConnection.js";
import cookieParser from "cookie-parser";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./Routers/Auth.mjs";
import { isAuthorized } from "./controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { EventRouter } from "./Routers/Event.mjs";
import fileUpload from "express-fileupload";

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
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);


app.use('/api/v1/auth/',AuthRouter)
app.use('/api/v1/events/',EventRouter)
app.use(express.static('upload'))


//testing authorizer functionality
app.get('/vishome',isAuthorized('visitor'),(req,res,next)=>{
    return res.status(200).json({home:'home'})
})
app.get('/adhome',isAuthorized('admin'),(req,res,next)=>{
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