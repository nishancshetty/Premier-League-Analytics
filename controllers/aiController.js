const { predictMatch, getSeasonForecast } = require("../services/aiService");

const getMatchPrediction = async (req, res) => {
  try {
    const { homeTeam = 65, awayTeam = 57 } = req.query;
    const prediction = await predictMatch(homeTeam, awayTeam);

    res.json({
      success: true,
      data: prediction,
    });
  } catch (error) {
    console.error("AI Prediction Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI match prediction",
    });
  }
};

const getForecast = async (req, res) => {
  try {
    const forecast = await getSeasonForecast();
    res.json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    console.error("AI Forecast Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate AI season forecast",
    });
  }
};

module.exports = {
  getMatchPrediction,
  getForecast,
};
