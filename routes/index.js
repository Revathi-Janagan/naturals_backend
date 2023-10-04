const express = require("express");
const router = express.Router();

const productRoutes = require("./productroutes");
const customerRoutes = require("./customerroutes");
const orderRoutes = require("./orderroutes");
const PosRoutes = require("./POSroutes");
const authRoutes = require("./authroutes")

router.use("/products", productRoutes);
router.use("/customer", customerRoutes);
router.use("/order", orderRoutes);
router.use("/pos",PosRoutes);
router.use("/auth", authRoutes);

module.exports = router;
