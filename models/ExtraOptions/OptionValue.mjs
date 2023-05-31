import mongoose from "mongoose";
import { TypesOption } from "./TypesOptions.mjs";
import { elementStatusSchema } from "../elementsStatus.mjs";


const OptionValueScema = mongoose.Schema({
  
  TypeOption: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypesOption",
    required:true
  },
  element:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  },
  value: {
    type:String,
    required:true
  }
,    elementStatus: {type:elementStatusSchema,default:{}},

});

OptionValueScema.pre(/^find/, function (next) {
  this.populate("TypeOption");
  next();
});

OptionValueScema.pre("save", async function (next) {
  if(!await TypesOption.findById(this.TypeOption))
    return next(new AppError("Invalid TypeOption id"));
  return next();
});



export const OptionValue = mongoose.model("OptionValue", OptionValueScema);

