const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const footballRoutes = require("./routes/footballRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const standingsRoutes = require("./routes/standingsRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const searchRoutes = require("./routes/searchRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Premier League Analytics API is running",
  });
});

// API Routes
app.use("/api/football", footballRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/standings", standingsRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/analytics", analyticsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;