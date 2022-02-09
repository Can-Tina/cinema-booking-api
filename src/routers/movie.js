const express = require("express");
const {
    getAllMovies, 
    createMovie, 
    getOneMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", createMovie)

router.get("/:movie", getOneMovie)

module.exports = router;