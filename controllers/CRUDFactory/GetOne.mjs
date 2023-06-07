
import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";

/** params req.params: elementId -> referes to the requested document */
export const getOne = (Model,populate = [],
    options = {executePost: () => {},executePre: [() => {}],showDeleted: false,resultsName: undefined,
  },name = undefined) => {
  return catchAsync(async (req, res, next) => {
    //fetching the element
    const elementId = req.params.elementId;
    var modelObject = Model.findOne({ _id: elementId }).select(
      "-__v -elementStatus"
    );
    //populating the element
    if (populate) modelObject.populate(populate.join(" "));
    //checking if must show deleted
    if (!options.showDeleted)
      modelObject.where({ "elementStatus.isDeleted": { $ne: true } });

    //executing the query
    modelObject = await modelObject;

    if (!modelObject)
      return next(new AppError(404,`requested object of id ${elementId} doesn\'t exitst`));
    if (!name)
         name = Model.collection.collectionName;
    return res.status(200).json({
      message: `${name} found`,
      modelObject,
    });
  });
};

