const { getPremierLeagueMatches } = require("../services/footballApi");

const getDashboardData = async (req, res) => {
  try {
    const matches = await getPremierLeagueMatches();

    const liveMatches = matches.filter(
      (match) =>
        match.status === "IN_PLAY" ||
        match.status === "PAUSED"
    );

    const finishedMatches = matches.filter(
      (match) => match.status === "FINISHED"
    );

    let goalsToday = 0;

    finishedMatches.forEach((match) => {
      goalsToday +=
        (match.score.fullTime.home ?? 0) +
        (match.score.fullTime.away ?? 0);
    });

    res.json({
      liveMatches: liveMatches.length,
      totalTeams: 20,
      goalsToday,
      matchweek: matches[0]?.season?.currentMatchday ?? "-",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to load dashboard data",
    });
  }
};

module.exports = {
  getDashboardData,
};