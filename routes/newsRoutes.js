const express = require("express");
const router = express.Router();
const { getInjuries, getTransfers } = require("../controllers/newsController");

router.get("/injuries", getInjuries);
router.get("/transfers", getTransfers);

module.exports = router;
