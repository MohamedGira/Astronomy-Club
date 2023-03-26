import mongoose from'mongoose'
import dotenv from 'dotenv'
dotenv.config()

/* const localDB=''
const DB=''
if (process.env.NODE_ENV=='localdevelopment')
*/
//const DB = "mongodb://127.0.0.1:27017/Astronomy" 
const DB= `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSCDE}@cluster0.sq0pkrl.mongodb.net/astronomy?retryWrites=true&w=majority`
//console.log(DB)
mongoose.set('strictQuery', false);

export const connectDb= async()=>{
    console.log("connecting to db")
    await mongoose.connect(DB,{
        useNewUrlParser:true,
        useUnifiedTopology:true   
    })

    console.log("Db connected")
}



