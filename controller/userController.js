const bcrypt = require("bcrypt");
const User = require("../models/User");
const { createToken, verfiyToken, verifyToken } = require("../utils/jwtUtil");
// const { validateLoginUser, validateRegisterUser } = require("../utils/validateUtil");






exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;
console.log(email)
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     status: false,
  //     message: "Validation error",
  //     error: errors.array(),
  //   });
  // }
  if(!email || !password || !username ){
    return res.status(400).json({
        status: false,
        message: "All fields are required",
        error: "null",
      });

   }


  try {
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
        error: null,
      });
    }

    const newUser = new User({ username, password, email });

    createToken(res, newUser._id);
    await newUser.save();

    

    res.status(201).json({
      status: true,
      message: "User created successfully",
      error: null,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message || "Error occurred while creating user",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
      error: "Email and password are required",
    });
  }

  try {
    let user;

    if (role === 'admin') {
      user = await User.findOne({ email, role: 'admin' });
      if (!user) {
        return res.status(403).json({
          status: false,
          message: "User Not Found",
          error: null,
        });
      }
    } else if (role === 'user') {
      user = await User.findOne({ email, role: 'user' });
      if (!user) {
        return res.status(403).json({
          status: false,
          message: "User not found",
          error: null,
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid role specified",
        error: "Role must be 'admin' or 'user'",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
        error: null,
      });
    }

   
    const token = createToken(res, user._id); 



    res.status(200).json({
      status: true,
      message: "Login successful",
      error: null,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err.message || "Error occurred during login",
    });
  }
};




exports.dashboard = async (req, res) => {
  const token = req.cookies['jwt'];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }


    if (user && user.role === 'user') {
      return res.status(200).json({
        success: true,
        message: 'Authenticated',
        user: { id: user._id, username: user.name, role: user.role },
      });    }

      return res.status(403).json({ success: false, message: 'Permission denied' });




    

  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};



exports.logout = (req, res) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true, 
      sameSite: 'None', 
      path: '/',  
    });

    res.status(200).json({
      status: true,
      error: null,
      message: 'Logged out successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: err.message || 'Error occurred during logout',
    });
  }
};
