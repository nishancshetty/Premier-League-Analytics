const {
  getPremierLeagueFixtures,
} = require("../services/fixturesService");

async function getFixtures(req, res) {
  try {
    const fixtures = await getPremierLeagueFixtures(req.query);
    res.json(fixtures);
  } catch (error) {
    console.error("Fixtures Controller Error:", error);
    res.status(500).json({ message: "Failed to load fixtures" });
  }
}

module.exports = {
  getFixtures,
};