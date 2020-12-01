const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  creatStore,
  storeList,
  creatProduct,
} = require("../controllers/storeController.js");

router.get("/", storeList);

router.post("/", upload.single("img"), creatStore);

router.post("/:storeId/products", upload.single("img"), creatProduct);

module.exports = router;
