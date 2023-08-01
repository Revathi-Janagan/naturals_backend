const express = require("express");

const router = express.Router();
const orderController = require("../controller/orderController");


router.get("/getorder",orderController.getOrderList);
router.post("/addneworder",orderController.addNewOrder);
router.put("/editorder/:id" , orderController.editOrder);
router.delete("/deletefromorderlist/:id",orderController.deleteOrder);


module.exports = router;