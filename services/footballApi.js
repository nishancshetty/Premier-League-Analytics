const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function getPremierLeagueMatches() {
  try {
    const response = await footballApi.get("/competitions/PL/matches");

    return response.data.matches;
  } catch (error) {
    console.error(
      "Football API Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

module.exports = {
  getPremierLeagueMatches,
};