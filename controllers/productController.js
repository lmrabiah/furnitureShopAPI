let products = require("../products");
const slugify = require("slugify");

exports.deletProduct = (req, res) => {
  // const {productId} = req.params;
  //the same to line 18
  const productId = req.params.productId;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== +productId);
    res.status(204).end();
    // equal to
    //res.status(204);
    //res.end()   bcz startuse will not end it and  res.end will
  } else {
    res.status(404).json({ massage: "product not found" });
  }
};
exports.creatProduct = (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  products.push(newProduct);
  res.json(newProduct);
};
exports.productList = (req, res) => {
  res.json(products);
};

exports.updateProduct = (req, res) => {
  const productId = req.params.productId;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    for (const key in req.body) foundProduct[key] = req.body[key];
    foundProduct.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ massage: "product not found" });
  }
};
