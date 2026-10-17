const express = require("express");
const router = express.Router();
const {
  getFixtures,
  getLivescores,
  getLeagues,
  getStatus,
} = require("../controllers/sportmonksController");

router.get("/fixtures", getFixtures);
router.get("/livescores", getLivescores);
router.get("/leagues", getLeagues);
router.get("/status", getStatus);

module.exports = router;
