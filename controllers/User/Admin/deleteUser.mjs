import { User } from "../../../models/Users/User.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { deleteOne } from "../../CRUDFactory.mjs";

export const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.body.elementId;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      messge: "user deleted succesfully",
      user,
    });
});

export const deleteUser2=deleteOne(User)