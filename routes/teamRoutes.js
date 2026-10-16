const express = require("express");
const router = express.Router();
const {
  getTeams,
  getTeam,
  getTeamMatches,
  getTeamSquad,
} = require("../controllers/teamController");

router.get("/:id/players", getTeamSquad);
router.get("/:id/matches", getTeamMatches);
router.get("/:id", getTeam);
router.get("/", getTeams);

module.exports = router;