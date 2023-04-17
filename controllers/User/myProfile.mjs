import {User} from '../../models/Users/User.mjs'
import {Ticket} from '../../models/Tickets/Ticket.mjs'
import {catchAsync} from '../../utils/catchAsync.mjs'
import { AppError } from '../../utils/AppError.mjs'


export const myProfile=catchAsync(
    async (req,res,next)=>{
        return res.status(200).json(
            {
                status:'success',
                user:req.user
            }
        )
    }
)