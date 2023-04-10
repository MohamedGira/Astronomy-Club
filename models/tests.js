
//invalid email and phone|:passed
User.create({
    username:'Gira',
    password:'12345',
    email:'mohamed',
    profileImage:'',
    phoneNumber:'+20111',
    }
    )

// invalid role
User.create({
    username:'Gira',
    password:'12345',
    email:'sdfsdfsd@gmail.com',
    profileImage:'',
    phoneNumber:'+201117230968',
    role:'641769dfb5da5e2bdc545912'
    })

//valid rule, pass
User.create({
    username:'Gira',
    password:'12345',
    email:'mohamedgira@gmail.com',
    profileImage:'',
    phoneNumber:'+201117230999',
    role:'6417697b843a6c0bf935c86e'
}


//get test to apply prevtests on client
app.get('/',async(req,res,next)=>{
    try{
        await User.create({
            username:'Gira',
            password:'12345',
            email:'sdfsdd2fs4a442d415@gmail.com',
            profileImage:'',
            phoneNumber:'+203144130228',
            role:'6417697b843a6c0bf935c86e'
            })
    }catch (err){
        return next(err)
    }
    return res.status(200).json({
        message:'user created succesfully'
    })
})

