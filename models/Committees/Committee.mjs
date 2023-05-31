import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.mjs";
import { Kanban } from "../Kanban/Kanban.mjs";
import { elementStatusSchema } from '../elementsStatus.mjs'

export const committeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  president: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  elementStatus: {type:elementStatusSchema,default:{}},

}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

committeeSchema.post('save',async function(){
  if(! await Kanban.findOne({committee:this._id}))
    {
      console.log('no kanban found',this._id)
      await Kanban.create({committee:this._id})
    }
})
committeeSchema.virtual('kanban', { ref: 'Kanban', foreignField: 'committee', localField: '_id' ,  justOne: true,match:{'elementStatus.isDeleted':{$ne:true}}});

export const Committee = mongoose.model("Committee", committeeSchema);
