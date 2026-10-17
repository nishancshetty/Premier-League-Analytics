const {
  getSportmonksFixtures,
  getSportmonksLivescores,
  getSportmonksLeagues,
  getSportmonksStatus,
} = require("../services/sportmonksService");

const getFixtures = async (req, res) => {
  try {
    const result = await getSportmonksFixtures(req.query);
    res.json(result);
  } catch (error) {
    console.error("Sportmonks Fixtures Controller Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch Sportmonks fixtures" });
  }
};

const getLivescores = async (req, res) => {
  try {
    const result = await getSportmonksLivescores();
    res.json(result);
  } catch (error) {
    console.error("Sportmonks Livescores Controller Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch Sportmonks livescores" });
  }
};

const getLeagues = async (req, res) => {
  try {
    const result = await getSportmonksLeagues();
    res.json(result);
  } catch (error) {
    console.error("Sportmonks Leagues Controller Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch Sportmonks leagues" });
  }
};

const getStatus = async (req, res) => {
  try {
    const status = await getSportmonksStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getFixtures,
  getLivescores,
  getLeagues,
  getStatus,
};
