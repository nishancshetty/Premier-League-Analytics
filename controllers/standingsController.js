const {
  getPremierLeagueStandings,
} = require("../services/standingsService");

const getStandings = async (req, res) => {
  try {
    const standings = await getPremierLeagueStandings();

    res.json(standings);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch standings",
    });
  }
};

module.exports = {
  getStandings,
};