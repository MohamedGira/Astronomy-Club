import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const permessionSchema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required:true},
    url: {
        String,
        required:true
    },
    method: {
        type: String,
        enum: ["GET", "POST", "PATCH", "DELETE"],
    },
    friendlyName:{
        String,
    },   
    allowed:{
        type:Boolean,
        default:true
    }
},
{ timestamps: true });

//check that  foriegn keys are valid
userScema.pre("save", async function (next) {
  
    if(this.role)
    {
      const data = await UserRole.findById( this.role);
      if (!data) return next(new AppError(400, "invalid role id"));
    }
    if(this.url)
    {
      const data = await UserRole.findById( this.role);
      if (!data) return next(new AppError(400, "invalid role id"));
    }
    next();
  });
  


export const Permession = mongoose.model("Permession", permessionSchema);
