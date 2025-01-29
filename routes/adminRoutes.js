const express=require("express");
const { getAllUserBankAccounts, admin } = require("../controller/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");




const router = express.Router();


router.get("/getAllAccounts",getAllUserBankAccounts);

router.get("/admin",admin);

module.exports=router;
