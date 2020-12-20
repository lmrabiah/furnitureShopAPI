const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const {
  creatStore,
  storeList,
  creatProduct,
} = require("../controllers/storeController.js");
const passport = require("passport");

router.param("storeId", async (req, res, next, storeId) => {
  const store = await fetchStore(storeId, next);
  if (store) {
    req.store = store;
    next();
  } else {
    const err = {
      status: 404,
      message: "store not found",
    };
    next(err);
  }
});
router.get("/", storeList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),

  upload.single("img"),
  creatStore
);

router.post(
  "/:storeId/products",
  //i can add store if i don't have token
  passport.authenticate("jwt", { session: false }),
  //
  upload.single("img"),
  creatProduct
);

module.exports = router;
