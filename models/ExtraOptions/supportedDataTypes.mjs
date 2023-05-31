import mongoose from "mongoose";


const supportedDataTypesScema = mongoose.Schema({  
  name: {
    type:String,
    required:true
  }
});




export const SupportedDataType = mongoose.model("SupportedDataType", supportedDataTypesScema);

