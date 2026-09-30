import { useEffect, useState } from "react";
import socket from "../services/socket";

export default function useLiveMatch() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    socket.on("liveMatchUpdate", (data) => {
      setMatch(data);
    });

    return () => {
      socket.off("liveMatchUpdate");
    };
  }, []);

  return match;
}