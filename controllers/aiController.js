const {
  predictMatch,
  getSeasonForecast,
  askAIAssistant,
  getOpenAIStatus,
} = require("../services/aiService");

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

const askAI = async (req, res) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    const response = await askAIAssistant(prompt, context);
    res.json(response);
  } catch (error) {
    console.error("AI Assistant Error:", error);
    res.status(500).json({
      success: false,
      message: "AI assistant service encountered an error",
    });
  }
};

const getAIStatus = async (req, res) => {
  try {
    const status = await getOpenAIStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getMatchPrediction,
  getForecast,
  askAI,
  getAIStatus,
};

