const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function getPremierLeagueFixtures() {
  try {
    const response = await footballApi.get(
      "/competitions/PL/matches?status=SCHEDULED"
    );

    return response.data.matches.slice(0, 10);
  } catch (error) {
    console.error(
      "Fixtures API Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

module.exports = {
  getPremierLeagueFixtures,
};