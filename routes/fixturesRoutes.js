const express = require("express");
const router = express.Router();

const {
  getFixtures,
} = require("../controllers/fixturesController");

router.get("/", getFixtures);

module.exports = router;