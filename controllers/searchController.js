const { searchTeams } = require("../services/searchService");

const search = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      message: "Missing search query",
    });
  }

  try {
    const teams = await searchTeams(q);

    res.json({
      teams,
      players: [],
      matches: [],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Search failed",
    });
  }
};

module.exports = {
  search,
};