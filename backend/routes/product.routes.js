const express = require("express");
const { createProduct, getProductsByCategory } = require("../controllers/product.controller");

const router = express.Router();

router.post("/", createProduct);

// Define routes for each category explicitly
router.get("/necklace", (req, res) => getProductsByCategory({ ...req, params: { category: "necklace" } }, res));
router.get("/bangles", (req, res) => getProductsByCategory({ ...req, params: { category: "bangles" } }, res));
router.get("/earrings", (req, res) => getProductsByCategory({ ...req, params: { category: "earrings" } }, res));
router.get("/rings", (req, res) => getProductsByCategory({ ...req, params: { category: "rings" } }, res));

module.exports = router;
