import { User } from "../../models/Users/User.mjs";
import { Ticket } from "../../models/Tickets/Ticket.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { getOne } from "../CRUDFactory/GetOne.mjs";


export const getUser = getOne(User,[],{resultsName:'user'})