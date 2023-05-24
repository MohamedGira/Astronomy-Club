import mongoose from "mongoose";
import dotenv from "dotenv";
import { Endpoint } from "../Endpoints/Endpoint.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { UserRole } from "../Users/UserRole.mjs";
import { endpointSchema } from "../Endpoints/Endpoint.mjs";
dotenv.config()

const permissionSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required:true},
    endpoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Endpoint',
        required:true
    },
    friendlyName:{
        type:String,
    },   
    allowed:{
        type:Boolean,
        default:true
    }
},
{ timestamps: true });

//check that  foriegn keys are valid
permissionSchema.pre("save", async function (next) {

    if (!await UserRole.findById( this.role))
        return next(new AppError(400, "invalid role id"));
    let endpoint=await Endpoint.findById(this.endpoint)
    if (!endpoint)
       {
        return next(new AppError(400, "invalid endpoint"));
       }
    
    if(!this.friendlyName){
        let urlParts=endpoint.url.split('/')
        this.friendlyName=urlParts.pop()
        while(this.friendlyName[0]==':')
            this.friendlyName=urlParts.pop()
        this.friendlyName=endpoint.method.toLowerCase().replace('patch','update')+' '+this.friendlyName.replace(/-/g,' ')
    }
    next();
});
  


export const Permission = mongoose.model("Permission", permissionSchema);
