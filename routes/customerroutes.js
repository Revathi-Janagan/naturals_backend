const express = require("express");

const router = express.Router();
const customerController = require("../controller/customerController");


router.get("/getcustomer",customerController.getCustomerList);
router.post("/addnewcustomer",customerController.addNewCustomer);
router.put("/editcustomer/:id" , customerController.editCustomer);
router.delete("/deletefromcustomerlist/:id",customerController.deleteCustomer);


module.exports = router;