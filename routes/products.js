const express = require("express");
const router = express.Router();
const {
  deletProduct,
  creatProduct,
  productList,
  updateProduct,
} = require("../controllers/productController");

router.delete("/:productId", deletProduct);

router.get("/", productList);

router.post("/", creatProduct);

router.put("/:productId", updateProduct);

module.exports = router;
