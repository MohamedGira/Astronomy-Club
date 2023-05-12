import {  User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const declineUser = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const user = await User.findByIdAndUpdate(id, { status: STATUS_MAP[2] });

  if (user.status == STATUS_MAP[2])
    return next(new AppError(400, "this user is already declined"));

  user._doc.status = STATUS_MAP[2];
  return res.status(200).json({
    messge: "user declined succesfully",
    user,
  });
  
});
