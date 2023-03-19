import { Compressor } from "./utils/ImageCompression/compressor.mjs";
import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { connectDb } from "./models/DbConnection.js";
import { UserRole } from "./models/UserType.mjs";
import cookieParser from "cookie-parser";
import { User } from "./models/User.mjs";
import express from 'express';
import dotenv from "dotenv";
import cors from 'cors'


const app = express()
await connectDb()
dotenv.config()


process.on('uncaughtException',err=>{
    console.trace(`Error: ${err}`)
    console.log('Uncaught Exception')
    process.exit(1)
    
})



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({origin:""}))



app.all('*',(req,res)=>{
    return next(new AppError(404,`cant find this route :${req.path},${req.method}`))
})

app.use(ErrorHandler)


const server= app.listen(process.env.PORT, () => console.log(`connected on port ${process.env.PORT}`))

//saftey net
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.name}. ${err.message}`)
    console.log('Uhnandled Rejection')
    server.close(()=>{
        process.exit(1)
    })
})