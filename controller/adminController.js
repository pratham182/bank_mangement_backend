const User = require('../models/User');
const BankAccount = require('../models/BankAccount');
const { verifyToken } = require('../utils/jwtUtil');


exports.getAllUserBankAccounts = async (req, res) => {

  console.log("hey");
  try {
    const bankAccounts = await BankAccount.find().populate('user');
    console.log(bankAccounts)

    if (!bankAccounts || bankAccounts.length === 0) {
      return res.status(404).json({ message: 'No bank accounts found' });
    }

    res.status(200).json({
      success: true,
      data: bankAccounts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.admin = async (req, res) => {
    const token = req.cookies['jwt']; 
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
  
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      if (user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Permission denied: Admins only' });
      }
  
      return res.status(200).json({ success: true, isAdmin: true });
  
    } catch (error) {
      console.error('Error verifying admin:', error);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  };
