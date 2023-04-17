# Endpoints

## general response

on any failed response, (status code other than 2xx), the following body format is sent as a response
`
 body {
    status: "",
    statusCode: number,
    message: "error cause"
  }`
`

---

## Authentication Endpoints

### Member Registration
`api/v2/auth/register`

request:Post
```
body:
{
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    passwordConfirm:'',
    profileImage:'', //optional
    phoneNumber:'',  //optional
}
```
* onSuccess: `status(200), {message: "user created successfully,..."};`
* already signed in user: `status(401), 
     message: message: "a user is already logged in to this device"
`

* confirmation mail failed to send: `status(500),
    message:message: "something went wrong try again later"
`
   
* invalid data entered: `status(400),
    message: "the cause"
  `

---

### Registration Confirmaion (HTML in email) deprecated
```api/v1/auth/confirmRegistration```

request:get
```
api/v1/auth/confirmRegistration?token=${token}
```
* onSuccess: `status(200), {message: "resgistration confirmed"};`
* invalid token (unlikely): `status(400), {message: "invalid token"}`
* token expired: `status(401), {message: "request expired, register again"}`

---
### Login

```api/v2/auth/login```

request : post

body: `{
    email:'',    
    password:''
}
`

* onSuccess: 
  `  res
    .cookie("jwt", token, consts.LOGIN_TIMEOUT_MILLIS)
    .status(200)
    .json({
        message: "signed in",
        user: user._id,
    });`
* invalid inputs:`status(400), {message: "${the cause}"}`
* user registered but not confirmed via email:`status(400), {message: "${the cause}"}`

### Logout
```api/v1/auth/logout```

request : get

* onSuccess: redirect happens
* onFailure: `status(400), {message:cause} //check general response`

### Reset Password
```api/v1/auth/resetPassword'```

request : post

body: ` {email:''}`

* onSuccess: `status(200), {message: "check your email to reset password"};`
* already signed in user || not confirmed account: `status(401), 
 {message:cause} //check general response`
     
* invalid email: ` status(400) {message: "check your email to reset password"};`

* confirmation mail failed to send: `status(500),
message: "something went wrong try again later"
`

### change Password (HTML in email)
```api/v1/auth/changePassword'```

request : post
* onSuccess:`status(200),{message: "password changed succesfully"}`
* token expired: `status(401), {message: "request expired, register again"}`
* alreadyChanged:`status(200),{message: "password has already been changed once"}`

