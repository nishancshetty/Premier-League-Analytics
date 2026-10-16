const { getPremierLeagueStandings } = require("./standingsService");
const { getPlayerById } = require("./playerService");
const { teamEnrichment } = require("../data/plData");

async function compareTeams(team1Id, team2Id) {
  const standings = await getPremierLeagueStandings();

  const team1 = standings.find(
    (item) => String(item.team.id) === String(team1Id)
  );

  const team2 = standings.find(
    (item) => String(item.team.id) === String(team2Id)
  );

  if (!team1 || !team2) {
    return null;
  }

  const extra1 = teamEnrichment[team1.team.id] || {
    possessionAvg: 55,
    passAccuracyAvg: 85,
    cleanSheets: 8,
    xG: 45,
    xGA: 30,
    manager: "Head Coach",
    stadium: "Stadium",
  };

  const extra2 = teamEnrichment[team2.team.id] || {
    possessionAvg: 53,
    passAccuracyAvg: 83,
    cleanSheets: 7,
    xG: 42,
    xGA: 32,
    manager: "Head Coach",
    stadium: "Stadium",
  };

  return {
    team1: {
      id: team1.team.id,
      name: team1.team.name,
      shortName: team1.team.shortName,
      crest: team1.team.crest,
      position: team1.position,
      points: team1.points,
      won: team1.won,
      draw: team1.draw,
      lost: team1.lost,
      goalsFor: team1.goalsFor,
      goalsAgainst: team1.goalsAgainst,
      goalDifference: team1.goalDifference,
      possession: extra1.possessionAvg,
      passAccuracy: extra1.passAccuracyAvg,
      cleanSheets: extra1.cleanSheets,
      xG: extra1.xG,
      xGA: extra1.xGA,
      manager: extra1.manager,
      stadium: extra1.stadium,
    },
    team2: {
      id: team2.team.id,
      name: team2.team.name,
      shortName: team2.team.shortName,
      crest: team2.team.crest,
      position: team2.position,
      points: team2.points,
      won: team2.won,
      draw: team2.draw,
      lost: team2.lost,
      goalsFor: team2.goalsFor,
      goalsAgainst: team2.goalsAgainst,
      goalDifference: team2.goalDifference,
      possession: extra2.possessionAvg,
      passAccuracy: extra2.passAccuracyAvg,
      cleanSheets: extra2.cleanSheets,
      xG: extra2.xG,
      xGA: extra2.xGA,
      manager: extra2.manager,
      stadium: extra2.stadium,
    },
  };
}

async function comparePlayers(player1Id, player2Id) {
  const p1 = await getPlayerById(player1Id);
  const p2 = await getPlayerById(player2Id);

  if (!p1 || !p2) return null;

  return {
    player1: p1,
    player2: p2,
    radarMetrics: [
      { stat: "Pace", p1: p1.pace || 75, p2: p2.pace || 75 },
      { stat: "Shooting", p1: p1.shooting || 75, p2: p2.shooting || 75 },
      { stat: "Passing", p1: p1.passing || 75, p2: p2.passing || 75 },
      { stat: "Dribbling", p1: p1.dribbling || 75, p2: p2.dribbling || 75 },
      { stat: "Defense", p1: p1.defending || 50, p2: p2.defending || 50 },
      { stat: "Physical", p1: p1.physical || 75, p2: p2.physical || 75 },
    ],
  };
}

module.exports = {
  compareTeams,
  comparePlayers,
};