import { User } from "../../../models/Users/User.mjs"
import { updateOne } from "../../CRUDFactory/UpdateOne.mjs"


export const editUser = updateOne(User,['password'],{executePre:[
  async (req, res, next) => {    
    if(req.body.committee=='N/A')
        req.body.committee=null
    }
]})