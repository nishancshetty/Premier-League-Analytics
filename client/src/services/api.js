import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://premier-league-analytics-1-rq3h.onrender.com/api",
});

// Dashboard
export const getDashboard = () => API.get("/dashboard");

// Standings
export const getStandings = () => API.get("/standings");

// Fixtures
export const getFixtures = () => API.get("/fixtures");

// Teams
export const getTeams = () => API.get("/teams");
export const getTeam = (id) => API.get(`/teams/${id}`);

// Players
export const getPlayers = () => API.get("/players");
export const getTopScorers = () => API.get("/players/topscorers");

// Analytics
export const getAnalytics = () => API.get("/analytics");

// AI
export const getMatchPrediction = (matchId) =>
  API.get(`/ai/predict/${matchId}`);

// News
export const getNews = () => API.get("/news");

// Search
export const search = (query) =>
  API.get(`/search?q=${encodeURIComponent(query)}`);

export default API;