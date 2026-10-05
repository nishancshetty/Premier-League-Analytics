const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function getTeamById(teamId) {
  try {
    const response = await footballApi.get(`/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Team API Error:",
      error.response?.data || error.message
    );

    return null;
  }
}

module.exports = {
  getTeamById,
};