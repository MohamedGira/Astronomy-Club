import mongoose from "mongoose";
import { SupportedDataType } from "./supportedDataTypes.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { elementStatusSchema } from "../elementsStatus.mjs";



const TypesOptionsSchema = mongoose.Schema({

  type: {
    type: mongoose.Schema.Types.ObjectId,
    required:true
  },
  fieldName: {
    type:String,
    required:true
  },
  dataType:{
    type: String,
    required:true
  }
  ,    elementStatus: {type:elementStatusSchema,default:{}},

  
});

TypesOptionsSchema.pre("save", async function (next) {
  if(!await SupportedDataType.findOne({name: this.dataType}))
    return next(new AppError(400,"Unsupported Data Type"));
  return next();
});


export const TypesOption = mongoose.model("TypesOption", TypesOptionsSchema);

