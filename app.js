const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const bodyParser = require("body-parser");
//shortcut p1
const productRoutes = require("./routes/products");
const app = express();
//middlewere

app.use(cors());
app.use(bodyParser.json());
//shortcut p2
app.use("/products", productRoutes);

////Route
const run = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
