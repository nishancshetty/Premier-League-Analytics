const {
  compareTeams,
} = require("../services/comparisonService");

const getComparison = async (req, res) => {
  try {
    const { team1, team2 } = req.query;

    const comparison = await compareTeams(team1, team2);

    if (!comparison) {
      return res.status(404).json({
        message: "Teams not found",
      });
    }

    res.json(comparison);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Comparison failed",
    });
  }
};

module.exports = {
  getComparison,
};