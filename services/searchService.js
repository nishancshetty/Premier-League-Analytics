const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function searchTeams(query) {
  try {
    const response = await footballApi.get("/teams");

    const teams = response.data.teams.filter((team) =>
      team.name.toLowerCase().includes(query.toLowerCase())
    );

    return teams;
  } catch (error) {
    console.error(
      "Search Error:",
      error.response?.data || error.message
    );

    return [];
  }
}

module.exports = {
  searchTeams,
};