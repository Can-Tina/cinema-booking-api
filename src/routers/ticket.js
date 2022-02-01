const express = require("express");
const {
    createTicket
} = require('../controllers/ticket.js');

const router = express.Router();

router.post("/book", createTicket);

module.exports = router;
