import { useEffect, useState } from "react";
import {
  FaBolt,
  FaRedo,
  FaStepForward,
  FaFutbol,
  FaSquare,
  FaExchangeAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import socket from "../services/socket";
import { getLiveMatch, resetLiveMatch } from "../services/api";

function LiveMatch() {
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initial fetch from REST API
    getLiveMatch()
      .then((data) => {
        if (data) setMatch(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    // 2. Real-time updates from WebSocket
    const onUpdate = (data) => {
      setMatch(data);
      setLoading(false);
    };

    socket.on("liveMatchUpdate", onUpdate);

    // Request immediate update from socket
    socket.emit("requestLiveUpdate");

    return () => {
      socket.off("liveMatchUpdate", onUpdate);
    };
  }, []);

  const handleReset = async () => {
    try {
      const res = await resetLiveMatch();
      setMatch(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleManualTick = () => {
    socket.emit("tick");
  };

  if (loading && !match) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-400">Connecting to Live Match Stream...</span>
        </div>
      </div>
    );
  }

  const m = match || {
    homeTeam: { name: "Manchester City", crest: "https://crests.football-data.org/65.png" },
    awayTeam: { name: "Liverpool", crest: "https://crests.football-data.org/64.png" },
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    status: "LIVE - 2ND HALF",
    stadium: "Etihad Stadium, Manchester",
    stats: {
      possession: { home: 58, away: 42 },
      shots: { home: 14, away: 9 },
      shotsOnTarget: { home: 6, away: 4 },
      xG: { home: 1.84, away: 1.22 },
      corners: { home: 7, away: 4 },
      fouls: { home: 8, away: 11 },
      yellowCards: { home: 1, away: 2 },
      passAccuracy: { home: 90, away: 84 },
    },
    events: [],
    commentary: [],
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 tracking-widest uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            Real-Time Broadcast Engine
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Live Match Center
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time live commentary, momentum swing telemetry, and minute-by-minute tactical stats.
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs transition border border-slate-700"
          >
            <FaRedo className="text-xs" />
            <span>Restart Match</span>
          </button>
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-xl text-xs text-red-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>WebSocket Live</span>
          </div>
        </div>
      </div>

      {/* Main Scoreboard Arena */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-red-950/40 via-slate-900/90 to-slate-950 border border-red-500/30 p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 mb-6 gap-2">
          <span className="flex items-center gap-1.5 font-semibold text-slate-300">
            <FaMapMarkerAlt className="text-cyan-400" />
            {m.stadium || "Etihad Stadium"}
          </span>

          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 px-3.5 py-1 rounded-full text-red-400 font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>{m.status || "LIVE"}</span>
          </div>

          <span className="font-mono font-bold text-cyan-400 text-sm bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
            {m.minute}' Minute
          </span>
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-between my-6 gap-4">
          {/* Home */}
          <div className="flex-1 text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
            {m.homeTeam?.crest && (
              <img src={m.homeTeam.crest} alt="home" className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg" />
            )}
            <div>
              <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest block">Home</span>
              <h2 className="text-xl sm:text-3xl font-black text-white">{m.homeTeam?.name || m.homeTeam}</h2>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                xG {m.stats?.xG?.home || 1.84}
              </span>
            </div>
          </div>

          {/* Big Score */}
          <div className="px-6 text-center">
            <div className="text-5xl sm:text-7xl font-black text-white font-mono tracking-widest text-shadow-glow">
              {m.homeScore} : {m.awayScore}
            </div>
          </div>

          {/* Away */}
          <div className="flex-1 text-center sm:text-right flex flex-col sm:flex-row-reverse items-center gap-4">
            {m.awayTeam?.crest && (
              <img src={m.awayTeam.crest} alt="away" className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-lg" />
            )}
            <div>
              <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest block">Away</span>
              <h2 className="text-xl sm:text-3xl font-black text-white">{m.awayTeam?.name || m.awayTeam}</h2>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                xG {m.stats?.xG?.away || 1.22}
              </span>
            </div>
          </div>
        </div>

        {/* Scorer Summary Chips */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            {(m.events || [])
              .filter((e) => e.type === "GOAL" && e.team === (m.homeTeam?.name || m.homeTeam))
              .map((g, idx) => (
                <div key={idx} className="flex items-center gap-2 text-cyan-300 font-medium">
                  <FaFutbol />
                  <span>{g.player} ({g.minute}')</span>
                </div>
              ))}
          </div>

          <div className="space-y-1 text-right">
            {(m.events || [])
              .filter((e) => e.type === "GOAL" && e.team === (m.awayTeam?.name || m.awayTeam))
              .map((g, idx) => (
                <div key={idx} className="flex items-center gap-2 text-red-300 font-medium justify-end">
                  <span>{g.player} ({g.minute}')</span>
                  <FaFutbol />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Grid: Live Match Stats & Events Timeline */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left (2 Col): Live Match Statistics & Momentum Telemetry */}
        <div className="lg:col-span-2 space-y-8">
          {/* Live Telemetry Bars */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FaBolt className="text-cyan-400" />
                Live In-Game Statistics
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold font-mono">
                <span className="text-cyan-400">{m.homeTeam?.shortName || "Man City"}</span>
                <span className="text-slate-500">vs</span>
                <span className="text-red-400">{m.awayTeam?.shortName || "Liverpool"}</span>
              </div>
            </div>

            {/* Stat rows */}
            {[
              {
                label: "Ball Possession",
                home: `${m.stats?.possession?.home || 58}%`,
                away: `${m.stats?.possession?.away || 42}%`,
                homePct: m.stats?.possession?.home || 58,
                awayPct: m.stats?.possession?.away || 42,
              },
              {
                label: "Total Shots",
                home: m.stats?.shots?.home || 14,
                away: m.stats?.shots?.away || 9,
                homePct: Math.round((m.stats?.shots?.home || 14) / 25 * 100),
                awayPct: Math.round((m.stats?.shots?.away || 9) / 25 * 100),
              },
              {
                label: "Shots on Target",
                home: m.stats?.shotsOnTarget?.home || 6,
                away: m.stats?.shotsOnTarget?.away || 4,
                homePct: 60,
                awayPct: 40,
              },
              {
                label: "Expected Goals (xG)",
                home: m.stats?.xG?.home || 1.84,
                away: m.stats?.xG?.away || 1.22,
                homePct: 60,
                awayPct: 40,
              },
              {
                label: "Corner Kicks",
                home: m.stats?.corners?.home || 7,
                away: m.stats?.corners?.away || 4,
                homePct: 64,
                awayPct: 36,
              },
              {
                label: "Passing Accuracy",
                home: `${m.stats?.passAccuracy?.home || 90}%`,
                away: `${m.stats?.passAccuracy?.away || 84}%`,
                homePct: m.stats?.passAccuracy?.home || 90,
                awayPct: m.stats?.passAccuracy?.away || 84,
              },
              {
                label: "Fouls Committed",
                home: m.stats?.fouls?.home || 8,
                away: m.stats?.fouls?.away || 11,
                homePct: 42,
                awayPct: 58,
              },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="font-mono text-cyan-400 font-bold">{stat.home}</span>
                  <span className="text-slate-300">{stat.label}</span>
                  <span className="font-mono text-red-400 font-bold">{stat.away}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full flex overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all duration-500"
                    style={{ width: `${stat.homePct}%` }}
                  ></div>
                  <div
                    className="bg-red-500 h-full transition-all duration-500 ml-auto"
                    style={{ width: `${stat.awayPct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Rolling Commentary Feed */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-800 flex items-center gap-2">
              <FaClock className="text-cyan-400" />
              Live Tactical Commentary Feed
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {(m.commentary || []).map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                  <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {c.minute}'
                  </span>
                  <p className="text-slate-300 leading-relaxed flex-1">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right (1 Col): Key Events Timeline */}
        <div className="space-y-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-800">
              Match Incident Timeline
            </h3>

            {(m.events || []).length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No major incidents logged yet.</p>
            ) : (
              <div className="space-y-4">
                {(m.events || []).map((ev, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs relative overflow-hidden group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-black text-cyan-400 bg-slate-900 px-2 py-0.5 rounded text-xs">
                        {ev.minute}'
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          ev.type === "GOAL"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : ev.type === "YELLOW_CARD"
                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {ev.type.replace("_", " ")}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-sm">
                      {ev.player || `${ev.playerIn} for ${ev.playerOut}`}
                    </h4>
                    <p className="text-[11px] text-slate-400">{ev.team}</p>

                    {ev.description && (
                      <p className="text-[11px] text-slate-300 mt-2 pt-2 border-t border-slate-800/60 leading-relaxed">
                        {ev.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveMatch;