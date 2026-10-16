const axios = require("axios");
const cache = require("../utils/cache");
const { getPremierLeagueStandings } = require("./standingsService");
const { teamEnrichment, starPlayers } = require("../data/plData");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
  timeout: 8000,
});

async function getAllTeams() {
  const standings = await getPremierLeagueStandings();
  return standings.map((item) => {
    const extra = teamEnrichment[item.team.id] || {};
    return {
      id: item.team.id,
      name: item.team.name,
      shortName: item.team.shortName,
      crest: item.team.crest,
      position: item.position,
      points: item.points,
      won: item.won,
      draw: item.draw,
      lost: item.lost,
      goalsFor: item.goalsFor,
      goalsAgainst: item.goalsAgainst,
      goalDifference: item.goalDifference,
      ...extra,
    };
  });
}

async function getTeamById(teamId) {
  const tId = parseInt(teamId, 10);
  const cacheKey = `pl_team_${tId}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  let apiTeam = null;
  try {
    const response = await footballApi.get(`/teams/${tId}`);
    apiTeam = response.data;
  } catch (error) {
    console.error(
      `Team API Error for team ${tId} (serving enriched fallback):`,
      error.response?.status,
      error.response?.data?.message || error.message
    );
  }

  // Find standings record
  const standings = await getPremierLeagueStandings();
  const standingsRow = standings.find((s) => s.team.id === tId) || null;
  const extra = teamEnrichment[tId] || {
    manager: "Head Coach",
    stadium: apiTeam?.venue || "Premier League Stadium",
    capacity: 45000,
    founded: 1900,
    colors: ["#38003C", "#00FF85"],
    formation: "4-3-3",
    possessionAvg: 52.0,
    passAccuracyAvg: 83.0,
    cleanSheets: 6,
    xG: 35.0,
    xGA: 32.0,
  };

  // Team players: from API squad or filtered starPlayers
  let squad = apiTeam?.squad || [];
  if (squad.length === 0) {
    squad = starPlayers.filter((p) => p.teamId === tId);
  }

  const teamData = {
    id: tId,
    name: apiTeam?.name || standingsRow?.team.name || `Team ${tId}`,
    shortName: apiTeam?.shortName || standingsRow?.team.shortName || "Club",
    crest: apiTeam?.crest || standingsRow?.team.crest || "",
    venue: apiTeam?.venue || extra.stadium,
    founded: apiTeam?.founded || extra.founded,
    clubColors: apiTeam?.clubColors || extra.colors?.join(" / "),
    website: apiTeam?.website || "https://premierleague.com",
    manager: extra.manager,
    capacity: extra.capacity,
    formation: extra.formation,
    possessionAvg: extra.possessionAvg,
    passAccuracyAvg: extra.passAccuracyAvg,
    cleanSheets: extra.cleanSheets,
    xG: extra.xG,
    xGA: extra.xGA,
    standings: standingsRow,
    squad: squad.map((p) => ({
      id: p.id,
      name: p.name,
      position: p.position || "Player",
      dateOfBirth: p.dateOfBirth || null,
      nationality: p.nationality || "England",
      shirtNumber: p.shirtNumber || p.id % 30 + 1,
      goals: p.goals ?? 0,
      assists: p.assists ?? 0,
      rating: p.rating ?? 7.5,
      avatar: p.avatar || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&auto=format&fit=crop&q=80",
    })),
  };

  cache.set(cacheKey, teamData, 1800); // 30 minutes
  return teamData;
}

module.exports = {
  getTeamById,
  getAllTeams,
};