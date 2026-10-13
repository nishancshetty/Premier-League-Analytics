const express = require("express");

const router = express.Router();

const {
  getComparison,
} = require("../controllers/comparisonController");

router.get("/", getComparison);

module.exports = router;