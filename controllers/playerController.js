const { getPlayerById } = require("../services/playerService");

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

module.exports = {
  getPlayer,
};