import { ErrorHandler } from "./controllers/ErrorContrller.mjs";
import { Database } from "./models/DbConnection.mjs";
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppError } from "./utils/AppError.mjs";
import { AuthRouter } from "./routers/Auth.mjs";
import { RBACAutorizerMw, isAuthorizedMw } from "./controllers/Authentication/authorizationMw/Authorizer.mjs";
import fileUpload from "express-fileupload";

import { updatePassword } from "./controllers/Authentication/resetPassword.mjs";
import { Event } from "./models/Events/Event.mjs";
import { addSpeaker } from "./controllers/Event/CRUDSpeaker.mjs";
import { webhook } from "./controllers/Booking/stripeWebhook.mjs";
import compression from "compression"
import { deploymentTrick } from "./models/deploymentTrick.mjs";

//routes
import { FsRouter } from "./routers/FsRouter.mjs";
import { UserRouter } from "./routers/Users.mjs";
import { EventRouter } from "./routers/Events.mjs";
import { TicketRouter } from "./routers/Tickets.mjs";
import { SpeakerRouter } from "./routers/Speakers.mjs";
import { PaymentRouter } from "./routers/Payments.mjs";
import { BookingRouter } from "./routers/Booking.mjs";
import { eventTypesRouter } from "./routers/EventTypes.mjs";
import { CheckpointsRouter } from "./routers/Checkpoints.mjs";
import { CommentRouter } from "./routers/Comments.mjs";

import { TaskRouter } from "./routers/Tasks.mjs";
import { AssignmentRouter } from "./routers/Assignments.mjs";
import { BoardColumnRouter } from "./routers/BoardColumns.mjs";
import { CommitteeRouter } from "./routers/Committees.mjs";
import { userRolesRouter } from "./routers/UserRoles.mjs";
import { FrontendManagmentRouter } from "./routers/frontendManagment.mjs";
import listEndpoints from "express-list-endpoints";
import slugify from "slugify";
import { PermissionRouter } from "./routers/Permissions.mjs";
import { EndpointRouter } from "./routers/Endpoints.mjs";
import { InitializeEndpoints2 } from "./controllers/Endpoint/EndpointController.mjs";
import { gatheringPointsRouter } from "./routers/GatheringPoints.mjs";
import { KanbanRouter } from "./routers/Kanbans.mjs";

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
app.use('/api/v1/gatheringPoints/',gatheringPointsRouter)
app.use('/api/v1/tasks/',TaskRouter)
app.use('/api/v1/assignments/',AssignmentRouter)
app.use('/api/v1/boardColumns/',BoardColumnRouter)
app.use('/api/v1/frontendManagment/',FrontendManagmentRouter)
app.use('/api/v1/permissions/',PermissionRouter)
app.use('/api/v1/endpoints/',EndpointRouter)
app.use('/api/v1/kanbans',KanbanRouter)


     


app.get('/images/*',(req,res,next)=>{
    return next(new AppError(404,`requested image not found :${req.path},${req.method}`))
})
app.all('*',(req,res,next)=>{
    return next(new AppError(404,`cant find this route :${req.path},${req.method}`))
})
app.use(ErrorHandler)

try{
  await Database.getInstance();
  const server=  await app.listen(process.env.PORT, () =>{ console.log(`connected on port ${process.env.PORT}`)})
  let stayup=(await deploymentTrick.findOne())
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
  //InitializeEndpoints2(app)

  }catch(err){
      console.log(err)
 }
  

 


//saftey net
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name}. ${err.message}`);
  console.log("Uhnandled Rejection", err);

});





