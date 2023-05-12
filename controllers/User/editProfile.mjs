import { User } from "../../models/Users/User.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";

import { filterObj } from "../../utils/objOp.mjs";
import { saveImage } from "../../utils/uploads/saveImage.mjs";

export const editProfile = catchAsync( async (req, res, next) => {    
    let body=filterObj(req.body,User.schema.paths,['password','role','committee','confirmed'])
    let user=await User.findById(req.user._id)
    for (let a in body){
      user[a]=body[a]
    }
    if (req.files){
      if (req.files.profileImage)
        user.profileImage=await saveImage(req.files.profileImage)
    }
    
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "profile updated successfully",
      user: user,
    });
}
)
