const { Store, Product } = require("../db/models");

//Normal func not middleware

exports.fetchStore = async (StoreId, next) => {
  try {
    const foundStore = await Store.findByPk(StoreId);
    return foundStore;
  } catch (error) {
    next(error);
  }
};
exports.creatStore = async (req, res, next) => {
  try {
    const foundStore = await Store.findOne({
      where: { userId: req.user.id },
    });
    if (foundStore) {
      const err = new Error("You already have a store");
      err.status = 400;
      next(err);
    } else {
      if (req.file) {
        req.body.img = `http://${req.get("host")}/media/${req.file.filename}`;
      }

      req.body.userId = req.user.id;
      const newStore = await Store.create(req.body);
      res.status(201).json(newStore);
    }
  } catch (error) {
    next(error);
  }
};

exports.storeList = async (req, res, next) => {
  try {
    const stores = await Store.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });
    res.json(stores);
  } catch (error) {
    next(error);
  }
};

exports.creatProduct = async (req, res, next) => {
  console.log(req.user);
  try {
    if (req.file) {
      req.body.img = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    //req.body.storeId this is the relation cell
    req.body.StoreId = req.store.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
