import { User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const getPendingUsers = catchAsync(async (req, res, next) => {
  const user = await User.find({ confirmed: false });
  if (!user) {
    return next(new AppError(200, "No pending users!"));
  }
  return res.status(200).json({
    messge: "success",
    count: users.length,
    users,
  });
});
