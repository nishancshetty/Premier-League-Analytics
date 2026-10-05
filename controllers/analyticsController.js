const {
  getLeagueAnalytics,
} = require("../services/analyticsService");

const getAnalytics = async (req, res) => {
  try {
    const analytics = await getLeagueAnalytics();

    if (!analytics) {
      return res.status(500).json({
        message: "Analytics unavailable",
      });
    }

    res.json(analytics);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load analytics",
    });
  }
};

module.exports = {
  getAnalytics,
};