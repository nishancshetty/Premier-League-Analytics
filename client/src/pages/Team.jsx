import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaUsers,
  FaRobot,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaUserTie,
  FaChartPie,
} from "react-icons/fa";
import { getTeam, getTeamMatches } from "../services/api";

function Team() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeamData() {
      setLoading(true);
      try {
        const [teamData, matchData] = await Promise.all([
          getTeam(id).catch(() => null),
          getTeamMatches(id).catch(() => []),
        ]);
        setTeam(teamData);
        setMatches(matchData || []);
      } catch (err) {
        console.error("Team page error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTeamData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-extrabold text-[#1EF2C5] tracking-widest uppercase">
            Loading Club Telemetry...
          </span>
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="pl-glass-panel p-12 text-center my-12">
        <h2 className="text-2xl font-black text-[#FF5F57]">Club Not Found</h2>
        <p className="text-[#B8B8B8] mt-2">Could not retrieve information for club #{id}.</p>
        <button
          onClick={() => navigate("/teams")}
          className="mt-6 pl-btn-primary"
        >
          BACK TO CLUBS DIRECTORY
        </button>
      </div>
    );
  }

  const squadByPosition = {
    Goalkeepers: (team.squad || []).filter((p) => p.position === "Goalkeeper"),
    Defenders: (team.squad || []).filter((p) => p.position === "Defence" || p.position === "Defender"),
    Midfielders: (team.squad || []).filter((p) => p.position === "Midfield" || p.position === "Midfielder"),
    Forwards: (team.squad || []).filter((p) => p.position === "Offence" || p.position === "Forward"),
  };

  const standingsRow = team.standings || {
    position: team.position || 1,
    points: team.points || 19,
    won: team.won || 6,
    draw: team.draw || 1,
    lost: team.lost || 0,
    goalsFor: team.goalsFor || 19,
    goalsAgainst: team.goalsAgainst || 7,
    goalDifference: team.goalDifference || 12,
  };

  return (
    <div className="space-y-10">
      {/* Club Banner Header styled like Landing Page */}
      <div className="pl-glass-panel p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 p-3 bg-black/60 rounded-3xl border border-[rgba(255,255,255,0.12)] shadow-2xl flex items-center justify-center flex-shrink-0">
              <img
                src={team.crest}
                alt={team.name}
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-black uppercase tracking-[3px] text-[#1EF2C5] bg-[rgba(30,242,197,0.1)] border border-[rgba(30,242,197,0.3)] px-3 py-1 rounded-full">
                  Premier League
                </span>
                <span className="text-xs text-[#777777] font-bold">Est. {team.founded || 1890}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
                {team.name}
              </h1>

              <div className="flex flex-wrap items-center gap-5 text-xs text-[#B8B8B8] font-bold mt-3">
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#1EF2C5]" />
                  {team.venue || "Stadium"} ({team.capacity?.toLocaleString() || "50,000"} seats)
                </span>
                <span className="flex items-center gap-2">
                  <FaUserTie className="text-[#1EF2C5]" />
                  Manager: <strong className="text-white">{team.manager || "Head Coach"}</strong>
                </span>
                <span className="flex items-center gap-2">
                  <FaShieldAlt className="text-[#1EF2C5]" />
                  Colors: <strong className="text-white">{team.clubColors || "Blue / White"}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/compare?team1=${team.id}`)}
              className="pl-btn-glass text-xs py-3 px-6"
            >
              COMPARE CLUB
            </button>
            <button
              onClick={() => navigate(`/ai?home=${team.id}`)}
              className="pl-btn-primary text-xs py-3 px-6"
            >
              SIMULATE MATCH
            </button>
          </div>
        </div>

        {/* 6 Metric Badges with Bold Fonts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10 pt-8 border-t border-[rgba(255,255,255,0.08)]">
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">Position</span>
            <p className="text-3xl font-black text-[#1EF2C5] font-mono mt-1">#{standingsRow.position}</p>
          </div>
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">Points</span>
            <p className="text-3xl font-black text-white font-mono mt-1">{standingsRow.points}</p>
          </div>
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">W - D - L</span>
            <p className="text-lg font-black text-white font-mono mt-2">
              {standingsRow.won}-{standingsRow.draw}-{standingsRow.lost}
            </p>
          </div>
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">Goal Diff</span>
            <p className={`text-3xl font-black font-mono mt-1 ${standingsRow.goalDifference >= 0 ? "text-[#1EF2C5]" : "text-[#FF5F57]"}`}>
              {standingsRow.goalDifference > 0 ? `+${standingsRow.goalDifference}` : standingsRow.goalDifference}
            </p>
          </div>
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">Avg Possession</span>
            <p className="text-3xl font-black text-white font-mono mt-1">{team.possessionAvg || 56}%</p>
          </div>
          <div className="bg-[rgba(5,5,5,0.6)] p-4 rounded-2xl border border-[rgba(255,255,255,0.08)] text-center">
            <span className="text-[10px] text-[#777777] uppercase font-black tracking-widest">Clean Sheets</span>
            <p className="text-3xl font-black text-[#1EF2C5] font-mono mt-1">{team.cleanSheets || 8}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-1.5 rounded-2xl w-fit">
        {[
          { key: "overview", label: "Overview & Analytics" },
          { key: "squad", label: `Squad Roster (${team.squad?.length || 0})` },
          { key: "fixtures", label: `Schedule & Results (${matches.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
              activeTab === tab.key
                ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                : "text-[#B8B8B8] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="pl-glass-panel p-8 shadow-2xl space-y-5">
            <h3 className="text-xl font-black text-white flex items-center gap-2.5 uppercase tracking-wider">
              <FaChartPie className="text-[#1EF2C5]" />
              Tactical Profile & Style
            </h3>

            <div className="space-y-5 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#B8B8B8]">Preferred Formation</span>
                  <span className="text-[#1EF2C5] font-mono font-black">{team.formation || "4-3-3"}</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.08)] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#1EF2C5] h-full w-[85%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#B8B8B8]">Passing Accuracy</span>
                  <span className="text-white font-mono font-black">{team.passAccuracyAvg || 88}%</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.08)] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#1EF2C5] h-full" style={{ width: `${team.passAccuracyAvg || 88}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#B8B8B8]">Expected Goals (xG)</span>
                  <span className="text-[#1EF2C5] font-mono font-black">{team.xG || 55.4}</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.08)] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#1EF2C5] h-full w-[78%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-[#B8B8B8]">Expected Goals Conceded (xGA)</span>
                  <span className="text-[#FF5F57] font-mono font-black">{team.xGA || 24.2}</span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.08)] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#FF5F57] h-full w-[35%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)] text-xs text-[#B8B8B8] leading-relaxed font-medium">
              <strong className="text-white font-black block mb-1">Tactical Analysis:</strong> Under {team.manager || "the head coach"}, {team.name} executes a relentless high-pressing system with inverted wingers and rapid attacking transitions.
            </div>
          </div>

          <div className="pl-glass-panel p-8 shadow-2xl space-y-5">
            <h3 className="text-xl font-black text-white flex items-center gap-2.5 uppercase tracking-wider">
              <FaMapMarkerAlt className="text-[#1EF2C5]" />
              Stadium & Details
            </h3>

            <div className="space-y-4 pt-2 text-xs font-bold">
              <div className="flex justify-between p-4 rounded-2xl bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)]">
                <span className="text-[#777777]">Stadium / Venue:</span>
                <span className="text-white font-extrabold">{team.venue || "Stadium"}</span>
              </div>

              <div className="flex justify-between p-4 rounded-2xl bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)]">
                <span className="text-[#777777]">Capacity:</span>
                <span className="text-[#1EF2C5] font-mono font-black">{team.capacity?.toLocaleString() || "50,000"} seats</span>
              </div>

              <div className="flex justify-between p-4 rounded-2xl bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)]">
                <span className="text-[#777777]">Club Colors:</span>
                <span className="text-white font-extrabold">{team.clubColors || "Club Colors"}</span>
              </div>

              <div className="flex justify-between p-4 rounded-2xl bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)]">
                <span className="text-[#777777]">Official Portal:</span>
                <a
                  href={team.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1EF2C5] font-black hover:underline"
                >
                  Visit Website ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Squad Tab */}
      {activeTab === "squad" && (
        <div className="space-y-8">
          {Object.entries(squadByPosition).map(([category, players]) => {
            if (players.length === 0) return null;

            return (
              <div key={category} className="pl-glass-panel p-8 shadow-2xl">
                <h3 className="text-lg font-black text-white mb-6 pb-3 border-b border-[rgba(255,255,255,0.08)] flex items-center gap-2.5 uppercase tracking-wider">
                  <FaUsers className="text-[#1EF2C5]" />
                  {category} ({players.length})
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {players.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigate(`/player/${p.id}`)}
                      className="bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)] hover:border-[#1EF2C5] rounded-3xl p-5 cursor-pointer transition duration-300 flex items-center gap-4 group shadow-lg"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] flex items-center justify-center font-black text-[#1EF2C5] text-xl flex-shrink-0 group-hover:scale-105 transition">
                        #{p.shirtNumber || "#"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-extrabold text-white text-base truncate group-hover:text-[#1EF2C5] transition">
                          {p.name}
                        </h4>
                        <p className="text-xs text-[#777777] font-semibold">
                          {p.nationality} • {p.position}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs font-mono font-bold">
                          <span className="text-[#1EF2C5]">{p.goals ?? 0} Goals</span>
                          <span className="text-white">{p.assists ?? 0} Assists</span>
                          <span className="text-yellow-400">★ {p.rating || 7.8}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Fixtures Tab */}
      {activeTab === "fixtures" && (
        <div className="grid md:grid-cols-2 gap-5">
          {matches.map((m) => (
            <div
              key={m.id}
              className="pl-glass-panel p-5 flex items-center justify-between"
            >
              <div className="flex-1 min-w-0 flex items-center gap-3">
                {m.homeTeam?.crest && <img src={m.homeTeam.crest} alt="home" className="w-8 h-8 object-contain flex-shrink-0" />}
                <span className="font-extrabold text-sm text-white truncate">{m.homeTeam?.shortName}</span>
              </div>

              <div className="px-3 flex-shrink-0 text-center">
                {m.status === "FINISHED" ? (
                  <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 whitespace-nowrap">
                    <span className="font-black text-white font-mono text-sm sm:text-base tabular-nums">
                      {m.score?.fullTime?.home ?? 0}
                    </span>
                    <span className="text-xs font-black text-[#1EF2C5] opacity-75">:</span>
                    <span className="font-black text-white font-mono text-sm sm:text-base tabular-nums">
                      {m.score?.fullTime?.away ?? 0}
                    </span>
                  </div>
                ) : (
                  <div className="px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 whitespace-nowrap">
                    <span className="text-xs text-[#1EF2C5] font-mono font-black">VS</span>
                  </div>
                )}
                <span className="text-[9px] text-[#777777] block font-bold uppercase mt-1 tracking-wider">{m.status}</span>
              </div>

              <div className="flex-1 min-w-0 flex items-center justify-end gap-3">
                <span className="font-extrabold text-sm text-white truncate text-right">{m.awayTeam?.shortName}</span>
                {m.awayTeam?.crest && <img src={m.awayTeam.crest} alt="away" className="w-8 h-8 object-contain flex-shrink-0" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Team;