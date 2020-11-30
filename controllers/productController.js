const { Product } = require("../db/models");

/////

//fetch

exports.deletProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ massage: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

exports.updateProduct = async (req, res) => {
  // const productId = req.params.productId;
  const { productId } = req.params;
  try {
    const foundProduct = await Product.findByPk(productId);
    if (foundProduct) {
      await foundProduct.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ massage: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

exports.creatProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};

exports.productList = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
};
