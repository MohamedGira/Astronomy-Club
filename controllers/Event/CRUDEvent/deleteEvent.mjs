import { Event } from "../../../models/Events/Event.mjs"
import { AppError } from "../../../utils/AppError.mjs"
import { catchAsync } from "../../../utils/catchAsync.mjs"
import {deleteOne} from "../../CRUDFactory.mjs";

export const deleteEvent= deleteOne(Event)