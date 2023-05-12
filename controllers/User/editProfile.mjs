import { User } from "../../models/Users/User.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { saveImage } from "../../utils/image/saveImage.mjs";
import { filterObj } from "../../utils/objOp.mjs";

export const editProfile = catchAsync( async (req, res, next) => {    
    let body=filterObj(req.body,User.schema.path,['password','phoneNumber','email'])
    let user=await User.findByIdAndUpdate(req.user._id,body)
    if (req.files){
      if (req.files.profileImage)
        user.profileImage=saveImage(req.files.profileImage)
    }
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "profile updated successfully",
      user: user,
    });
}
)