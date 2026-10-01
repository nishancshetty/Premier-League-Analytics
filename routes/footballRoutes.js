const express = require("express");

const router = express.Router();

const {
  getMatches,
} = require("../controllers/footballController");

router.get("/matches", getMatches);

module.exports = router;