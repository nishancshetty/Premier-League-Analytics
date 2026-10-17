import axios from "axios";

const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const DEFAULT_URL = isLocalhost
  ? "http://localhost:5001/api"
  : "https://premier-league-analytics-1-rq3h.onrender.com/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || DEFAULT_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export default api;

export async function getDashboard() {
  const { data } = await api.get("/dashboard");
  return data.data;
}

export async function getStandings() {
  const { data } = await api.get("/standings");
  return data;
}

export async function getFixtures(params = {}) {
  const { data } = await api.get("/fixtures", { params });
  return data;
}

export async function getTeams() {
  const { data } = await api.get("/teams");
  return data;
}

export async function getTeam(id) {
  const { data } = await api.get(`/teams/${id}`);
  return data;
}

export async function getTeamSquad(id) {
  const { data } = await api.get(`/teams/${id}/players`);
  return data;
}

export async function getTeamMatches(id) {
  const { data } = await api.get(`/teams/${id}/matches`);
  return data;
}

export async function getPlayers(params = {}) {
  const { data } = await api.get("/players", { params });
  return data;
}

export async function getPlayer(id) {
  const { data } = await api.get(`/players/${id}`);
  return data;
}

export async function getTopScorers() {
  const { data } = await api.get("/players/scorers");
  return data;
}

export async function getAnalytics() {
  const { data } = await api.get("/analytics");
  return data;
}

export async function compareTeams(team1, team2) {
  const { data } = await api.get("/comparison", {
    params: { team1, team2 },
  });
  return data;
}

export async function comparePlayers(player1, player2) {
  const { data } = await api.get("/comparison/players", {
    params: { player1, player2 },
  });
  return data;
}

export async function getMatchPrediction(homeTeam, awayTeam) {
  const { data } = await api.get("/ai/predict", {
    params: { homeTeam, awayTeam },
  });
  return data.data;
}

export async function getSeasonForecast() {
  const { data } = await api.get("/ai/forecast");
  return data.data;
}

export async function getInjuries() {
  const { data } = await api.get("/news/injuries");
  return data.data;
}

export async function getTransfers() {
  const { data } = await api.get("/news/transfers");
  return data.data;
}

export async function getLatestNews(params = {}) {
  const { data } = await api.get("/news/latest", { params });
  return data;
}

export async function getClubNews(clubName) {
  const { data } = await api.get(`/news/club/${encodeURIComponent(clubName)}`);
  return data;
}

export async function askAI(prompt, context = {}) {
  const { data } = await api.post("/ai/ask", { prompt, context });
  return data;
}

export async function getAIStatus() {
  const { data } = await api.get("/ai/status");
  return data.data;
}

export async function getSportmonksFixtures(params = {}) {
  const { data } = await api.get("/sportmonks/fixtures", { params });
  return data;
}

export async function getSportmonksStatus() {
  const { data } = await api.get("/sportmonks/status");
  return data.data;
}

export async function searchAll(query) {
  const { data } = await api.get("/search", {
    params: { q: query },
  });
  return data;
}