const express=require("express");
const { createBankAccount, getAccountDetail, editAccount, deleteAccount } = require("../controller/bankController");
const authMiddleware = require("../middleware/ authMiddleware");




const router=express.Router();

router.post("/createAccount",authMiddleware,createBankAccount);

router.get("/getAccountsDetail",authMiddleware,getAccountDetail);
router.put("/editAccount/:accountId",authMiddleware,editAccount);
router.delete("/deleteAccount/:accountId",authMiddleware,deleteAccount);

module.exports = router;
