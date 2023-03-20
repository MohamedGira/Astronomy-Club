import mongoose from'mongoose'


const localDB = "mongodb://127.0.0.1:27017/Astronomy"
mongoose.set('strictQuery', false);

export const connectDb= async()=>{
    console.log("connecting to db")
    await mongoose.connect(localDB,{
        useNewUrlParser:true,
        useUnifiedTopology:true   
    })

    console.log("Db connected")
}




