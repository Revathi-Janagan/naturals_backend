const express = require("express");
const connection = require("../helper/db");

const router = express.Router();
const authController = require("../controller/authController")

router.post ("/register_user", authController.registerUser)
router.post("/loginuser", authController.loginUser);

 module.exports =router;