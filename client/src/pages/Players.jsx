import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaExchangeAlt, FaArrowRight } from "react-icons/fa";
import { getPlayers, getTopScorers } from "../services/api";

function Players() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [sortBy, setSortBy] = useState("goals");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayerData() {
      setLoading(true);
      try {
        const [playerList, scorers] = await Promise.all([
          getPlayers({ sortBy }),
          getTopScorers().catch(() => []),
        ]);
        setPlayers(playerList || []);
        setTopScorers(scorers || []);
      } catch (err) {
        console.error("Players load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlayerData();
  }, [sortBy]);

  const filteredPlayers = players.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.team.toLowerCase().includes(search.toLowerCase()) ||
      p.nationality.toLowerCase().includes(search.toLowerCase());

    const matchesPos =
      selectedPosition === "ALL" ||
      p.position.toLowerCase().includes(selectedPosition.toLowerCase());

    return matchesSearch && matchesPos;
  });

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> Player Directory & Radar Telemetry
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Premier League Stars
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Performance analytics, FIFA/Opta ratings, expected goals (xG), and head-to-head metrics.
          </p>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search player, club..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] focus:border-[#1EF2C5] focus:shadow-[0_0_25px_rgba(30,242,197,0.18)] focus:outline-none rounded-2xl px-5 py-3 text-sm font-semibold text-white placeholder-[#777777] transition backdrop-blur-xl"
          />
        </div>
      </div>

      {/* Golden Boot Top 3 Highlight Podiums */}
      {topScorers.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topScorers.slice(0, 3).map((scorer, i) => (
            <div
              key={scorer.id || i}
              onClick={() => navigate(`/player/${scorer.id}`)}
              className="pl-glass-panel p-6 cursor-pointer flex items-center justify-between group shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl font-mono ${
                    i === 0
                      ? "bg-[rgba(30,242,197,0.15)] text-[#1EF2C5] border border-[rgba(30,242,197,0.4)] shadow-[0_0_20px_rgba(30,242,197,0.2)]"
                      : i === 1
                      ? "bg-white/10 text-white border border-white/20"
                      : "bg-amber-600/15 text-amber-400 border border-amber-600/30"
                  }`}
                >
                  #{i + 1}
                </div>
                <div>
                  <h3 className="font-black text-white text-lg group-hover:text-[#1EF2C5] transition">
                    {scorer.name}
                  </h3>
                  <p className="text-xs text-[#777777] font-bold">{scorer.team}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-[#1EF2C5] font-mono">
                  {scorer.goals}
                </span>
                <span className="text-[10px] text-[#777777] block uppercase font-black tracking-wider">Goals</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Position Filters & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4 pl-glass-panel p-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "Forward", "Midfield", "Defender", "Goalkeeper"].map((pos) => (
            <button
              key={pos}
              onClick={() => setSelectedPosition(pos)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                selectedPosition === pos
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                  : "bg-[rgba(255,255,255,0.04)] text-[#B8B8B8] hover:text-white"
              }`}
            >
              {pos === "ALL" ? "All Positions" : pos}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-[#777777] uppercase tracking-wider">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-2 text-xs font-black text-white focus:outline-none focus:border-[#1EF2C5]"
          >
            <option value="goals">Goals Scored</option>
            <option value="assists">Assists</option>
            <option value="rating">Opta Rating</option>
          </select>
        </div>
      </div>

      {/* Players Cards Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPlayers.length === 0 ? (
        <div className="pl-glass-panel p-12 text-center">
          <p className="text-[#777777] font-bold">No players match your search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div
              key={player.id}
              className="pl-glass-panel p-6 flex flex-col justify-between group shadow-xl relative overflow-hidden"
            >
              <div>
                {/* Header: Shirt #, Position, Rating */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black font-mono text-[#1EF2C5] bg-[rgba(30,242,197,0.1)] border border-[rgba(30,242,197,0.3)] px-3 py-1 rounded-xl">
                    #{player.shirtNumber || 10}
                  </span>
                  <span className="text-[10px] font-black text-white bg-[rgba(255,255,255,0.06)] px-3 py-1 rounded-full uppercase tracking-wider">
                    {player.position}
                  </span>
                  <span className="text-xs font-black text-[#1EF2C5] font-mono">
                    ★ {player.rating || 8.0}
                  </span>
                </div>

                {/* Name */}
                <div className="my-3">
                  <h3 className="text-xl font-black text-white group-hover:text-[#1EF2C5] transition truncate">
                    {player.name}
                  </h3>
                  <p className="text-xs text-[#777777] font-bold">
                    {player.team} • {player.nationality}
                  </p>
                </div>

                {/* 3 Metrics */}
                <div className="grid grid-cols-3 gap-2 my-4 text-center text-xs">
                  <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                    <span className="text-[10px] text-[#777777] uppercase font-bold">Goals</span>
                    <p className="text-lg font-black text-white font-mono mt-0.5">{player.goals}</p>
                  </div>
                  <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                    <span className="text-[10px] text-[#777777] uppercase font-bold">Assists</span>
                    <p className="text-lg font-black text-[#1EF2C5] font-mono mt-0.5">{player.assists}</p>
                  </div>
                  <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                    <span className="text-[10px] text-[#777777] uppercase font-bold">xG</span>
                    <p className="text-lg font-black text-emerald-400 font-mono mt-0.5">{player.xG || 12.4}</p>
                  </div>
                </div>

                {/* Radar stats */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono font-black text-[#B8B8B8] bg-[rgba(5,5,5,0.6)] p-3 rounded-2xl border border-[rgba(255,255,255,0.04)]">
                  <span>PAC {player.pace || 80}</span>
                  <span>SHO {player.shooting || 82}</span>
                  <span>PAS {player.passing || 80}</span>
                  <span>DRI {player.dribbling || 82}</span>
                  <span>DEF {player.defending || 50}</span>
                  <span>PHY {player.physical || 80}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <button
                  onClick={() => navigate(`/player/${player.id}`)}
                  className="flex-1 bg-[rgba(255,255,255,0.04)] hover:bg-[#1EF2C5] hover:text-[#050505] text-white font-black py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <span>Full Radar</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
                <button
                  onClick={() => navigate(`/compare?player1=${player.id}`)}
                  className="p-3 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-white hover:text-black text-[#777777] transition"
                  title="Compare Player"
                >
                  <FaExchangeAlt className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Players;