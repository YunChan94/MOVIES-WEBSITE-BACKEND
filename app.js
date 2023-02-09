const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const moviesRoutes = require("./routes/movie");
const authorizeController = require("./controllers/authorize");
const app = express();

app.use(bodyParser.json());

app.use(authorizeController.authorize);
app.use("/api/movies", authorizeController.authorize, moviesRoutes);
app.listen(5000);
