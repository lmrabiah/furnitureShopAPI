const express = require("express");
const router = express.Router();
const {
  deletProduct,
  creatProduct,
  productList,
  updateProduct,
  // fetchProduct,
} = require("../controllers/productController");

// router.param("productId",(req, res, next, productId)) =>{

// }

router.delete("/:productId", deletProduct);

router.get("/", productList);

router.post("/", creatProduct);

router.put("/:productId", updateProduct);

module.exports = router;
