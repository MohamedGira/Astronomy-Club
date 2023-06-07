
import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { ResultsManager } from "../../utils/ResultsManager.mjs";

//crud factory for BASIC classes : no childReferencing Docs


/** params None, filter: filteres the resources for requested id */
export const getAll = (
  Model,
  populate = [],
  options = {
    executePost: () => {},
    executePre: [() => {}],
    showDeleted: false,
    onlyOne: false,
    sensitiveFields: [],
    resultsName: undefined,
  },
  name = undefined
) => {
  return catchAsync(async (req, res, next) => {
    if (options.executePre)
      for (let i in options.executePre)
        await options.executePre[i](req, res, next);

    const elementId = req.params.elementId;
    var results;
    results = new ResultsManager(
      Model.find().select("-__v -elementStatus"),
      req.query,
      options.sensitiveFields
    )
      .filter()
      .select()
      .paginate().query;
    //checking if must show deleted
    if (!options.showDeleted)
      results.where({ "elementStatus.isDeleted": { $ne: true } });
    //populating requested fields
    if (populate) results.populate(populate.join(" "));

    results = await results;
    if (!name) name = Model.collection.collectionName;

    if (!results)
      return next(
        new AppError(
          404,
          `requested ${name} of id ${elementId} doesn\'t exitst`
        )
      );
    if (options.onlyOne && results.length == 1) results = results[0];
    let outname = options.resultsName || "results";
    return res.status(200).json({
      message: `${results.length} ${name} found`,
      [outname]: results,
    });
  });
};

