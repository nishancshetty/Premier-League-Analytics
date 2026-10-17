const { injuriesData, transfersData } = require("../data/plData");
const {
  getLatestNews,
  getClubNews,
  getNewsStatus,
} = require("../services/newsService");

const getNews = async (req, res) => {
  try {
    const { q = "Premier League", page = 1, limit = 12 } = req.query;
    const news = await getLatestNews(q, parseInt(page, 10), parseInt(limit, 10));
    res.json(news);
  } catch (error) {
    console.error("News Controller Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
};

const getClubSpecificNews = async (req, res) => {
  try {
    const { club } = req.params;
    const news = await getClubNews(club);
    res.json(news);
  } catch (error) {
    console.error("Club News Controller Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch club news" });
  }
};

const getNewsApiStatus = async (req, res) => {
  try {
    const status = await getNewsStatus();
    res.json({ success: true, data: status });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getInjuries = (req, res) => {
  res.json({
    success: true,
    data: injuriesData,
  });
};

const getTransfers = (req, res) => {
  res.json({
    success: true,
    data: transfersData,
  });
};

module.exports = {
  getNews,
  getClubSpecificNews,
  getNewsApiStatus,
  getInjuries,
  getTransfers,
};

