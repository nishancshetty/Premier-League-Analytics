const express = require("express");
const router = express.Router();
const {
  getMatchPrediction,
  getForecast,
  askAI,
  getAIStatus,
} = require("../controllers/aiController");

router.get("/predict", getMatchPrediction);
router.get("/forecast", getForecast);
router.post("/ask", askAI);
router.get("/status", getAIStatus);

module.exports = router;

