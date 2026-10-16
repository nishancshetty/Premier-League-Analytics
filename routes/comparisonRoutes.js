const express = require("express");
const router = express.Router();
const {
  getComparison,
  getPlayerComparison,
} = require("../controllers/comparisonController");

router.get("/players", getPlayerComparison);
router.get("/", getComparison);

module.exports = router;