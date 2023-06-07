import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { logger } from "../../utils/logger.mjs";



/** params req.params: elementId -> referes to the  document to be updated */
/** Image saving must be handled in executePres */
export const updateOne = (Model,filterout = [],options = { executePost: () => {}, executePre: [async () => {}] }) => {
  return catchAsync(async (req, res, next) => {
    if (options.executePre)
      for (let i in options.executePre)
        await options.executePre[i](req, res, next);

    var update = {...filterObj(jsonifyObj(req.body), Model.schema.paths, ...filterout)};
    const elementId = req.params.elementId;

    let newModelObject = await Model.findById(elementId);
    if (!newModelObject)
      return next(
        new AppError(400,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`)
      );

    newModelObject = Object.assign(newModelObject, update);

    newModelObject = await newModelObject.save();
    
    if (options.executePost) 
        options.executePost();
    
    let doer = req.user ? req.user.id : "annoymous";
    logger.log({
      level: "info",
      message: `${Model.collection.collectionName} updated succesfully ${req.ip} ${doer}`,
    });

    return res.status(200).json({
      message: "updated succesfully",
      newModelObject,
    });
  });
};
