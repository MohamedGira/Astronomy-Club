import  jwt  from "jsonwebtoken";

export const generateToken= (object,expiresinSecs)=>{
    const tok= jwt.sign(
        object,
        process.env.JWT_KEY,
        { expiresIn: expiresinSecs}
        );
    return tok
}