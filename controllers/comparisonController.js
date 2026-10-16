const {
  compareTeams,
  comparePlayers,
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

const getPlayerComparison = async (req, res) => {
  try {
    const { player1 = 38101, player2 = 3754 } = req.query;
    const comparison = await comparePlayers(player1, player2);

    if (!comparison) {
      return res.status(404).json({
        message: "Players not found for comparison",
      });
    }

    res.json(comparison);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Player comparison failed",
    });
  }
};

module.exports = {
  getComparison,
  getPlayerComparison,
};