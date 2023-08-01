const express = require("express");
const router = express.Router();

const productRoutes = require("./productroutes");
const customerRoutes = require("./customerroutes");
const orderRoutes = require("./orderroutes");
const PosRoutes = require("./POSroutes");

router.use("/products", productRoutes);
router.use("/customer", customerRoutes);
router.use("/order", orderRoutes);
router.use("/pos",PosRoutes);

module.exports = router;
