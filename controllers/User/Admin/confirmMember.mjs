import { User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const confirmUser = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const user = await User.findByIdAndUpdate(id, { status: STATUS_MAP[1] });

  if (user.status == STATUS_MAP[1])
    return next(new AppError(400, "this user is already confirmed"));


  user._doc.status = STATUS_MAP[1];
  return res.status(200).json({
    messge: "user approved succesfully",
    user,
  });

});
