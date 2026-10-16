import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFutbol, FaRobot, FaCalendarAlt, FaCheckCircle, FaClock, FaBolt } from "react-icons/fa";
import { getFixtures } from "../services/api";

function Fixtures() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [selectedMatchday, setSelectedMatchday] = useState(7);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFixtures() {
      setLoading(true);
      try {
        const params = {};
        if (selectedMatchday) params.matchday = selectedMatchday;
        if (statusFilter !== "ALL") params.status = statusFilter;

        const data = await getFixtures(params);
        setMatches(data || []);
      } catch (err) {
        console.error("Fixtures error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadFixtures();
  }, [selectedMatchday, statusFilter]);

  const matchdays = Array.from({ length: 38 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> Match Calendar & Telemetry
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Fixtures & Results
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Schedule, scores, and real-time match events across all 38 Premier League matchweeks.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-1 rounded-2xl">
          {["ALL", "FINISHED", "SCHEDULED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                statusFilter === tab
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                  : "text-[#B8B8B8] hover:text-white"
              }`}
            >
              {tab === "ALL" ? "All Games" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Gameweek Carousel */}
      <div className="pl-glass-panel p-4 shadow-xl">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-700">
          <span className="text-xs font-black text-[#1EF2C5] uppercase tracking-[2px] px-3 flex-shrink-0">
            Gameweek:
          </span>
          {matchdays.map((gw) => (
            <button
              key={gw}
              onClick={() => setSelectedMatchday(gw)}
              className={`px-4 py-2 rounded-xl text-xs font-black font-mono transition flex-shrink-0 ${
                selectedMatchday === gw
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.35)]"
                  : "bg-[rgba(255,255,255,0.04)] text-[#B8B8B8] hover:text-white hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              GW {gw}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-black text-[#1EF2C5] tracking-widest uppercase">
              Loading Gameweek {selectedMatchday} Fixtures...
            </span>
          </div>
        </div>
      ) : matches.length === 0 ? (
        <div className="pl-glass-panel p-12 text-center">
          <FaFutbol className="w-12 h-12 mx-auto text-[#777777] mb-3" />
          <h3 className="text-lg font-black text-white">No Fixtures Found</h3>
          <p className="text-sm text-[#777777] mt-1">
            No matches found for Matchweek {selectedMatchday} with filter "{statusFilter}".
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => {
            const isFinished = match.status === "FINISHED";
            const isLive = match.status === "IN_PLAY" || match.status === "PAUSED";
            const isScheduled = match.status === "SCHEDULED" || match.status === "TIMED";

            return (
              <div
                key={match.id}
                className="pl-glass-panel p-6 flex flex-col justify-between group shadow-xl"
              >
                {/* Status & Date */}
                <div className="flex items-center justify-between text-xs text-[#777777] mb-4 pb-3 border-b border-[rgba(255,255,255,0.08)] font-bold">
                  <div className="flex items-center gap-2">
                    {isFinished && (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-black bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-[10px] uppercase tracking-wider">
                        <FaCheckCircle className="text-[10px]" /> Full Time
                      </span>
                    )}
                    {isLive && (
                      <span className="flex items-center gap-1.5 text-[#FF5F57] font-black bg-[#FF5F57]/15 px-3 py-1 rounded-full border border-[#FF5F57]/30 text-[10px] uppercase tracking-wider animate-pulse">
                        <FaBolt className="text-[10px]" /> Live In-Play
                      </span>
                    )}
                    {isScheduled && (
                      <span className="flex items-center gap-1.5 text-[#1EF2C5] font-black bg-[#1EF2C5]/10 px-3 py-1 rounded-full border border-[#1EF2C5]/30 text-[10px] uppercase tracking-wider">
                        <FaClock className="text-[10px]" /> Scheduled
                      </span>
                    )}
                    <span className="text-[#B8B8B8] font-mono">GW {match.matchday || selectedMatchday}</span>
                  </div>

                  <span className="text-white font-mono">
                    {match.utcDate ? new Date(match.utcDate).toLocaleString([], { dateStyle: "short", timeStyle: "short" }) : "TBD"}
                  </span>
                </div>

                {/* Scoreboard */}
                <div className="flex items-center justify-between py-3">
                  {/* Home */}
                  <div
                    onClick={() => match.homeTeam?.id && navigate(`/team/${match.homeTeam.id}`)}
                    className="flex-1 flex items-center gap-3.5 cursor-pointer group-hover:text-[#1EF2C5] transition"
                  >
                    {match.homeTeam?.crest && (
                      <img src={match.homeTeam.crest} alt="home" className="w-9 h-9 object-contain" />
                    )}
                    <span className="font-extrabold text-white text-base truncate">
                      {match.homeTeam?.shortName || match.homeTeam?.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="px-6 text-center">
                    {isFinished || isLive ? (
                      <div className="text-3xl font-black font-mono tracking-widest text-white">
                        {match.score?.fullTime?.home ?? 0} : {match.score?.fullTime?.away ?? 0}
                      </div>
                    ) : (
                      <span className="px-3.5 py-1.5 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-xs font-mono font-black text-[#1EF2C5]">
                        VS
                      </span>
                    )}
                  </div>

                  {/* Away */}
                  <div
                    onClick={() => match.awayTeam?.id && navigate(`/team/${match.awayTeam.id}`)}
                    className="flex-1 flex items-center justify-end gap-3.5 cursor-pointer group-hover:text-[#1EF2C5] transition"
                  >
                    <span className="font-extrabold text-white text-base truncate text-right">
                      {match.awayTeam?.shortName || match.awayTeam?.name}
                    </span>
                    {match.awayTeam?.crest && (
                      <img src={match.awayTeam.crest} alt="away" className="w-9 h-9 object-contain" />
                    )}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="mt-5 pt-3.5 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs">
                  <span className="text-[#777777] font-semibold truncate">
                    {isFinished && match.score?.halfTime?.home !== undefined
                      ? `HT (${match.score.halfTime.home} - ${match.score.halfTime.away})`
                      : "Premier League Fixture"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/ai?home=${match.homeTeam?.id || 65}&away=${match.awayTeam?.id || 57}`)
                      }
                      className="flex items-center gap-2 bg-[rgba(30,242,197,0.1)] hover:bg-[#1EF2C5] hover:text-[#050505] text-[#1EF2C5] border border-[rgba(30,242,197,0.3)] px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition"
                    >
                      <FaRobot />
                      <span>Predict</span>
                    </button>
                    {isLive && (
                      <button
                        onClick={() => navigate("/live")}
                        className="bg-[#FF5F57] hover:bg-red-400 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider transition"
                      >
                        Live Telemetry
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Fixtures;