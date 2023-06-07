import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";



export const createOne = (Model,populate = undefined,options = { executePost: () => {}, executePre: [async () => {}] }) => {
  return catchAsync(async (req, res, next) => {
    var filteredBody = filterObj(jsonifyObj(req.body), Model.schema.paths);
    if (options.executePre)
      for (let i in options.executePre)
        try {
          await options.executePre[i](req, res, next);
        } catch (err) {
          return next(err);
        }

    //creating the model
    var newModelObject = await Model(filteredBody);
    /* if(req.files)
    HandleImages(req,res,next,Model,newModelObject); */
    await newModelObject.save();

    //populating the model
    if (populate) 
        await newModelObject.populate(populate.join(" "));
    if (options.executePost)
         options.executePost();
    
    return res.status(201).json({
      message: `${Model.collection.collectionName} created`,
      newModelObject,
    });
  });
};
