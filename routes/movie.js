const express = require("express");

const movieController = require("../controllers/movie");
const auth = require("../controllers/auth");
const router = express.Router();

//Endpoint: /api/movies/trending/:page
router.get("/trending/:page", auth.authorize, movieController.getTrending);
//Endpoint: /api/movies/trending
router.get("/trending", auth.authorize, movieController.getTrending);

//Endpoint: /api/movies/top-rate/:page
router.get("/top-rate/:page", auth.authorize, movieController.getTopRating);
//Endpoint: /api/movies/top-rate
router.get("/top-rate", auth.authorize, movieController.getTopRating);

//Endpoint: /api/movies/discover
router.get(
  "/discover/:genreName/:page",
  auth.authorize,
  movieController.getMovieByGenre
);

//Endpoint: /api/movies/discover
router.get(
  "/discover/:genreName",
  auth.authorize,
  movieController.getMovieByGenre
);
router.get("/discover", auth.authorize, movieController.getMovieByGenre);

//Endpoint:POST💥 /api/movies/video
router.post("/video", auth.authorize, movieController.getVideoByID);

//Endpoint:POST💥 /api/movies/search
router.post("/search/:page", auth.authorize, movieController.searchMovie);
router.post("/search", auth.authorize, movieController.searchMovie);

module.exports = router;
