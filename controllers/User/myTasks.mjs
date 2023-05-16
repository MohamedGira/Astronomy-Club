import {Assignment} from '../../models/Assignments/Assignment.mjs'
import {catchAsync} from '../../utils/catchAsync.mjs'

export const myTasks=catchAsync(
    
    async (req,res,next)=>{
        var tasks = await Assignment.find({userID: req.user._id}).select('taskID').populate('taskID')
        tasks = tasks.map(task => {
            return task._doc.taskID
        })
        return res.status(200).json(
            {
                status:'success',
                tasks
            }
        )
    }
)