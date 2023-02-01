const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const Movies = require("./models/Movies");
const app = express();

app.use("/", (req, res, next) => {
  res.send("<p>Test thu</p>");
});

app.listen(5000);
