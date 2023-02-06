const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

//Endpoint: /api/movies/trending/:page
router.get("/trending/:page", movieController.getTrending);

//Endpoint: /api/movies/trending
router.get("/trending", movieController.getTrending);

//Endpoint: /api/movies/top-rate
// router.get("/top-rate");

//Endpoint: /api/movies/discover
// router.get("/discover");

//Endpoint: /api/movies/video
// router.get("/video");

//Endpoint: /api/movies/search
// router.get("/search");

module.exports = router;
