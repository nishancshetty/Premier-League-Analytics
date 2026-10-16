const express = require("express");
const router = express.Router();
const { handleSearch } = require("../controllers/searchController");

router.get("/", handleSearch);

module.exports = router;