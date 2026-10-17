const axios = require("axios");
const cache = require("../utils/cache");

const SPORTMONKS_BASE_URL = "https://api.sportmonks.com/v3/football";

function getClient() {
  const token = process.env.SPORTMONKS_API_TOKEN;
  if (!token) return null;

  return axios.create({
    baseURL: SPORTMONKS_BASE_URL,
    headers: {
      Authorization: token,
      Accept: "application/json",
    },
    timeout: 8000,
  });
}

/**
 * Fetch fixtures from Sportmonks
 */
async function getSportmonksFixtures(options = {}) {
  const cacheKey = `sportmonks_fixtures_${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    return { success: false, message: "Sportmonks API token not configured", data: [] };
  }

  try {
    const params = {
      include: "participants;scores;state;venue",
      ...options,
    };

    const response = await client.get("/fixtures", { params });
    const rawFixtures = response.data?.data || [];

    // Transform into standard fixture schema
    const formatted = rawFixtures.map((f) => {
      const homeTeam = f.participants?.find((p) => p.meta?.location === "home") || f.participants?.[0];
      const awayTeam = f.participants?.find((p) => p.meta?.location === "away") || f.participants?.[1];

      const homeScore = f.scores?.find((s) => s.participant_id === homeTeam?.id && s.description === "CURRENT")?.score?.goals ??
        f.scores?.find((s) => s.score?.participant === "home")?.score?.goals ?? null;

      const awayScore = f.scores?.find((s) => s.participant_id === awayTeam?.id && s.description === "CURRENT")?.score?.goals ??
        f.scores?.find((s) => s.score?.participant === "away")?.score?.goals ?? null;

      return {
        id: f.id,
        name: f.name,
        utcDate: f.starting_at,
        status: f.state?.state || "SCHEDULED",
        homeTeam: {
          id: homeTeam?.id,
          name: homeTeam?.name,
          shortName: homeTeam?.short_code || homeTeam?.name,
          crest: homeTeam?.image_path || null,
        },
        awayTeam: {
          id: awayTeam?.id,
          name: awayTeam?.name,
          shortName: awayTeam?.short_code || awayTeam?.name,
          crest: awayTeam?.image_path || null,
        },
        score: {
          fullTime: { home: homeScore, away: awayScore },
        },
        venue: f.venue?.name || "Premier Arena",
      };
    });

    cache.set(cacheKey, formatted, 180); // 3 minutes cache
    return { success: true, count: formatted.length, data: formatted };
  } catch (error) {
    console.error("Sportmonks Fixtures Error:", error.response?.status, error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      data: [],
    };
  }
}

/**
 * Fetch live in-play scores from Sportmonks
 */
async function getSportmonksLivescores() {
  const cached = cache.get("sportmonks_livescores");
  if (cached) return cached;

  const client = getClient();
  if (!client) return { success: false, data: [] };

  try {
    const response = await client.get("/livescores/inplay", {
      params: { include: "participants;scores;periods" },
    });
    const livescores = response.data?.data || [];
    cache.set("sportmonks_livescores", livescores, 30); // 30s cache
    return { success: true, data: livescores };
  } catch (error) {
    console.error("Sportmonks Livescores Error:", error.response?.status, error.message);
    return { success: false, data: [] };
  }
}

/**
 * Fetch leagues accessible with Sportmonks token
 */
async function getSportmonksLeagues() {
  const cached = cache.get("sportmonks_leagues");
  if (cached) return cached;

  const client = getClient();
  if (!client) return { success: false, data: [] };

  try {
    const response = await client.get("/leagues");
    const leagues = response.data?.data || [];
    cache.set("sportmonks_leagues", leagues, 3600); // 1 hour cache
    return { success: true, data: leagues };
  } catch (error) {
    console.error("Sportmonks Leagues Error:", error.response?.status, error.message);
    return { success: false, data: [] };
  }
}

/**
 * Check Sportmonks API status
 */
async function getSportmonksStatus() {
  const token = process.env.SPORTMONKS_API_TOKEN;
  if (!token) {
    return { connected: false, message: "Token not found in environment" };
  }

  const client = getClient();
  try {
    const response = await client.get("/leagues");
    return {
      connected: true,
      provider: "SportMonks Football v3",
      leaguesAvailable: response.data?.data?.length || 0,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {
      connected: false,
      provider: "SportMonks Football v3",
      error: err.response?.data?.message || err.message,
    };
  }
}

module.exports = {
  getSportmonksFixtures,
  getSportmonksLivescores,
  getSportmonksLeagues,
  getSportmonksStatus,
};
