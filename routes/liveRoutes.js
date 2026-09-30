const express = require("express");
const router = express.Router();

const liveMatch = require("../services/matchService");

router.get("/", (req, res) => {
  res.json(liveMatch);
});

module.exports = router;