const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

//Endpoint: /api/movies/trending/:page
router.get("/trending/:page", movieController.getTrending);

//Endpoint: /api/movies/trending
router.get("/trending", movieController.getTrending);

//Endpoint: /api/movies/top-rate/:page
router.get("/top-rate/:page", movieController.getTopRating);

//Endpoint: /api/movies/top-rate
router.get("/top-rate", movieController.getTopRating);

//Endpoint: /api/movies/discover
router.get("/discover/:genreName/:page", movieController.getMovieByGenre);

//Endpoint: /api/movies/discover
router.get("/discover/:genreName", movieController.getMovieByGenre);
router.get("/discover", movieController.getMovieByGenre);

//Endpoint:POST💥 /api/movies/video
router.post("/video", movieController.getVideoByID);

//Endpoint:POST💥 /api/movies/search
router.post("/search/:page", movieController.searchMovie);
router.post("/search", movieController.searchMovie);

module.exports = router;
