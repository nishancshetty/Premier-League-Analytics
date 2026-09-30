require("dotenv").config();

const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./sockets/socket");
const startLiveMatchEngine = require("./services/liveMatchEngine");

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

initializeSocket(server);

console.log(process.env.FOOTBALL_API_KEY);
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  startLiveMatchEngine();
});