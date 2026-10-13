const { getPremierLeagueStandings } = require("./standingsService");

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

  return {
    team1: {
      id: team1.team.id,
      name: team1.team.name,
      crest: team1.team.crest,
      points: team1.points,
      won: team1.won,
      draw: team1.draw,
      lost: team1.lost,
      goalsFor: team1.goalsFor,
      goalsAgainst: team1.goalsAgainst,
      goalDifference: team1.goalDifference,
    },

    team2: {
      id: team2.team.id,
      name: team2.team.name,
      crest: team2.team.crest,
      points: team2.points,
      won: team2.won,
      draw: team2.draw,
      lost: team2.lost,
      goalsFor: team2.goalsFor,
      goalsAgainst: team2.goalsAgainst,
      goalDifference: team2.goalDifference,
    },
  };
}

module.exports = {
  compareTeams,
};