import { User } from "../../../models/Users/User.mjs"

export const editUser = catchAsync( async (req, res, next) => {    
    let id = req.body.id
    let body=filterObj(req.body,User.schema.paths, ['password'])
    let user=await User.findByIdAndUpdate(req.body.id,body)
    if (req.files){
        if (req.files.profileImage)
          user.profileImage=saveImage(req.files.profileImage)
      }
    await user.save();
    return res.status(200).json({
      status: "success",
      message: "user updated successfully",
      user: user,
    });
}
)