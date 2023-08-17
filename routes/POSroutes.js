const express = require("express");
const router = express.Router();
const POSController = require("../controller/POSController");



// Route to generate PDF and send email
router.post("/send-email", POSController.sendMailController);

module.exports = router;
