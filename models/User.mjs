import mongoose from'mongoose'
import evalidator from'validator'
import bcrypt  from'bcrypt'
import * as UserType from'./UserType.mjs'
import phoneUtils  from'google-libphonenumber' ;
const phoneUtil=phoneUtils.PhoneNumberUtil.getInstance()




const userScema=mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,'username is required'],
            minLength:[5,'username is too short']  
        },
        password:{
            type:String,
            required:[true,'password is required'],
            minLength:[5,'password is too short']  
        },
        email:{
            type:String,
            required:[true,'Email is required'],
            unique:[true,'This email is already in use'],
            validate:{
                validator:function(){
                    return evalidator.isEmail(this);
                },
            message:"Invalid email format"
            }
        },
        profileImage:{
            type:String,
        },
        phoneNumber:{
            type:String,
            minLength:[10,'invalid phone number'],
            maxLength:[12,'invalid phone number'],
            unique:[true,'This phone number is already in use'],
            validate:{
                validator:function(){
                    try{
                    phoneUtil.isValidNumberForRegion(phoneUtil.parse(this, 'EG'), 'EG')
                    }catch(e){
                        return false;
                    }
                },
                message:'invalid phone number'
            }
        },
        UserType:{ type: mongoose.Schema.Types.ObjectId, ref: 'UserType' }
    }
)


//encrypt password before storing it to the database
userScema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,3);
    next()
})
