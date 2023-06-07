import { User } from "../../models/Users/User.mjs";
import { updateOne } from "../CRUDFactory/UpdateOne.mjs";



export const editProfile = updateOne(User,['password','role','committee','confirmed','profileImage'])

