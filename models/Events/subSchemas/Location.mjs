import mongoose from'mongoose'
import { AppError } from '../../../utils/AppError.mjs';


export const PointSchema = new mongoose.Schema({
    type: {
      type: String,
      default:'Point',
      enum:['Point'],
      required: true,
      
    },
    coordinates: {
      type: [Number], //[latitude,longitude]
      required: true,
      default:undefined
    },
    _id:false
  });

//validate coordinates  
PointSchema.pre('save',async function(next){
  if(this.coordinates.length!=2)
    return next(new AppError('400','invalid coordinates inputs'))
  next()
})


export const LocationSchema = new mongoose.Schema({
    landmark: String,
    location: {
      type: PointSchema,
    }
});
export const Location=mongoose.model("Location",LocationSchema)


