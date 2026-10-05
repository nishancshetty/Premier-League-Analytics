const { getTeamById } = require("../services/teamService");

const getTeam = async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    res.json(team);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch team",
    });
  }
};

module.exports = {
  getTeam,
};