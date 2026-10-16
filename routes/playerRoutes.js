const express = require("express");
const router = express.Router();
const { getPlayers, getPlayer, getScorers } = require("../controllers/playerController");

router.get("/scorers", getScorers);
router.get("/:id", getPlayer);
router.get("/", getPlayers);

module.exports = router;