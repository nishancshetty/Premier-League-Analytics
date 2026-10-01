import { useEffect, useState } from "react";
import socket from "../services/socket";

function LiveMatch() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    socket.on("liveMatchUpdate", (data) => {
      console.log("Live Update:", data);
      setMatch(data);
    });

    return () => {
      socket.off("liveMatchUpdate");
    };
  }, []);

  if (!match) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Waiting for live match...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <span className="bg-red-600 px-4 py-1 rounded-full text-sm font-semibold">
            {match.status}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {match.homeTeam} vs {match.awayTeam}
          </h1>

          <div className="text-7xl font-black mt-6">
            {match.homeScore} : {match.awayScore}
          </div>

          <div className="text-2xl text-sky-400 mt-4">
            {match.minute}'
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Match Events
          </h2>

          {match.events.length === 0 ? (
            <p className="text-gray-400">
              No events yet...
            </p>
          ) : (
            <div className="space-y-4">
              {match.events
                .slice()
                .reverse()
                .map((event, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b border-slate-700 pb-3"
                  >
                    <span className="font-bold">
                      {event.minute}'
                    </span>

                    <span>
                      ⚽ {event.player}
                    </span>

                    <span className="text-sky-400">
                      {event.team}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default LiveMatch;