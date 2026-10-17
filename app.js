const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dashboardRoutes = require("./routes/dashboardRoutes");
const standingsRoutes = require("./routes/standingsRoutes");
const fixturesRoutes = require("./routes/fixturesRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const comparisonRoutes = require("./routes/comparisonRoutes");
const aiRoutes = require("./routes/aiRoutes");
const newsRoutes = require("./routes/newsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const sportmonksRoutes = require("./routes/sportmonksRoutes");

const app = express();

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// Health / Welcome Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Premier League Analytics API Engine is running",
    version: "2.0.0",
    status: "Healthy",
  });
});

// Primary API Endpoints
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/standings", standingsRoutes);
app.use("/api/fixtures", fixturesRoutes);
app.use("/api/matches", fixturesRoutes);
app.use("/api/football/matches", fixturesRoutes); // Legacy alias

app.use("/api/teams", teamRoutes);
app.use("/api/team", teamRoutes);

app.use("/api/players", playerRoutes);
app.use("/api/player", playerRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/comparison", comparisonRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/sportmonks", sportmonksRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

module.exports = app;