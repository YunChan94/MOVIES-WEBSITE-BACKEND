const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const moviesRoutes = require("./routes/movie");
const app = express();

app.use(bodyParser.json());

app.use("/api/movies", moviesRoutes);

//User nhập sai endpoint
app.use("*", (req, res, next) => {
  res.status(404).send({ message: "Route not found" });
});
app.listen(5000);
