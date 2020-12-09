const express = require("express");
const db = require("./db/models");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
//shortcut p1
const productRoutes = require("./routes/products");
const storeRoutes = require("./routes/stores");
const userRoutes = require("./routes/users");
const app = express();

//middlewere
console.log("__dirname ", __dirname);
app.use(cors());
app.use(bodyParser.json());
//to use the table
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/stores", storeRoutes);
app.use("/products", productRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// if i put wrong url ex: localhost:8000/productss
app.use((req, res, next) => {
  console.log("Path dosn't exist");
  res.status(404).json({ message: "Path not found" });
});

//all errors (error handle middle ware)
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "internal server error" });
});

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
