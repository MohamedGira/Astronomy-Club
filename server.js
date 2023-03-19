import { Compressor } from "./utils/ImageCompression/compressor.mjs";
import { connectDb } from "./models/DbConnection.js";
import { UserRole } from "./models/UserType.mjs";
import { User } from "./models/User.mjs";

await  connectDb()
await User.create({
    username:'Gira',
    password:'12345',
    email:'mohamedrgira029021@gmail.com',
    profileImage:'',
    phoneNumber:'+201121210998',

    })
    console.log('usercreated')
//await UserRole.create({role:'visitor'})
console.log('role creted')