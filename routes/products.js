const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  deletProduct,
  creatProduct,
  productList,
  updateProduct,
  fetchProduct,
} = require("../controllers/productController");

router.param("productId", async (req, res, next, productId) => {
  const product = await fetchProduct(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
  }
});

router.delete("/:productId", deletProduct);

router.get("/", productList);

router.post("/", upload.single("img"), creatProduct);

router.put("/:productId", upload.single("img"), updateProduct);

module.exports = router;
