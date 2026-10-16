const { getPremierLeagueStandings } = require("./standingsService");
const { teamEnrichment } = require("../data/plData");

async function getLeagueAnalytics() {
  const standings = await getPremierLeagueStandings();

  if (!standings || !standings.length) {
    return null;
  }

  const totalTeams = standings.length;
  const totalGoals = standings.reduce((sum, team) => sum + team.goalsFor, 0);
  const totalWins = standings.reduce((sum, team) => sum + team.won, 0);
  const totalDraws = standings.reduce((sum, team) => sum + team.draw, 0);
  const totalMatches = standings.reduce((sum, team) => sum + team.playedGames, 0) / 2 || 70;

  const averageGoals = (totalGoals / totalMatches).toFixed(2);
  const averagePoints = (
    standings.reduce((sum, team) => sum + team.points, 0) / totalTeams
  ).toFixed(1);

  const bestAttack = [...standings].sort((a, b) => b.goalsFor - a.goalsFor)[0];
  const bestDefense = [...standings].sort((a, b) => a.goalsAgainst - b.goalsAgainst)[0];

  // Enrich standings with form and xG
  const enrichedStandings = standings.map((item) => {
    const extra = teamEnrichment[item.team.id] || {};
    return {
      ...item,
      xG: extra.xG || (item.goalsFor * 0.95).toFixed(1),
      xGA: extra.xGA || (item.goalsAgainst * 0.98).toFixed(1),
      possession: extra.possessionAvg || 50.0,
      passAccuracy: extra.passAccuracyAvg || 82.0,
      cleanSheets: extra.cleanSheets || Math.floor(item.playedGames * 0.3),
    };
  });

  return {
    totalTeams,
    totalGoals,
    totalWins,
    totalDraws,
    totalMatches,
    averageGoals,
    averagePoints,
    bestAttack: {
      name: bestAttack.team.name,
      crest: bestAttack.team.crest,
      goalsFor: bestAttack.goalsFor,
    },
    bestDefense: {
      name: bestDefense.team.name,
      crest: bestDefense.team.crest,
      goalsAgainst: bestDefense.goalsAgainst,
    },
    standings: enrichedStandings,
  };
}

module.exports = {
  getLeagueAnalytics,
};