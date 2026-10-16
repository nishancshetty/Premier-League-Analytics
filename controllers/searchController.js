const { searchAll } = require("../services/searchService");

const handleSearch = async (req, res) => {
  try {
    const { q = "" } = req.query;
    const results = await searchAll(q);
    res.json(results);
  } catch (error) {
    console.error("Search Controller Error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = {
  handleSearch,
};