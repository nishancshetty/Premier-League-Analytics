import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://premier-league-analytics-1-rq3h.onrender.com/api",
});

// ---------------- Dashboard ----------------
export const getDashboard = () => API.get("/dashboard");

// ---------------- Standings ----------------
export const getStandings = () => API.get("/standings");

// ---------------- Fixtures ----------------
export const getFixtures = () => API.get("/fixtures");

// ---------------- Teams ----------------
export const getTeam = (id) => API.get(`/teams/${id}`);
export const getTeamMatches = (id) => API.get(`/teams/${id}/matches`);

// ---------------- Players ----------------
export const getPlayers = () => API.get("/players");
export const getPlayer = (id) => API.get(`/players/${id}`);
export const getTopScorers = () => API.get("/players/topscorers");

// ---------------- Analytics ----------------
export const getAnalytics = () => API.get("/analytics");

// ---------------- AI ----------------
export const getMatchPrediction = (matchId) =>
  API.get(`/ai/predict/${matchId}`);

export const getSeasonForecast = () =>
  API.get("/ai/season-forecast");

export const askAI = (question) =>
  API.post("/ai/chat", { question });

// ---------------- News ----------------
export const getLatestNews = () => API.get("/news");
export const getInjuries = () => API.get("/news/injuries");
export const getTransfers = () => API.get("/news/transfers");

// ---------------- Comparison ----------------
export const comparePlayers = (player1, player2) =>
  API.post("/comparison/players", { player1, player2 });

export const compareTeams = (team1, team2) =>
  API.post("/comparison/teams", { team1, team2 });

export default API;