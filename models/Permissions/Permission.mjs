import mongoose from "mongoose";
import dotenv from "dotenv";
import { Endpoint } from "../Endpoints/Endpoint.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { UserRole } from "../Users/UserRole.mjs";
import { endpointSchema } from "../Endpoints/Endpoint.mjs";
dotenv.config()
import { elementStatusSchema } from '../elementsStatus.mjs'

const permissionSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required:true},
    url:{
        type:String,
        required:true,
    },
    friendlyName:{
        type:String,
    },
       
    allowed:{
        type:Boolean,
        default:true
    }
    ,
    errorMessage:{
        type:String,
        default:"You dont have permissions to do this action"
    },
    elementStatus: {type:elementStatusSchema,default:{}},
},
{ timestamps: true });

//check that  foriegn keys are valid
permissionSchema.pre("save", async function (next) {
    
    if (!await UserRole.findById( this.role))
        return next(new AppError(400, "invalid role id"));
    let endpoint=await Endpoint.findOne({url:this.url})
    if (!endpoint)
       {
        return next(new AppError(400, "invalid endpoint"));
       }
    
    if(!this.friendlyName){
        let urlParts=endpoint.url.split('/')
        this.friendlyName=urlParts.pop()
        while(this.friendlyName[0]==':')
            this.friendlyName=urlParts.pop()
        this.friendlyName='Manage'+' '+this.friendlyName.replace(/-/g,' ')
    }
    next();
});
  


export const Permission = mongoose.model("Permission", permissionSchema);
