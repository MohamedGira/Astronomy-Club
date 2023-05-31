import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { Database } from "./models/DbConnection.mjs";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./Routers/Auth.mjs";
import { RBACAutorizerMw, isAuthorizedMw } from "./controllers/Authentication/authorizationMw/Authorizer.mjs";
import fileUpload from "express-fileupload";

import { updatePassword } from "./controllers/Authentication/resetPassword.mjs";
import { Event } from "./models/Events/Event.mjs";
import { addSpeaker } from "./controllers/Event/CRUDSpeaker.mjs";
import { webhook } from "./controllers/Booking/stripeWebhook.mjs";
import compression from "compression"
import { deploymentTrick } from "./models/deploymentTrick.mjs";

//routes
import { FsRouter } from "./Routers/FsRouter.mjs";
import { UserRouter } from "./Routers/Users.mjs";
import { EventRouter } from "./Routers/Events.mjs";
import { TicketRouter } from "./Routers/Tickets.mjs";
import { SpeakerRouter } from "./Routers/Speakers.mjs";
import { PaymentRouter } from "./Routers/Payments.mjs";
import { BookingRouter } from "./Routers/Booking.mjs";
import { eventTypesRouter } from "./Routers/EventTypes.mjs";
import { CheckpointsRouter } from "./Routers/Checkpoints.mjs";
import { CommentRouter } from "./Routers/Comments.mjs";

import { TaskRouter } from "./Routers/Tasks.mjs";
import { AssignmentRouter } from "./Routers/Assignments.mjs";
import { BoardColumnRouter } from "./Routers/BoardColumns.mjs";
import { CommitteeRouter } from "./Routers/Committees.mjs";
import { userRolesRouter } from "./Routers/UserRoles.mjs";
import { FrontendManagmentRouter } from "./Routers/frontendManagment.mjs";
import listEndpoints from "express-list-endpoints";
import slugify from "slugify";
import { PermissionRouter } from "./Routers/Permissions.mjs";
import { EndpointRouter } from "./Routers/Endpoints.mjs";
import { InitializeEndpoints2 } from "./controllers/Endpoint/EndpointController.mjs";

process.on('uncaughtException',err=>{
    console.trace(`Error: ${err}`)
    console.log('Uncaught Exception')
    process.exit(1)
})

 
const app = express()




dotenv.config()
//this webhook uses request body as raw format, not as a json, so it must be defiend before we user expressjson() middleware,, DONT MOVE IT
app.post('/api/v1/events/payment/',express.raw({type: 'application/json'}),webhook)
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
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

app.use('/api/v1/files/',FsRouter)
app.use('/api/v1/auth/',AuthRouter)
app.use('/api/v1/users/',UserRouter)
app.use('/api/v1/tasks/',TaskRouter)
app.use('/api/v1/events/',EventRouter)
app.use('/api/v1/userRoles/',userRolesRouter)

app.use('/api/v1/committees/',CommitteeRouter)
app.use('/api/v1/book/',BookingRouter)
app.use('/api/v1/tickets/',TicketRouter)
app.use('/api/v1/comments/',CommentRouter)
app.use('/api/v1/speakers/',SpeakerRouter)
app.use('/api/v1/payments/',PaymentRouter)
app.use('/api/v1/eventTypes/',eventTypesRouter)
app.use('/api/v1/assignments/',AssignmentRouter)
app.use('/api/v1/checkpoints/',CheckpointsRouter)
app.use('/api/v1/tasks/',TaskRouter)
app.use('/api/v1/assignments/',AssignmentRouter)
app.use('/api/v1/boardColumns/',BoardColumnRouter)
app.use('/api/v1/frontendManagment/',FrontendManagmentRouter)
app.use('/api/v1/permissions/',PermissionRouter)
app.use('/api/v1/endpoints/',EndpointRouter)



     
/* app.post('/uploadImage',catchAsync ( async (req,res,next)=>{
   let name=await saveImage(req.files.image,{compress:true,subfolder:'a/a/'})
   return res.json(name)
})) */

app.get('images/*',(req,res,next)=>{
    return next(new AppError(404,`requested image not found :${req.path},${req.method}`))
})
app.all('*',(req,res,next)=>{
    return next(new AppError(404,`cant find this route :${req.path},${req.method}`))
})
app.use(ErrorHandler)

 
// a trick to stay up on the deployed site
let stayup=(await deploymentTrick.findOne())
console.log(stayup)
var refreshEveryMins=stayup.refreshEvery||12
setInterval(async () => {
    stayup=(await deploymentTrick.findOne())
    if(stayup)
        stayup=stayup._doc
    console.log(stayup.stayup)
    if(stayup.stayup){ 
        refreshEveryMins=stayup.refreshEvery||12
        await fetch(`${stayup.siteUrl}/`).catch(err=>{
            console.log(`couldn't send to ${stayup.siteUrl}/  ,  ${err.message}`)
        })
    }        
},refreshEveryMins*60000) 
 

try{
await Database.getInstance();
const server=  await app.listen(process.env.PORT, () =>{ console.log(`connected on port ${process.env.PORT}`)})
}catch(err){
    console.log(err)
}

//saftey net
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name}. ${err.message}`);
  console.log("Uhnandled Rejection", err);
  server.close(() => {
    process.exit(1);
  });
});





