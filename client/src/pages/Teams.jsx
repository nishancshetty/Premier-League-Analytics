import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStandings } from "../services/api";
import { FaShieldAlt, FaExchangeAlt, FaArrowRight } from "react-icons/fa";

function Teams() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getStandings();
        setTeams(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTeams();
  }, []);

  const filteredTeams = teams.filter((club) =>
    club.team.name.toLowerCase().includes(search.toLowerCase()) ||
    (club.team.shortName && club.team.shortName.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-extrabold text-[#1EF2C5] tracking-widest uppercase">
            Loading Premier League Clubs...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> 20 Elite Football Clubs
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Premier League Clubs
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Official club hubs, squad records, tactical formations, and historical telemetry.
          </p>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Search club name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] focus:border-[#1EF2C5] focus:shadow-[0_0_25px_rgba(30,242,197,0.18)] focus:outline-none rounded-2xl px-5 py-3 text-sm font-semibold text-white placeholder-[#777777] transition backdrop-blur-xl"
          />
        </div>
      </div>

      {/* 20 Club Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTeams.map((club) => (
          <div
            key={club.team.id}
            className="pl-glass-panel p-6 flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div>
              {/* Crest + Rank */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 p-2.5 bg-black/60 rounded-2xl border border-[rgba(255,255,255,0.1)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition duration-300">
                  <img
                    src={club.team.crest}
                    alt={club.team.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#1EF2C5]">
                    RANK #{club.position}
                  </span>
                  <h3 className="text-base font-extrabold text-white truncate group-hover:text-[#1EF2C5] transition">
                    {club.team.name}
                  </h3>
                  <span className="text-xs text-[#777777] font-semibold block truncate">
                    {club.team.shortName}
                  </span>
                </div>
              </div>

              {/* Record Badges */}
              <div className="grid grid-cols-3 gap-2 my-4 text-center text-xs">
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[10px] text-[#777777] uppercase font-bold">Points</span>
                  <p className="text-lg font-black text-white font-mono mt-0.5">{club.points}</p>
                </div>
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[10px] text-[#777777] uppercase font-bold">W / D / L</span>
                  <p className="text-xs font-black text-[#B8B8B8] font-mono mt-1">
                    {club.won}-{club.draw}-{club.lost}
                  </p>
                </div>
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-xl border border-[rgba(255,255,255,0.06)]">
                  <span className="text-[10px] text-[#777777] uppercase font-bold">GD</span>
                  <p className={`text-lg font-black font-mono mt-0.5 ${club.goalDifference >= 0 ? "text-[#1EF2C5]" : "text-[#FF5F57]"}`}>
                    {club.goalDifference > 0 ? `+${club.goalDifference}` : club.goalDifference}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <button
                onClick={() => navigate(`/team/${club.team.id}`)}
                className="flex-1 bg-[rgba(255,255,255,0.04)] hover:bg-[#1EF2C5] hover:text-[#050505] text-white font-black py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
              >
                <span>Club Hub</span>
                <FaArrowRight className="text-[10px]" />
              </button>
              <button
                onClick={() => navigate(`/compare?team1=${club.team.id}`)}
                className="p-3 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-white hover:text-black text-[#777777] transition"
                title="Compare Team"
              >
                <FaExchangeAlt className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;