const express = require("express");
const {
    getAllMovies, createMovie, getOneMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.get("/?lessthan=:LTRuntime", getAllMovies)
router.get("/?greaterthan=:GTRuntime", getAllMovies)

router.post("/", createMovie)

router.get("/:movie", getOneMovie)

module.exports = router;