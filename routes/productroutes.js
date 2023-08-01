const express = require("express");

const router = express.Router();
const productController = require("../controller/productController");


router.get("/getproducts",productController.getProductList);
router.post("/addnewproducts",productController.addNewProducts);
router.put("/editproductlist/:id" , productController.editProducts);
router.delete("/deletefromproductlist/:id",productController.deleteProducts);


module.exports = router;