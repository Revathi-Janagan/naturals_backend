const express = require("express");

const router = express.Router();
const POSController = require("../controller/POSController");


router.get("/getPOS",POSController.getPOS);
router.post("/addnewPOS",POSController.addNewPOS);
router.put("/editPOS/:id" , POSController.editPOS);
router.delete("/deletefromPOSlist/:id",POSController.deletePOS);


module.exports = router;