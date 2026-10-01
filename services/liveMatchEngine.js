const liveMatch = require("./matchService");
const { getIO } = require("../sockets/socket");

let minute = 0;

function startLiveMatchEngine() {
  setInterval(() => {
    minute++;
    liveMatch.minute = minute;

    // Simulate goals
    if (minute === 12) {
      liveMatch.homeScore++;
      liveMatch.events.push({
        minute,
        type: "GOAL",
        team: liveMatch.homeTeam,
        player: "Erling Haaland",
      });
    }

    if (minute === 31) {
      liveMatch.awayScore++;
      liveMatch.events.push({
        minute,
        type: "GOAL",
        team: liveMatch.awayTeam,
        player: "Mohamed Salah",
      });
    }

    if (minute === 57) {
      liveMatch.homeScore++;
      liveMatch.events.push({
        minute,
        type: "GOAL",
        team: liveMatch.homeTeam,
        player: "Phil Foden",
      });
    }

    if (minute >= 90) {
      liveMatch.status = "FULL TIME";
    }

    getIO().emit("liveMatchUpdate", liveMatch);

    console.log(
      `[${liveMatch.minute}'] ${liveMatch.homeTeam} ${liveMatch.homeScore} - ${liveMatch.awayScore} ${liveMatch.awayTeam}`
    );
  }, 3000);
}

module.exports = startLiveMatchEngine;