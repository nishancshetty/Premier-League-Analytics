const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const liveRoutes = require("./routes/liveRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Premier League Analytics Backend Running",
  });
});

// Live Match Route
app.use("/api/live", liveRoutes);

module.exports = app;