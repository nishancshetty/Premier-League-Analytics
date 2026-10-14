const {
  getPremierLeagueFixtures,
} = require("../services/fixturesService");

async function getFixtures(req, res) {
  const fixtures = await getPremierLeagueFixtures();
  res.json(fixtures);
}

module.exports = {
  getFixtures,
};