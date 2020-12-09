const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  creatStore,
  storeList,
  creatProduct,
} = require("../controllers/storeController.js");
const passport = require("passport");

router.get("/", storeList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  upload.single("img"),
  creatStore
);

router.post(
  "/:storeId/products",
  //i can add product if i don't have token
  passport.authenticate("jwt", { session: false }),
  //
  upload.single("img"),
  creatProduct
);

module.exports = router;
