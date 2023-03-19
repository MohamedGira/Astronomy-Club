const mongoose=require('mongoose')
const evalidator=require('validator')
const bcrypt= require('bcrypt')
const UserType=require('./UserType')
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

console.log()


const userScema=mongoose.Schema(
    {
        username:{
            Type:String,
            required:[true,'username is required'],
            minLength:[5,'username is too short']  
        },
        password:{
            Type:String,
            required:[true,'password is required'],
            minLength:[5,'password is too short']  
        },
        email:{
            Type:String,
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
            data: Buffer,
            contentType: String
        },
        phoneNumber:{
            Type:String,
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
