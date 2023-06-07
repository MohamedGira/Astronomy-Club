import { OptionValue } from "../../models/ExtraOptions/OptionValue.mjs";
import { TypesOption } from "../../models/ExtraOptions/TypesOptions.mjs";
import { SupportedDataType } from "../../models/ExtraOptions/supportedDataTypes.mjs";
import { AppError } from "../../utils/AppError.mjs";
import {factory} from "../CRUDFactory/package.mjs";



//ExtraFields Options
export const getExtraFields = factory.getAll(TypesOption)
export const deleteExtraField = factory.deleteOne(TypesOption)
export const addExtraField = factory.createOne(TypesOption)



//ExtraFields Values
export const addExtraFieldsValue = factory.createOne(OptionValue,[],{executePre:[
    async(req,res,next)=>{
        const {element,TypeOption} = req.body
        if(await OptionValue.findOne({element,TypeOption,'elementStatus.isDeleted':{ $ne: true }})){
            throw new AppError(400,"This Field is Occupied Already, update it instead")
        }
    }
]})

export const getExtraFieldsValues = factory.getAll(OptionValue)
export const getExtraFieldsValue = factory.getOne(OptionValue)
export const updateExtraFieldValue = factory.updateOne(OptionValue,['element','TypeOption'])
export const deleteExtraFieldValue = factory.deleteOne(OptionValue)


//Supported DataTypes
export const addSupporterDataType = factory.createOne(SupportedDataType)
export const getSupporterDataTypes = factory.getAll(SupportedDataType)
export const getSupporterDataType = factory.getOne(SupportedDataType)
export const updateSupportedDataType = factory.updateOne(SupportedDataType)
export const deleteSupportedDataType = factory.no_really__deleteIt(SupportedDataType)
