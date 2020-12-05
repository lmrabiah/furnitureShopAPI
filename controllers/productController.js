const { Product, Store } = require("../db/models");

//normal func noit mw
exports.fetchProduct = async (productId, next) => {
  try {
    const foundProduct = await Product.findByPk(productId);
    return foundProduct;
  } catch (error) {
    next(error);
  }
};

exports.deletProduct = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.img = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.product.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Store,
          as: "stores",
          attributes: ["id"],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};
