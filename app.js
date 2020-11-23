const express = require("express");
let products = require("./products");
const cors = require("cors");
const slugify = require("slugify");
const bodyParser = require("body-parser");

const app = express();
//middlewere
app.use(cors());
app.use(bodyParser.json());

////Route
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello Wkkrld" });
});

app.delete("/products/:productId", (req, res) => {
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
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body }; // id, slug are equivalent to id: id, slug: slug
  products.push(newProduct);
  res.json(newProduct);
});

app.listen(8000, () => {
  console.log("HIIIiiI");
});
