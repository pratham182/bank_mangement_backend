const User = require("../models/User");
const { verifyToken } = require("../utils/jwtUtil");

const authMiddleware = async (req, res, next) => {
  let token = req.cookies['jwt'];  
  console.log(token); 

  if (token) {
    try {
      const decoded = verifyToken(token);

     
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized, token failed." });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};




module.exports=authMiddleware;