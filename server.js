
import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { connectDb } from "./models/DbConnection.js";
import cookieParser from "cookie-parser";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./Routers/Auth.mjs";

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


app.use('/api/v1/auth/',AuthRouter)

app.all('*',(req,res,next)=>{
    return next(new AppError(404,`cant find this route :${req.path},${req.method}`))
})
app.use(ErrorHandler)


const server= app.listen(process.env.PORT, () => console.log(`connected on port ${process.env.PORT}`))

//saftey net
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.name}. ${err.message}`)
    console.log('Uhnandled Rejection',err)
    server.close(()=>{
        process.exit(1)
    })
})