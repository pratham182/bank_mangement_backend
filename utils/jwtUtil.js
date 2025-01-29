

const jwt=require("jsonwebtoken")
require("dotenv").config();

exports.createToken=((res,userId)=>{


  
    const payload = { userId: userId };


     const token =jwt.sign(payload, process.env.JWT_SECRET, {  });
     res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        path: '/',
      });

      return token;
});


exports.verifyToken=(token)=>{
  
  return jwt.verify(token, process.env.JWT_SECRET);
}