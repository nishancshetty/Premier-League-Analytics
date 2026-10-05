const axios = require("axios");

const footballApi = axios.create({
  baseURL: process.env.FOOTBALL_BASE_URL,
  headers: {
    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
  },
});

async function getPlayerById(playerId) {
  try {
    const response = await footballApi.get(`/persons/${playerId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Player API Error:",
      error.response?.data || error.message
    );

    return null;
  }
}

module.exports = {
  getPlayerById,
};