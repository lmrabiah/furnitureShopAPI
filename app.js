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

// if i put wrong url ex: localhost:8000/productss
app.use((req, res, next) => {
  console.log("Path dosn't exist");
  res.status(404).json({ massage: "Path not found" });
});

//all errors (error handle middle ware)
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.status ?? 500);
//   res.jason({ massage: err.massage ?? "internal server error" });
// });

////Route
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
