import { User } from "../../../models/Users/User.mjs";
import { deleteOne } from "../../CRUDFactory/DeleteOne.mjs";



export const deleteUser=deleteOne(User)