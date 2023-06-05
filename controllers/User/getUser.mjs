import { User } from "../../models/Users/User.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";

async function getUserbyId(id) {
  const user = await User.findById(id);
  if (!user) return null;
  user._doc["tickets"] = await Ticket.find({ user: id })
    .select(["_id", "user", "event", "link"])
    .populate("event");
  return user;
}
export const getUser = catchAsync(async (req, res, next) => {
  const id = req.params.elementId;
  const user = await getUserbyId(id);
  if (!user) return next(new AppError(404, `no user with this id ${id}`));

  return res.status(200).json({ user });
});
