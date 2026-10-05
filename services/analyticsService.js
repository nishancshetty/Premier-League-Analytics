const { getPremierLeagueStandings } = require("./standingsService");

async function getLeagueAnalytics() {
  const standings = await getPremierLeagueStandings();

  if (!standings.length) {
    return null;
  }

  const totalTeams = standings.length;

  const totalGoals = standings.reduce(
    (sum, team) => sum + team.goalsFor,
    0
  );

  const totalWins = standings.reduce(
    (sum, team) => sum + team.won,
    0
  );

  const totalDraws = standings.reduce(
    (sum, team) => sum + team.draw,
    0
  );

  const averageGoals = (
    totalGoals / totalTeams
  ).toFixed(1);

  const averagePoints = (
    standings.reduce((sum, team) => sum + team.points, 0) /
    totalTeams
  ).toFixed(1);

  const bestAttack = [...standings].sort(
    (a, b) => b.goalsFor - a.goalsFor
  )[0];

  const bestDefense = [...standings].sort(
    (a, b) => a.goalsAgainst - b.goalsAgainst
  )[0];

  return {
    totalTeams,
    totalGoals,
    totalWins,
    totalDraws,
    averageGoals,
    averagePoints,
    bestAttack,
    bestDefense,
    standings,
  };
}

module.exports = {
  getLeagueAnalytics,
};