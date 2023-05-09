import { User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

export const confirmUser = catchAsync(async (req, res, next) => {
  const id = req.body.id;

  if (
    typeof window !== "undefined" &&
    window.confirm("Are you sure you want to proceed?")
  ) {
    // user clicked "OK", perform the action here
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      messge: "user deleted succesfully",
      user,
    });
  } else {
    // user clicked "Cancel", do nothing or show a message
    return res.status(200).json({
      messge: "User's has not been deleted!",
    });
  }
});
