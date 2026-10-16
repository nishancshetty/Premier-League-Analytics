import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrophy, FaExchangeAlt } from "react-icons/fa";
import { getStandings } from "../services/api";

function Standings() {
  const navigate = useNavigate();
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState("");
  const [sortKey, setSortKey] = useState("position");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function fetchStandings() {
      try {
        const res = await getStandings();
        setTable(res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStandings();
  }, []);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "position");
    }
  };

  const filteredAndSorted = table
    .filter((club) =>
      club.team.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (club.team.shortName && club.team.shortName.toLowerCase().includes(searchFilter.toLowerCase()))
    )
    .sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (sortKey === "teamName") {
        valA = a.team.name;
        valB = b.team.name;
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });

  const getPositionBadge = (pos) => {
    if (pos <= 4) {
      return {
        bg: "bg-[rgba(30,242,197,0.15)] text-[#1EF2C5] border border-[rgba(30,242,197,0.4)]",
        label: "UCL",
      };
    }
    if (pos === 5) {
      return {
        bg: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
        label: "UEL",
      };
    }
    if (pos === 6) {
      return {
        bg: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
        label: "UECL",
      };
    }
    if (pos >= 18) {
      return {
        bg: "bg-[#FF5F57]/15 text-[#FF5F57] border border-[#FF5F57]/30",
        label: "REL",
      };
    }
    return { bg: "bg-[rgba(255,255,255,0.04)] text-[#777777]", label: "" };
  };

  const getRecentForm = (club) => {
    if (club.position <= 3) return ["W", "W", "W", "D", "W"];
    if (club.position <= 6) return ["W", "D", "W", "L", "W"];
    if (club.position <= 12) return ["D", "W", "L", "D", "W"];
    if (club.position <= 17) return ["L", "D", "L", "W", "L"];
    return ["L", "L", "D", "L", "L"];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-extrabold text-[#1EF2C5] tracking-widest uppercase">
            Loading Official Standings...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> Official League Standings
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Premier League Table
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Season 2025/26 rankings, European qualification thresholds, goal margins, and form.
          </p>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search club..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] focus:border-[#1EF2C5] focus:shadow-[0_0_25px_rgba(30,242,197,0.18)] focus:outline-none rounded-2xl px-5 py-3 text-sm font-semibold text-white placeholder-[#777777] transition backdrop-blur-xl"
          />
        </div>
      </div>

      {/* Qualification Indicators Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 pl-glass-panel px-4 py-3 rounded-2xl text-xs font-bold">
          <span className="w-3.5 h-3.5 rounded-lg bg-[#1EF2C5] shadow-[0_0_10px_#1EF2C5]"></span>
          <span className="text-white">1 - 4 Champions League</span>
        </div>
        <div className="flex items-center gap-3 pl-glass-panel px-4 py-3 rounded-2xl text-xs font-bold">
          <span className="w-3.5 h-3.5 rounded-lg bg-orange-500"></span>
          <span className="text-white">5 Europa League</span>
        </div>
        <div className="flex items-center gap-3 pl-glass-panel px-4 py-3 rounded-2xl text-xs font-bold">
          <span className="w-3.5 h-3.5 rounded-lg bg-blue-500"></span>
          <span className="text-white">6 Conference League</span>
        </div>
        <div className="flex items-center gap-3 pl-glass-panel px-4 py-3 rounded-2xl text-xs font-bold">
          <span className="w-3.5 h-3.5 rounded-lg bg-[#FF5F57]"></span>
          <span className="text-white">18 - 20 Relegation</span>
        </div>
      </div>

      {/* Main Table */}
      <div className="pl-glass-panel overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#050505]/80 text-[#777777] text-xs font-black uppercase tracking-[2px] border-b border-[rgba(255,255,255,0.08)]">
              <tr>
                <th
                  onClick={() => handleSort("position")}
                  className="py-5 px-4 text-center cursor-pointer hover:text-white transition w-16"
                >
                  Pos
                </th>
                <th
                  onClick={() => handleSort("teamName")}
                  className="py-5 px-4 text-left cursor-pointer hover:text-white transition"
                >
                  Club
                </th>
                <th
                  onClick={() => handleSort("playedGames")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  P
                </th>
                <th
                  onClick={() => handleSort("won")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  W
                </th>
                <th
                  onClick={() => handleSort("draw")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  D
                </th>
                <th
                  onClick={() => handleSort("lost")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  L
                </th>
                <th
                  onClick={() => handleSort("goalsFor")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  GF
                </th>
                <th
                  onClick={() => handleSort("goalsAgainst")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  GA
                </th>
                <th
                  onClick={() => handleSort("goalDifference")}
                  className="py-5 px-3 text-center cursor-pointer hover:text-white transition"
                >
                  GD
                </th>
                <th
                  onClick={() => handleSort("points")}
                  className="py-5 px-5 text-center cursor-pointer hover:text-[#1EF2C5] transition font-black text-white"
                >
                  Pts
                </th>
                <th className="py-5 px-4 text-center hidden md:table-cell">Recent Form</th>
                <th className="py-5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
              {filteredAndSorted.map((club) => {
                const badge = getPositionBadge(club.position);
                const formDots = getRecentForm(club);

                return (
                  <tr
                    key={club.team.id}
                    className="hover:bg-[rgba(255,255,255,0.04)] transition group"
                  >
                    {/* Position */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-xl font-mono font-black text-xs ${badge.bg}`}
                      >
                        {club.position}
                      </span>
                    </td>

                    {/* Club Name & Crest */}
                    <td className="py-4 px-4">
                      <Link
                        to={`/team/${club.team.id}`}
                        className="flex items-center gap-3.5 group-hover:text-[#1EF2C5] transition"
                      >
                        <img
                          src={club.team.crest}
                          alt={club.team.name}
                          className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
                        />
                        <div>
                          <span className="font-extrabold text-white block text-base">
                            {club.team.name}
                          </span>
                          <span className="text-xs text-[#777777] font-semibold">
                            {club.team.shortName}
                          </span>
                        </div>
                      </Link>
                    </td>

                    {/* Records */}
                    <td className="py-4 px-3 text-center text-[#B8B8B8] font-bold font-mono">{club.playedGames}</td>
                    <td className="py-4 px-3 text-center font-black text-white font-mono">{club.won}</td>
                    <td className="py-4 px-3 text-center text-[#777777] font-bold font-mono">{club.draw}</td>
                    <td className="py-4 px-3 text-center text-[#777777] font-bold font-mono">{club.lost}</td>
                    <td className="py-4 px-3 text-center text-white font-bold font-mono">{club.goalsFor}</td>
                    <td className="py-4 px-3 text-center text-[#777777] font-bold font-mono">{club.goalsAgainst}</td>
                    <td className="py-4 px-3 text-center font-mono font-black">
                      <span
                        className={
                          club.goalDifference > 0
                            ? "text-[#1EF2C5]"
                            : club.goalDifference < 0
                            ? "text-[#FF5F57]"
                            : "text-[#777777]"
                        }
                      >
                        {club.goalDifference > 0 ? `+${club.goalDifference}` : club.goalDifference}
                      </span>
                    </td>

                    {/* Points */}
                    <td className="py-4 px-5 text-center font-black text-[#1EF2C5] font-mono text-xl bg-[rgba(255,255,255,0.01)]">
                      {club.points}
                    </td>

                    {/* Form Pills */}
                    <td className="py-4 px-4 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1.5">
                        {formDots.map((res, i) => (
                          <span
                            key={i}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white ${
                              res === "W"
                                ? "bg-[#1EF2C5]/20 text-[#1EF2C5] border border-[#1EF2C5]/40"
                                : res === "D"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                : "bg-[#FF5F57]/20 text-[#FF5F57] border border-[#FF5F57]/40"
                            }`}
                          >
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/team/${club.team.id}`)}
                          className="px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[#1EF2C5] hover:text-[#050505] text-xs font-black text-white transition duration-300"
                        >
                          PROFILE
                        </button>
                        <button
                          onClick={() => navigate(`/compare?team1=${club.team.id}`)}
                          className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-white hover:text-black text-[#777777] transition"
                          title="Compare Club"
                        >
                          <FaExchangeAlt className="text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Standings;