const express = require("express");
const router = express.Router();
const liveMatchService = require("../services/matchService");
const { getIO } = require("../sockets/socket");

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: liveMatchService.getLiveState(),
  });
});

router.post("/reset", (req, res) => {
  liveMatchService.reset();
  try {
    getIO().emit("liveMatchUpdate", liveMatchService.getLiveState());
  } catch (e) {}

  res.json({
    success: true,
    message: "Live simulation reset",
    data: liveMatchService.getLiveState(),
  });
});

router.post("/tick", (req, res) => {
  const updated = liveMatchService.tick();
  try {
    getIO().emit("liveMatchUpdate", updated);
  } catch (e) {}

  res.json({
    success: true,
    data: updated,
  });
});

module.exports = router;