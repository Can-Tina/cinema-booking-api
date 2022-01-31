const express = require("express");
const {
    getAllMovies
} = require('../controllers/movie');

const router = express.Router();

router.get("/", getAllMovies);
router.get("/?lessthan=:LTRuntime", getAllMovies)
router.get("/?greaterthan=:GTRuntime", getAllMovies)

module.exports = router;
