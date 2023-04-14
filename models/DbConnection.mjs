import mongoose from'mongoose'
import dotenv from 'dotenv'
dotenv.config()

/* const localDB=''
const DB=''
if (process.env.NODE_ENV=='localdevelopment')
*/



export const connectDb= async()=>{
    
}

export class Database{
    constructor(){
       
        //console.log(DB)
    }
    static dbinstance=null
    static DB
    static async getInstance(){
        
        
        if (process.env.NODE_ENV!='prod')
            this.DB = "mongodb://127.0.0.1:27017/Astronomy" 
        else
            this.DB= `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSCDE}@cluster0.sq0pkrl.mongodb.net/astronomy?retryWrites=true&w=majority`
            console.log(this.DB)
        if(this.dbinstance==null)
        {
            mongoose.set('strictQuery', false);
            console.log("connecting to db")
            this.dbinstance= await mongoose.connect(this.DB,{
                useNewUrlParser:true,
                useUnifiedTopology:true   
            })
            console.log("Db connected")
            return  this.dbinstance
        }else{
            console.log("Db connected")
            return this.dbinstance
        }

    }
}


