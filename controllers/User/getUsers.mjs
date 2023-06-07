import { User } from "../../models/Users/User.mjs"
import { ResultsManager } from "../../utils/ResultsManager.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"
import { getAll } from "../CRUDFactory/GetAll.mjs"


export const getusers= getAll(User,[],{sensitiveFields:['password'],resultsName:'users'})
