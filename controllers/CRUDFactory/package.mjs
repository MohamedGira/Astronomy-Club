import { createOne as CreateOne} from "./CreateOne.mjs";
import { deleteOne as DeleteOne, no_Really__DeleteIt as No_Really__DeleteIt } from "./DeleteOne.mjs";
import { getAll as GetAll } from "./GetAll.mjs";
import { getOne as GetOne} from "./GetOne.mjs"
import { updateOne as UpdateOne} from "./UpdateOne.mjs";


// no need to handle Images anymore, since they have their own endpoint
export const factory={
getOne:GetOne,
getAll:GetAll,
createOne:CreateOne,
updateOne:UpdateOne,
deleteOne:DeleteOne,
no_really__deleteIt:No_Really__DeleteIt,
}







