const express = require("express");
const {
    getAllMovies, createMovie
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.get("/?lessthan=:LTRuntime", getAllMovies)
router.get("/?greaterthan=:GTRuntime", getAllMovies)

router.post("/", createMovie)

module.exports = router;
