const axios = require("axios");
const cache = require("../utils/cache");

const NEWS_BASE_URL = "https://newsapi.org/v2";

function getClient() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return null;

  return axios.create({
    baseURL: NEWS_BASE_URL,
    headers: {
      "X-Api-Key": apiKey,
      "User-Agent": "PremierLeagueAnalytics/2.0",
    },
    timeout: 8000,
  });
}

/**
 * Fetch latest Premier League news articles
 */
async function getLatestNews(query = "Premier League", page = 1, pageSize = 12) {
  const cacheKey = `news_${query}_${page}_${pageSize}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const client = getClient();
  if (!client) {
    return {
      success: false,
      message: "News API key not configured",
      articles: getFallbackNews(),
    };
  }

  try {
    const response = await client.get("/everything", {
      params: {
        q: query,
        language: "en",
        sortBy: "publishedAt",
        page,
        pageSize: Math.min(pageSize, 30),
      },
    });

    const rawArticles = response.data?.articles || [];

    // Filter out removed or broken articles
    const cleanArticles = rawArticles
      .filter(
        (a) =>
          a.title &&
          !a.title.includes("[Removed]") &&
          a.description &&
          !a.description.includes("[Removed]")
      )
      .map((a, idx) => ({
        id: `news-${page}-${idx}-${Date.now()}`,
        title: a.title,
        description: a.description,
        source: a.source?.name || "Premier League News",
        author: a.author || "Football Desk",
        url: a.url,
        imageUrl:
          a.urlToImage ||
          "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60",
        publishedAt: a.publishedAt,
        category: categorizeArticle(a.title + " " + a.description),
      }));

    const result = {
      success: true,
      totalResults: response.data?.totalResults || cleanArticles.length,
      articles: cleanArticles.length > 0 ? cleanArticles : getFallbackNews(),
    };

    cache.set(cacheKey, result, 600); // 10 minutes cache
    return result;
  } catch (error) {
    console.error("NewsAPI Error:", error.response?.status, error.message);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
      articles: getFallbackNews(),
    };
  }
}

/**
 * Fetch club-specific news articles
 */
async function getClubNews(clubName) {
  const cacheKey = `news_club_${clubName}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const searchQuery = `"${clubName}" AND "Premier League"`;
  const result = await getLatestNews(searchQuery, 1, 8);
  cache.set(cacheKey, result, 600);
  return result;
}

/**
 * Check NewsAPI connectivity status
 */
async function getNewsStatus() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return { connected: false, message: "News API key not configured" };
  }

  const client = getClient();
  try {
    const response = await client.get("/everything", {
      params: { q: "Premier League", pageSize: 1 },
    });
    return {
      connected: true,
      provider: "NewsAPI.org",
      totalResults: response.data?.totalResults || 0,
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    return {
      connected: false,
      provider: "NewsAPI.org",
      error: err.response?.data?.message || err.message,
    };
  }
}

function categorizeArticle(text) {
  const lower = text.toLowerCase();
  if (lower.includes("transfer") || lower.includes("sign") || lower.includes("fee") || lower.includes("deal")) {
    return "Transfer";
  }
  if (lower.includes("injur") || lower.includes("hamstring") || lower.includes("ruled out") || lower.includes("fitness")) {
    return "Injury";
  }
  if (lower.includes("tactics") || lower.includes("analysis") || lower.includes("xg") || lower.includes("lineup")) {
    return "Tactics";
  }
  return "Headlines";
}

function getFallbackNews() {
  return [
    {
      id: "fb-1",
      title: "Title Race Showdown: Manchester City and Arsenal Prepare for Crucial Clashes",
      description: "Tactical analysis ahead of matchweek fixtures as top title contenders battle for crucial points at the summit.",
      source: "Premier League Intelligence",
      author: "Analyst Desk",
      url: "https://www.premierleague.com",
      imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&auto=format&fit=crop&q=60",
      publishedAt: new Date().toISOString(),
      category: "Tactics",
    },
    {
      id: "fb-2",
      title: "Midfield Dynamos: Statistical Breakdown of Europe's Premier Playmakers",
      description: "Deep dive into progressive passes, expected assists, and pressing efficiency across the 2025/26 season.",
      source: "PL Analytics",
      author: "Data Science Team",
      url: "https://www.premierleague.com",
      imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      category: "Analysis",
    },
  ];
}

module.exports = {
  getLatestNews,
  getClubNews,
  getNewsStatus,
};
