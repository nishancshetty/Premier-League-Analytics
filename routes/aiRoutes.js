const express = require("express");
const router = express.Router();
const { getMatchPrediction, getForecast } = require("../controllers/aiController");

router.get("/predict", getMatchPrediction);
router.get("/forecast", getForecast);

module.exports = router;
