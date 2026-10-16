const liveMatchService = require("./matchService");
const { getIO } = require("../sockets/socket");

function startLiveMatchEngine() {
  let interval = setInterval(() => {
    try {
      const match = liveMatchService.tick();

      try {
        getIO().emit("liveMatchUpdate", match);
      } catch (ioErr) {
        // Socket might not have connected yet
      }

      if (match.status === "FULL TIME" && match.minute >= 96) {
        setTimeout(() => {
          liveMatchService.reset();
        }, 15000);
      }
    } catch (err) {
      console.error("Live Match Engine Error:", err);
    }
  }, 3500);

  return interval;
}

module.exports = startLiveMatchEngine;