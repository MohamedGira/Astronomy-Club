import mongoose from'mongoose'
import dotenv from 'dotenv'
import { Endpoint } from './Endpoints/Endpoint.mjs'
import { Permission } from './Permissions/Permission.mjs'
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
    static endpointInstance=null
    static permissionInstance=null

    static DB
    static async getInstance(){
        
        if(process.env.NODE_ENV=='gdev')
        this.DB = 'mongodb://127.0.0.1:27017/Astronomy'
        else if (process.env.NODE_ENV!='prod')
        this.DB= `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSCDE}@cluster0.sq0pkrl.mongodb.net/astronomy?retryWrites=true&w=majority`
        else
        this.DB= `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSCDE}@cluster0.sq0pkrl.mongodb.net/astronomy?retryWrites=true&w=majority`
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
            return this.dbinstance
        }

    }

    static async getEndpointsInstance(){
        await Database.getInstance()
        if(this.endpointInstance==null)
        {
            console.log('getting endpoints')
            this.endpointInstance=await Endpoint.find()
            return this.endpointInstance
        }
        else{
            return this.endpointInstance
        }
    }
    static async getPermissionsInstance(){
        await Database.getInstance()
        if(this.permissionInstance==null)
        {   
            console.log('getting permissions')
            this.permissionInstance=await Permission.find()
            return this.permissionInstance
        }
        else{
            return this.permissionInstance
        }
    }
    static async updateEndpointsInstance(){
        this.endpointInstance=await Endpoint.find()
        console.log('updating endpoints')
        return this.endpointInstance
    }
    static async updatePermissionsInstance(){
        try{
        this.permissionInstance=await Permission.find()
        console.log('updating permissions')
        return this.permissionInstance
        }
        catch(err){
            console.log(err)
        }
        
    }
}


