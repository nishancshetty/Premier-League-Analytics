import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import socket from "./services/socket";

// Socket.IO Connection
socket.on("connect", () => {
  console.log("Connected to backend:", socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected from backend");
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);