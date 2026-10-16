const {
  getPlayerById,
  getAllPlayers,
  getTopScorers,
} = require("../services/playerService");

const getPlayers = async (req, res) => {
  try {
    const players = await getAllPlayers(req.query);
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch players" });
  }
};

const getPlayer = async (req, res) => {
  try {
    const player = await getPlayerById(req.params.id);

    if (!player) {
      return res.status(404).json({
        message: "Player not found",
      });
    }

    res.json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch player",
    });
  }
};

const getScorers = async (req, res) => {
  try {
    const scorers = await getTopScorers();
    res.json(scorers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch top scorers",
    });
  }
};

module.exports = {
  getPlayers,
  getPlayer,
  getScorers,
};