export const updateUser = async (req, res, next) => {
  try {
    const user = req.user;

    if (req.body.firstName) user.firstName = req.body.firstName;
    if (req.body.lastName) user.lastName = req.body.lastName;
    if (req.body.password) user.password = req.body.password;
    if (req.body.email) user.email = req.body.email;
    if (req.body.profileImage) user.profileImage = req.body.profileImage;
    if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: user,
    });
  } catch (error) {
    return next(
      new AppError(400, "An error occured while updating the user!!")
    );
  }
};
