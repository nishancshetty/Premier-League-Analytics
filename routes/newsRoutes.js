const express = require("express");
const router = express.Router();
const {
  getNews,
  getClubSpecificNews,
  getNewsApiStatus,
  getInjuries,
  getTransfers,
} = require("../controllers/newsController");

router.get("/", getNews);
router.get("/latest", getNews);
router.get("/club/:club", getClubSpecificNews);
router.get("/status", getNewsApiStatus);
router.get("/injuries", getInjuries);
router.get("/transfers", getTransfers);

module.exports = router;

