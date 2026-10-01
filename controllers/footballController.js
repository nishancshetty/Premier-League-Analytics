const { getPremierLeagueMatches } = require("../services/footballApi");

async function getMatches(req, res) {
  try {
    const matches = await getPremierLeagueMatches();

    res.status(200).json(matches);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch Premier League matches",
    });
  }
}

module.exports = {
  getMatches,
};