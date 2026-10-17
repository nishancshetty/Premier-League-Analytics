import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFutbol,
  FaRobot,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMagnifyingGlass,
  FaRotateLeft,
} from "react-icons/fa6";
import { getFixtures } from "../services/api";

function formatMatchDate(dateString) {
  if (!dateString) return "Date TBD";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Date TBD";
    const dateFormatted = d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const timeFormatted = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${dateFormatted} • ${timeFormatted} UTC`;
  } catch {
    return "Date TBD";
  }
}

function Fixtures() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [selectedMatchday, setSelectedMatchday] = useState(7);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [teamSearch, setTeamSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  const matchdays = useMemo(() => Array.from({ length: 38 }, (_, i) => i + 1), []);

  useEffect(() => {
    async function loadFixtures() {
      setLoading(true);
      try {
        const params = {};
        if (selectedMatchday) params.matchday = selectedMatchday;
        if (statusFilter !== "ALL") params.status = statusFilter;

        const data = await getFixtures(params);
        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fixtures error:", err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    loadFixtures();
  }, [selectedMatchday, statusFilter]);

  // Scroll active matchday pill into view when it changes
  useEffect(() => {
    if (carouselRef.current) {
      const activeBtn = carouselRef.current.querySelector(`[data-gw="${selectedMatchday}"]`);
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [selectedMatchday]);

  const handlePrevMatchday = () => {
    if (selectedMatchday > 1) setSelectedMatchday((prev) => prev - 1);
  };

  const handleNextMatchday = () => {
    if (selectedMatchday < 38) setSelectedMatchday((prev) => prev + 1);
  };

  // Filter matches by team search query
  const filteredMatches = useMemo(() => {
    if (!teamSearch.trim()) return matches;
    const query = teamSearch.toLowerCase().trim();
    return matches.filter((m) => {
      const home = (m.homeTeam?.name || m.homeTeam?.shortName || "").toLowerCase();
      const away = (m.awayTeam?.name || m.awayTeam?.shortName || "").toLowerCase();
      return home.includes(query) || away.includes(query);
    });
  }, [matches, teamSearch]);

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> Match Schedule & Scores
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Fixtures & Results
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Official schedules, kickoff times, scorelines, and AI predictions across all 38 Premier League matchweeks.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-1 rounded-2xl flex-shrink-0">
          {[
            { id: "ALL", label: "All Games" },
            { id: "FINISHED", label: "Results" },
            { id: "SCHEDULED", label: "Upcoming" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                statusFilter === tab.id
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                  : "text-[#B8B8B8] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gameweek Selector Toolbar */}
      <div className="pl-glass-panel p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-3 pb-3 border-b border-[rgba(255,255,255,0.06)]">
          {/* Left: Quick Jump Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMatchday}
              disabled={selectedMatchday === 1}
              className="p-2 sm:p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Previous Matchweek"
            >
              <FaChevronLeft className="text-xs" />
            </button>

            <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-3.5 py-1.5 rounded-xl">
              <span className="text-xs font-black text-[#1EF2C5] uppercase tracking-wider">
                MW {selectedMatchday}
              </span>
              <span className="text-[10px] text-[#777777] font-semibold">of 38</span>
            </div>

            <button
              onClick={handleNextMatchday}
              disabled={selectedMatchday === 38}
              className="p-2 sm:p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Next Matchweek"
            >
              <FaChevronRight className="text-xs" />
            </button>

            {selectedMatchday !== 7 && (
              <button
                onClick={() => setSelectedMatchday(7)}
                className="text-[11px] font-bold text-[#1EF2C5] hover:underline flex items-center gap-1.5 ml-2 transition"
              >
                <FaRotateLeft className="text-[10px]" /> Return to MW 7
              </button>
            )}
          </div>

          {/* Right: Inline Team Filter Search */}
          <div className="relative w-full sm:w-64">
            <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777] text-xs" />
            <input
              type="text"
              placeholder="Filter by team name..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] focus:border-[#1EF2C5] focus:outline-none rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#777777] transition"
            />
          </div>
        </div>

        {/* Gameweek Scroll Ribbon */}
        <div
          ref={carouselRef}
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800"
        >
          {matchdays.map((gw) => (
            <button
              key={gw}
              data-gw={gw}
              onClick={() => setSelectedMatchday(gw)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black font-mono transition flex-shrink-0 ${
                selectedMatchday === gw
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.35)] scale-105"
                  : "bg-[rgba(255,255,255,0.03)] text-[#B8B8B8] hover:text-white hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              GW {gw}
            </button>
          ))}
        </div>
      </div>

      {/* Matches Content Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[35vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-black text-[#1EF2C5] tracking-widest uppercase">
              Loading Matchweek {selectedMatchday} Fixtures...
            </span>
          </div>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="pl-glass-panel p-10 sm:p-14 text-center max-w-xl mx-auto">
          <FaFutbol className="w-12 h-12 mx-auto text-[#777777] mb-3 opacity-60" />
          <h3 className="text-lg font-black text-white">No Fixtures Found</h3>
          <p className="text-sm text-[#777777] mt-1">
            {teamSearch
              ? `No games matching "${teamSearch}" in Matchweek ${selectedMatchday}.`
              : `No matches recorded for Matchweek ${selectedMatchday} with filter "${statusFilter}".`}
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            {teamSearch && (
              <button
                onClick={() => setTeamSearch("")}
                className="pl-btn-glass text-xs py-2 px-4"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() => {
                setStatusFilter("ALL");
                setSelectedMatchday(7);
                setTeamSearch("");
              }}
              className="pl-btn-primary text-xs py-2 px-4"
            >
              Show Matchweek 7
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#777777] px-1 font-semibold">
            <span>
              Showing {filteredMatches.length} match{filteredMatches.length === 1 ? "" : "es"} in Matchweek {selectedMatchday}
            </span>
            {teamSearch && (
              <span className="text-[#1EF2C5]">Filtered by: "{teamSearch}"</span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full overflow-hidden">
            {filteredMatches.map((match) => {
              const isFinished = match.status === "FINISHED";

              return (
                <div
                  key={match.id}
                  className="pl-glass-panel p-5 sm:p-6 flex flex-col justify-between group shadow-xl hover:border-[rgba(30,242,197,0.35)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 overflow-hidden"
                >
                  {/* Top Bar: Status, Matchday & Kickoff Date */}
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-4 pb-3 border-b border-[rgba(255,255,255,0.08)] font-bold gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {isFinished ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 font-black bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 text-[10px] uppercase tracking-wider">
                          <FaCheckCircle className="text-[10px]" /> Full Time
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-[#1EF2C5] font-black bg-[#1EF2C5]/10 px-2.5 py-1 rounded-full border border-[#1EF2C5]/20 text-[10px] uppercase tracking-wider">
                          <FaClock className="text-[10px]" /> Scheduled
                        </span>
                      )}
                      <span className="text-[#B8B8B8] font-mono text-[11px]">
                        MW {match.matchday || selectedMatchday}
                      </span>
                    </div>

                    <span className="text-[#B8B8B8] font-mono text-xs flex-shrink-0">
                      {formatMatchDate(match.utcDate)}
                    </span>
                  </div>

                  {/* Center Scoreboard - Clean, decreased score pill with whitespace-nowrap that fits in correctly */}
                  <div className="flex items-center justify-between py-2 sm:py-3 gap-2 sm:gap-4">
                    {/* Home Team */}
                    <div
                      onClick={() => match.homeTeam?.id && navigate(`/team/${match.homeTeam.id}`)}
                      className="flex-1 min-w-0 flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group/home"
                      title={match.homeTeam?.name}
                    >
                      {match.homeTeam?.crest ? (
                        <img
                          src={match.homeTeam.crest}
                          alt="home"
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0 transition-transform group-hover/home:scale-110 drop-shadow-md"
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                          H
                        </div>
                      )}
                      <span className="font-extrabold text-white text-sm sm:text-base truncate group-hover/home:text-[#1EF2C5] transition">
                        {match.homeTeam?.shortName || match.homeTeam?.name}
                      </span>
                    </div>

                    {/* Center Score Pill - Properly sized, whitespace-nowrap, never breaks onto multiple lines */}
                    <div className="flex-shrink-0 flex items-center justify-center px-1 sm:px-2">
                      {isFinished ? (
                        <div className="flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] group-hover:border-[rgba(30,242,197,0.35)] shadow-inner text-white whitespace-nowrap transition-colors">
                          <span className="text-base sm:text-lg font-black font-mono text-white tabular-nums">
                            {match.score?.fullTime?.home ?? 0}
                          </span>
                          <span className="text-xs font-black text-[#1EF2C5] opacity-75">
                            :
                          </span>
                          <span className="text-base sm:text-lg font-black font-mono text-white tabular-nums">
                            {match.score?.fullTime?.away ?? 0}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center px-3 py-1.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] whitespace-nowrap">
                          <span className="text-[11px] font-mono font-black text-[#1EF2C5] tracking-wider">
                            VS
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Away Team */}
                    <div
                      onClick={() => match.awayTeam?.id && navigate(`/team/${match.awayTeam.id}`)}
                      className="flex-1 min-w-0 flex items-center justify-end gap-2.5 sm:gap-3.5 cursor-pointer group/away"
                      title={match.awayTeam?.name}
                    >
                      <span className="font-extrabold text-white text-sm sm:text-base truncate text-right group-hover/away:text-[#1EF2C5] transition">
                        {match.awayTeam?.shortName || match.awayTeam?.name}
                      </span>
                      {match.awayTeam?.crest ? (
                        <img
                          src={match.awayTeam.crest}
                          alt="away"
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0 transition-transform group-hover/away:scale-110 drop-shadow-md"
                        />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                          A
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-4 pt-3.5 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-[#777777] font-semibold text-[11px] truncate">
                        {isFinished && match.score?.halfTime?.home !== undefined && match.score?.halfTime?.home !== null
                          ? `HT (${match.score.halfTime.home} - ${match.score.halfTime.away})`
                          : "Premier League"}
                      </span>
                      {isFinished && (
                        <span className="text-[10px] font-mono text-[#777777] bg-white/[0.03] px-2 py-0.5 rounded border border-white/5 hidden sm:inline">
                          FT Result
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/ai?home=${match.homeTeam?.id || 65}&away=${match.awayTeam?.id || 57}`
                        )
                      }
                      className="flex items-center gap-1.5 sm:gap-2 bg-[rgba(30,242,197,0.08)] hover:bg-[#1EF2C5] hover:text-[#050505] text-[#1EF2C5] border border-[rgba(30,242,197,0.3)] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition ml-auto"
                    >
                      <FaRobot />
                      <span>AI Predict</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Fixtures;