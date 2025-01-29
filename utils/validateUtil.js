
// const { body } = require('express-validator');

// exports.validateBankInfo = () => [
 
//   body('ifscCode')
//     .notEmpty().withMessage('ifc code is required')
//     .isLength({ min: 11, max: 11 }).withMessage('ifc code must be off 11 characters')
//     .isAlphanumeric().withMessage('ifsc code must be alphanumeric'),

  
//   body('branchName')
//     .notEmpty().withMessage('branch name is required')
//     .isString().withMessage('branch name must be off string'),

  
//   body('bankName')
//     .notEmpty().withMessage('bank name is required')
//     .isString().withMessage('bank name must be string'),

 
//   body('accountNumber')
//     .notEmpty().withMessage('account no is required')
//     .isLength({ min: 9, max: 18 }).withMessage('account Number must be between 9 and 18 digits')
//     .isNumeric().withMessage('account number must be numeric'),

//   body('accountHolderName')
//     .notEmpty().withMessage('account holder name is required')
//     .isString().withMessage('account holder name must be a string')
// ];



// const validatePassword = body('password')
//   .notEmpty().withMessage('Password is required')
//   .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long');

// const validateEmail = body('email')
//   .notEmpty().withMessage('Email is required')
//   .isEmail().withMessage('Please provide a valid email address')
//   .trim();  

// // exports.validateRegisterUser = () => [
// //   body('username')
// //     .notEmpty().withMessage('Username is required')
// //     .isString().withMessage('Username must be a string')
// //     .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
// //   validatePassword,
// //   validateEmail
// // ];

// exports.validateLoginUser = [
//   validateEmail,
//   validatePassword
// ];








