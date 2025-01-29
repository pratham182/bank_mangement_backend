const { default: mongoose } = require("mongoose");

// IFSC code, branch name, bank name, account number, and account holder's name.


const bankAccountSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
    accountHolderName: { type: String, required: true }
  });
  
  const BankAccount = mongoose.model('BankAccount', bankAccountSchema);


  module.exports=BankAccount;
  