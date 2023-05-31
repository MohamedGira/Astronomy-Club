import express from "express";
import * as extraFieldsController from "../controllers/Event/CRUDEvent/ExtraFields.mjs";
import {  RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const extraFieldsRouter=express.Router()
extraFieldsRouter.route('/')
.get(extraFieldsController.getExtraFields)
.post(RBACAutorizerMw, extraFieldsController.addExtraField)

extraFieldsRouter.route('/:elementId')
.delete(RBACAutorizerMw,extraFieldsController.deleteExtraField)


export const extraFieldsValuesRouter=express.Router()

extraFieldsValuesRouter.route('/')
.get(extraFieldsController.getExtraFieldsValues)
.post(RBACAutorizerMw,extraFieldsController.addExtraFieldsValue)
extraFieldsValuesRouter.route('/:elementId')
.get(extraFieldsController.getExtraFieldsValue)
.patch(RBACAutorizerMw,extraFieldsController.updateExtraFieldValue)
.delete(RBACAutorizerMw,extraFieldsController.deleteExtraFieldValue)



export const supportedDataTypesRouter=express.Router()
supportedDataTypesRouter.route('/')
.get(extraFieldsController.getSupporterDataTypes)
.post(RBACAutorizerMw,extraFieldsController.addSupporterDataType)
supportedDataTypesRouter.route('/:elementId')
.get(extraFieldsController.getSupporterDataType)
.patch(RBACAutorizerMw,extraFieldsController.updateSupportedDataType)
.delete(RBACAutorizerMw,extraFieldsController.deleteSupportedDataType)