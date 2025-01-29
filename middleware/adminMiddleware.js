const adminMiddleware = async (req, res, next) => {
console.log("hello")

    const token = req.cookies['jwt'];  
  
    
  
    if (token) {
      try {
      
        const decoded = verifyToken(token);
  
        req.user = await User.findById(decoded.userId).select("-password");
  
        if (!req.user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: "Access denied, admin role required" });
        }
  
        next();
      } catch (error) {
        console.error( error);
        res.status(401).json({ message: "Not authorized, token failed." });
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  };
module.exports= adminMiddleware;