import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";

/** params req.params: elementId -> referes to the  document to be deleted */
export const deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.elementId;
    const doc = await Model.findById(id);

    if (!doc)
      return next(new AppError(404, `requested document ${id} doesn't exitst`));
    if (!doc.elementStatus)
        doc.elementStatus = {};
    doc.elementStatus.isDeleted = true;
    doc.elementStatus.deletedBy = req.user._id;
    await doc.save();
    return res.status(204).json({
      message: "deleted succesfully",
      doc,
    });
  });
};



/** params req.params: elementId -> referes to the  document to be deleted */
export const no_Really__DeleteIt = (Model) => {
  return catchAsync(async (req, res, next) => {
    const id = req.params.elementId;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc)
      return next(
        new AppError(404, `requested document ${doer} doesn't exitst`)
      );
    return res.status(204).json({
      message: "deleted succesfully",
      doc,
    });
  });
};
