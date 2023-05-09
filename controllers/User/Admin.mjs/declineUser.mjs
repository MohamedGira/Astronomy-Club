import { STATUS_MAP, User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const confirmUser = catchAsync(async (req, res, next) => {
  const id = req.body.id;
  const user = await User.findByIdAndUpdate(id, { status: STATUS_MAP[2] });

  if (user.status == STATUS_MAP[2])
    return next(new AppError(400, "this user is already declined"));

  if (
    typeof window !== "undefined" &&
    window.confirm("Are you sure you want to proceed?")
  ) {
    // user clicked "OK", perform the action here
    user._doc.status = STATUS_MAP[2];
    return res.status(200).json({
      messge: "user declined succesfully",
      user,
    });
  } else {
    // user clicked "Cancel", do nothing or show a message
    return res.status(200).json({
      messge: "User's status has not changed!",
    });
  }
});
