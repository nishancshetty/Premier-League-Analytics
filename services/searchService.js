const { getAllTeams } = require("./teamService");
const { getAllPlayers } = require("./playerService");

async function searchAll(query) {
  if (!query || query.trim() === "") {
    return { teams: [], players: [] };
  }

  const q = query.toLowerCase().trim();

  const [teams, players] = await Promise.all([
    getAllTeams(),
    getAllPlayers(),
  ]);

  const matchedTeams = teams.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      (t.shortName && t.shortName.toLowerCase().includes(q))
  );

  const matchedPlayers = players.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.team.toLowerCase().includes(q) ||
      p.nationality.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q)
  );

  return {
    teams: matchedTeams.slice(0, 6),
    players: matchedPlayers.slice(0, 8),
  };
}

module.exports = {
  searchAll,
};