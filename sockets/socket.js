let io;
const liveMatchService = require("../services/matchService");

const initializeSocket = (server) => {
  const { Server } = require("socket.io");

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Live Client Connected: ${socket.id}`);

    // Immediately send current live match state
    socket.emit("liveMatchUpdate", liveMatchService.getLiveState());

    socket.on("requestLiveUpdate", () => {
      socket.emit("liveMatchUpdate", liveMatchService.getLiveState());
    });

    socket.on("resetSimulation", () => {
      liveMatchService.reset();
      io.emit("liveMatchUpdate", liveMatchService.getLiveState());
    });

    socket.on("disconnect", () => {
      console.log(`Live Client Disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized.");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};