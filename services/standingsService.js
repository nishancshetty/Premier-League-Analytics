const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function getPremierLeagueStandings() {
  try {
    const response = await footballApi.get(
      "/competitions/PL/standings"
    );

    return response.data.standings[0].table;
  } catch (error) {
    console.error(
      "Standings API Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

module.exports = {
  getPremierLeagueStandings,
};