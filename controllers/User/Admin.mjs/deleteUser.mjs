import { User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.body.id;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      messge: "user deleted succesfully",
      user,
    });
});
