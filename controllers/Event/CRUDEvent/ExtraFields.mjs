import { EventType } from "../../../models/Events/EventTypes.mjs";
import { OptionValue } from "../../../models/ExtraOptions/OptionValue.mjs";
import { TypesOption } from "../../../models/ExtraOptions/TypesOptions.mjs";
import { SupportedDataType } from "../../../models/ExtraOptions/supportedDataTypes.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { deleteOne, no_Really__DeleteIt } from "../../CRUDFactory.mjs";
import { CreateOne, getAll, getOne, updateOne } from "../../CRUDFactory.mjs";


//ExtraFields Options
export const getExtraFields = getAll(TypesOption)
export const deleteExtraField = deleteOne(TypesOption)
export const addExtraField = CreateOne(TypesOption)



//ExtraFields Values
export const addExtraFieldsValue = CreateOne(OptionValue,[],{executePre:[
    async(req,res,next)=>{
        const {element,TypeOption} = req.body
        if(await OptionValue.findOne({element,TypeOption,'elementStatus.isDeleted':{ $ne: true }})){
            throw new AppError(400,"This Field is Occupied Already, update it instead")
        }
    }
]})
export const getExtraFieldsValues = getAll(OptionValue)
export const getExtraFieldsValue = getOne(OptionValue)
export const updateExtraFieldValue = updateOne(OptionValue,['element','TypeOption'])
export const deleteExtraFieldValue = deleteOne(OptionValue)


//Supported DataTypes
export const addSupporterDataType = CreateOne(SupportedDataType)
export const getSupporterDataTypes = getAll(SupportedDataType)
export const getSupporterDataType = getOne(SupportedDataType)
export const updateSupportedDataType = updateOne(SupportedDataType)
export const deleteSupportedDataType = no_Really__DeleteIt(SupportedDataType)
