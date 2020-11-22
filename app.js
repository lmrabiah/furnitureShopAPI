const express = require("express");
const products = require("./products");
const cors = require("cors");

const app = express();
//middlewere
app.use(cors());

////Route
app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello Wkkrld" });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8000, () => {
  console.log("lukkkkk");
});
