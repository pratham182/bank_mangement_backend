const BankAccount = require("../models/BankAccount");

exports.createBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;

  if (!ifscCode || !branchName || !accountNumber || !accountHolderName) {
    return res.status(400).json({
      status: false,
      message: "all fields are required",
      error: null,
    });
  }

  try {
    const existingAccountNumber = await BankAccount.findOne({
      user: req.user.id,
      accountNumber,
    });
   
    if (existingAccountNumber) {
      return res.status(400).json({
        status: false,
        message: "Account already exists",
        error: "This account number is already associated with your user.",
      });
    }

    const account = new BankAccount({
      user: req.user.id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });

    await account.save();

    res.status(201).json({
      status: true,
      message: "Bank account created",
      error: null,
      data: {
        ifscCode,
        branchName,
        bankName,
        accountNumber,
        accountHolderName,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Internal server problem",
      error: err.message || "Internal server error",
    });
  }
};

exports.getAccountDetail = async (req, res) => {
  try {
    const accounts = await BankAccount.find({
      user: req.user.id,
    });

    if (accounts.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No account found for this user",
        error: "No accounts exist for the user.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Bank accounts fetched successfully",
      error: null,
      data: { accounts },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Error occurred while fetching accounts",
      error: err.message || "Internal Server Error",
    });
  }
};

exports.editAccount = async (req, res) => {
  const detail = req.body;
  const { accountId } = req.params;
  

  try {
    const updatedAccountDetails = await BankAccount.findOneAndUpdate(
      { _id: accountId, user: req.user.id },
      { $set: detail },
      { new: true }
    );

    if (!updatedAccountDetails) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
        error: "Account not found or does not belong to this user.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Account updated successfully",
      error: null,
      data: { account: updatedAccountDetails },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Error occurred while updating account",
      error: err.message || "Internal Server Error",
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const { accountId } = req.params;
  console.log(accountId);

  try {
    const deleteAccount = await BankAccount.findOneAndDelete({ _id: accountId, user: req.user.id });

    if (!deleteAccount) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
        error: "Account not found or does not belong to this user.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Account deleted successfully",
      error: null,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Error occurred while deleting account",
      error: err.message || "Internal Server Error",
    });
  }
};
