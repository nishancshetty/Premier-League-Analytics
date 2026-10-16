const { getTeamById, getAllTeams } = require("../services/teamService");
const { getPremierLeagueFixtures } = require("../services/fixturesService");

const getTeams = async (req, res) => {
  try {
    const teams = await getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch teams",
    });
  }
};

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

const getTeamMatches = async (req, res) => {
  try {
    const matches = await getPremierLeagueFixtures({ teamId: req.params.id });
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch team matches",
    });
  }
};

const getTeamSquad = async (req, res) => {
  try {
    const team = await getTeamById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team.squad || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch squad" });
  }
};

module.exports = {
  getTeams,
  getTeam,
  getTeamMatches,
  getTeamSquad,
};