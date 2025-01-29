const express=require("express");
const { loginUser, registerUser, dashboard, logout } = require("../controller/userController");


const router = express.Router();


router.post("/register",registerUser);
router.post("/login",loginUser);


router.get("/",dashboard);
router.post("/logout",logout)

module.exports=router;
