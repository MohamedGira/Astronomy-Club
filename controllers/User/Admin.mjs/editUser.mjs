import { User } from "../../../models/Users/User.mjs"
import { catchAsync } from "../../../utils/catchAsync.mjs"
import { filterObj } from "../../../utils/objOp.mjs"
import { saveImage } from "../../../utils/uploads/saveImage.mjs"

export const editUser = catchAsync( async (req, res, next) => {    
    
    let body=filterObj(req.body,User.schema.paths, ['password'])
    
    let user=await User.findByIdAndUpdate(req.params.id,body,{new:true})
    if (req.files){
        console.log(user)
        if (req.files.profileImage)
          user.profileImage=await saveImage(req.files.profileImage)
      }
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "user updated successfully",
      user: user,
    });
}
)