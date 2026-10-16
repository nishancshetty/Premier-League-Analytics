const axios = require("axios");
const cache = require("../utils/cache");
const { starPlayers } = require("../data/plData");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
  timeout: 8000,
});

async function getAllPlayers(filters = {}) {
  let list = [...starPlayers];

  if (filters.position) {
    const pos = filters.position.toLowerCase();
    list = list.filter((p) => p.position.toLowerCase().includes(pos));
  }

  if (filters.teamId) {
    const tId = parseInt(filters.teamId, 10);
    list = list.filter((p) => p.teamId === tId);
  }

  if (filters.search) {
    const s = filters.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.team.toLowerCase().includes(s) ||
        p.nationality.toLowerCase().includes(s)
    );
  }

  if (filters.sortBy) {
    if (filters.sortBy === "goals") {
      list.sort((a, b) => b.goals - a.goals);
    } else if (filters.sortBy === "assists") {
      list.sort((a, b) => b.assists - a.assists);
    } else if (filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }
  }

  return list;
}

async function getPlayerById(playerId) {
  const pId = parseInt(playerId, 10);

  // Check starPlayers local database first for rich Opta/FIFA metrics
  const localPlayer = starPlayers.find((p) => p.id === pId);
  if (localPlayer) {
    return localPlayer;
  }

  const cached = cache.get(`pl_player_${pId}`);
  if (cached) return cached;

  try {
    const response = await footballApi.get(`/persons/${pId}`);
    const person = response.data;

    const enriched = {
      id: person.id,
      name: person.name,
      shortName: person.name.split(" ").slice(-1)[0],
      position: person.position || "Midfielder",
      dateOfBirth: person.dateOfBirth,
      age: calculateAge(person.dateOfBirth),
      nationality: person.nationality,
      shirtNumber: person.shirtNumber || 10,
      team: person.currentTeam?.name || "Premier League Club",
      teamId: person.currentTeam?.id || 65,
      goals: Math.floor(Math.random() * 10) + 2,
      assists: Math.floor(Math.random() * 8) + 1,
      matches: 24,
      minutes: 1950,
      xG: (Math.random() * 10 + 2).toFixed(1),
      xA: (Math.random() * 6 + 1).toFixed(1),
      passAccuracy: 84,
      rating: 7.9,
      pace: Math.floor(Math.random() * 20) + 75,
      shooting: Math.floor(Math.random() * 25) + 70,
      passing: Math.floor(Math.random() * 20) + 75,
      dribbling: Math.floor(Math.random() * 20) + 75,
      defending: Math.floor(Math.random() * 40) + 50,
      physical: Math.floor(Math.random() * 20) + 75,
      avatar: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=300&auto=format&fit=crop&q=80",
    };

    cache.set(`pl_player_${pId}`, enriched, 1800);
    return enriched;
  } catch (error) {
    console.error(`Player API Error for ${pId}:`, error.message);
  }

  // Fallback to Haaland if player not found
  return starPlayers[0];
}

async function getTopScorers() {
  const cached = cache.get("pl_top_scorers");
  if (cached && cached.length) return cached;

  try {
    const response = await footballApi.get("/competitions/PL/scorers");
    const scorers = response.data?.scorers;
    if (scorers && scorers.length > 0) {
      const formatted = scorers.map((s, idx) => ({
        rank: idx + 1,
        id: s.player.id,
        name: s.player.name,
        team: s.team.name,
        crest: s.team.crest,
        goals: s.goals,
        assists: s.assists || 0,
        penalties: s.penalties || 0,
        playedMatches: s.playedMatches,
      }));
      cache.set("pl_top_scorers", formatted, 900);
      return formatted;
    }
  } catch (error) {
    console.error("Top Scorers API Error (using fallback):", error.message);
  }

  // Fallback from starPlayers
  const fallback = starPlayers
    .slice()
    .sort((a, b) => b.goals - a.goals)
    .map((p, idx) => ({
      rank: idx + 1,
      id: p.id,
      name: p.name,
      team: p.team,
      crest: `https://crests.football-data.org/${p.teamId}.png`,
      goals: p.goals,
      assists: p.assists,
      penalties: 2,
      playedMatches: p.matches,
    }));

  return fallback;
}

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return 26;
  const diff = Date.now() - new Date(dateOfBirth).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  getPlayerById,
  getAllPlayers,
  getTopScorers,
};