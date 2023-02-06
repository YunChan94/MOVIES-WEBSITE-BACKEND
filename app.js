const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const moviesRoutes = require("./routes/movie");

const app = express();

app.use(bodyParser.json());

app.use("/api/movies", moviesRoutes);
app.listen(5000);
