const axios = require("axios");
const cache = require("../utils/cache");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
  timeout: 8000,
});

let lastKnownMatches = null;

async function getAllMatches() {
  const cached = cache.get("pl_all_matches");
  if (cached && cached.length) {
    return cached;
  }

  try {
    const response = await footballApi.get("/competitions/PL/matches");
    const matches = response.data?.matches || [];
    if (matches.length > 0) {
      cache.set("pl_all_matches", matches, 300); // 5 min
      lastKnownMatches = matches;
      return matches;
    }
  } catch (error) {
    console.error(
      "Matches API Error (serving fallback/cache):",
      error.response?.status,
      error.response?.data?.message || error.message
    );
  }

  if (lastKnownMatches && lastKnownMatches.length) {
    return lastKnownMatches;
  }

  // Fallback matches generator if network is offline
  return generateFallbackMatches();
}

async function getPremierLeagueFixtures(filters = {}) {
  const allMatches = await getAllMatches();
  let result = [...allMatches];

  if (filters.matchday) {
    const md = parseInt(filters.matchday, 10);
    result = result.filter((m) => m.matchday === md);
  }

  if (filters.status) {
    const status = filters.status.toUpperCase();
    if (status === "SCHEDULED") {
      result = result.filter((m) => m.status === "TIMED" || m.status === "SCHEDULED");
    } else if (status === "LIVE" || status === "IN_PLAY") {
      result = result.filter((m) => m.status === "IN_PLAY" || m.status === "PAUSED");
    } else if (status === "FINISHED") {
      result = result.filter((m) => m.status === "FINISHED");
    }
  }

  if (filters.teamId) {
    const tId = parseInt(filters.teamId, 10);
    result = result.filter((m) => m.homeTeam?.id === tId || m.awayTeam?.id === tId);
  }

  if (filters.limit) {
    result = result.slice(0, parseInt(filters.limit, 10));
  }

  return result;
}

function generateFallbackMatches() {
  const teams = [
    { id: 65, name: "Manchester City FC", shortName: "Man City", crest: "https://crests.football-data.org/65.png" },
    { id: 57, name: "Arsenal FC", shortName: "Arsenal", crest: "https://crests.football-data.org/57.png" },
    { id: 64, name: "Liverpool FC", shortName: "Liverpool", crest: "https://crests.football-data.org/64.png" },
    { id: 61, name: "Chelsea FC", shortName: "Chelsea", crest: "https://crests.football-data.org/61.png" },
    { id: 66, name: "Manchester United FC", shortName: "Man United", crest: "https://crests.football-data.org/66.png" },
    { id: 73, name: "Tottenham Hotspur FC", shortName: "Tottenham", crest: "https://crests.football-data.org/73.png" },
    { id: 67, name: "Newcastle United FC", shortName: "Newcastle", crest: "https://crests.football-data.org/67.png" },
    { id: 58, name: "Aston Villa FC", shortName: "Aston Villa", crest: "https://crests.football-data.org/58.png" },
  ];

  return [
    {
      id: 5001,
      matchday: 7,
      status: "FINISHED",
      utcDate: "2026-10-04T16:30:00Z",
      homeTeam: teams[0],
      awayTeam: teams[1],
      score: { fullTime: { home: 2, away: 2 }, halfTime: { home: 1, away: 1 } },
    },
    {
      id: 5002,
      matchday: 7,
      status: "FINISHED",
      utcDate: "2026-10-05T14:00:00Z",
      homeTeam: teams[2],
      awayTeam: teams[3],
      score: { fullTime: { home: 2, away: 1 }, halfTime: { home: 1, away: 0 } },
    },
    {
      id: 5003,
      matchday: 8,
      status: "SCHEDULED",
      utcDate: "2026-10-19T14:00:00Z",
      homeTeam: teams[1],
      awayTeam: teams[2],
      score: { fullTime: { home: null, away: null } },
    },
    {
      id: 5004,
      matchday: 8,
      status: "SCHEDULED",
      utcDate: "2026-10-19T16:30:00Z",
      homeTeam: teams[0],
      awayTeam: teams[4],
      score: { fullTime: { home: null, away: null } },
    },
    {
      id: 5005,
      matchday: 8,
      status: "SCHEDULED",
      utcDate: "2026-10-20T19:00:00Z",
      homeTeam: teams[5],
      awayTeam: teams[6],
      score: { fullTime: { home: null, away: null } },
    },
  ];
}

module.exports = {
  getPremierLeagueFixtures,
  getAllMatches,
};