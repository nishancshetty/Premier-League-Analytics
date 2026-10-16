import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaExchangeAlt, FaTrophy, FaUsers, FaShieldAlt, FaCrown } from "react-icons/fa";
import {
  getPlayers,
  getStandings,
  comparePlayers,
  compareTeams,
} from "../services/api";

function PlayerComparison() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("team1") ? "teams" : "players"); // players or teams

  // Player comparison state
  const [playersList, setPlayersList] = useState([]);
  const [selectedP1, setSelectedP1] = useState(searchParams.get("player1") || 38101); // Haaland
  const [selectedP2, setSelectedP2] = useState(searchParams.get("player2") || 3754); // Salah
  const [playerCompData, setPlayerCompData] = useState(null);

  // Team comparison state
  const [teamsList, setTeamsList] = useState([]);
  const [selectedT1, setSelectedT1] = useState(searchParams.get("team1") || 65); // Man City
  const [selectedT2, setSelectedT2] = useState(searchParams.get("team2") || 57); // Arsenal
  const [teamCompData, setTeamCompData] = useState(null);

  const [loading, setLoading] = useState(true);

  // Load selection options
  useEffect(() => {
    async function loadSelectors() {
      try {
        const [players, standings] = await Promise.all([
          getPlayers(),
          getStandings(),
        ]);
        setPlayersList(players || []);
        setTeamsList(standings || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadSelectors();
  }, []);

  // Fetch player comparison
  useEffect(() => {
    if (mode !== "players") return;
    async function fetchPlayers() {
      setLoading(true);
      try {
        const res = await comparePlayers(selectedP1, selectedP2);
        setPlayerCompData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayers();
  }, [selectedP1, selectedP2, mode]);

  // Fetch team comparison
  useEffect(() => {
    if (mode !== "teams") return;
    async function fetchTeams() {
      setLoading(true);
      try {
        const res = await compareTeams(selectedT1, selectedT2);
        setTeamCompData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTeams();
  }, [selectedT1, selectedT2, mode]);

  const p1 = playerCompData?.player1;
  const p2 = playerCompData?.player2;
  const t1 = teamCompData?.team1;
  const t2 = teamCompData?.team2;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
            <FaExchangeAlt /> Head-to-Head Analytics Hub
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Comparison Matrix
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Side-by-side radar visualizations, stat duels, and advantage meters.
          </p>
        </div>

        {/* Mode switcher: Players vs Teams */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setMode("players")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              mode === "players"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/40 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaUsers />
            <span>Player Duel</span>
          </button>
          <button
            onClick={() => setMode("teams")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              mode === "teams"
                ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/40 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaShieldAlt />
            <span>Club Duel</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Player vs Player */}
      {mode === "players" && (
        <div className="space-y-8">
          {/* Selector Bar */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-5/12">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                Player 1 (Cyan)
              </label>
              <select
                value={selectedP1}
                onChange={(e) => setSelectedP1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                {playersList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.team} - {p.position})
                  </option>
                ))}
              </select>
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-slate-400 flex-shrink-0">
              VS
            </div>

            <div className="w-full md:w-5/12">
              <label className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
                Player 2 (Red)
              </label>
              <select
                value={selectedP2}
                onChange={(e) => setSelectedP2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-red-500 focus:outline-none"
              >
                {playersList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.team} - {p.position})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : p1 && p2 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Overlaid Dual Radar Chart */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <h3 className="text-lg font-bold text-white">Attribute Radar Comparison</h3>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> {p1.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-red-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span> {p2.name}
                    </span>
                  </div>
                </div>

                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={playerCompData.radarMetrics}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="stat" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} stroke="#334155" />
                      <Radar
                        name={p1.name}
                        dataKey="p1"
                        stroke="#22d3ee"
                        fill="#22d3ee"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name={p2.name}
                        dataKey="p2"
                        stroke="#f43f5e"
                        fill="#f43f5e"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Head-to-Head Stat Duel Table */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="text-left">
                    <p className="font-extrabold text-cyan-400 text-sm">{p1.name}</p>
                    <p className="text-[11px] text-slate-400">{p1.team}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Direct Stat Duel
                  </span>
                  <div className="text-right">
                    <p className="font-extrabold text-red-400 text-sm">{p2.name}</p>
                    <p className="text-[11px] text-slate-400">{p2.team}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  {[
                    { label: "Goals Scored", v1: p1.goals, v2: p2.goals },
                    { label: "Assists Provided", v1: p1.assists, v2: p2.assists },
                    { label: "Expected Goals (xG)", v1: Number(p1.xG || 10), v2: Number(p2.xG || 10) },
                    { label: "Pass Accuracy", v1: p1.passAccuracy || 80, v2: p2.passAccuracy || 80, unit: "%" },
                    { label: "Shots on Target", v1: p1.shotsOnTarget || 30, v2: p2.shotsOnTarget || 30 },
                    { label: "Opta Match Rating", v1: p1.rating || 8.0, v2: p2.rating || 8.0 },
                    { label: "Pace Rating", v1: p1.pace || 80, v2: p2.pace || 80 },
                    { label: "Shooting Rating", v1: p1.shooting || 85, v2: p2.shooting || 85 },
                  ].map((stat) => {
                    const p1Wins = stat.v1 > stat.v2;
                    const p2Wins = stat.v2 > stat.v1;

                    return (
                      <div
                        key={stat.label}
                        className="bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between"
                      >
                        <span
                          className={`font-mono font-bold text-sm w-16 text-left ${
                            p1Wins ? "text-cyan-400 font-black" : "text-slate-400"
                          }`}
                        >
                          {stat.v1}
                          {stat.unit}
                          {p1Wins && " 👑"}
                        </span>

                        <span className="text-slate-300 font-semibold text-center flex-1">
                          {stat.label}
                        </span>

                        <span
                          className={`font-mono font-bold text-sm w-16 text-right ${
                            p2Wins ? "text-red-400 font-black" : "text-slate-400"
                          }`}
                        >
                          {p2Wins && "👑 "}
                          {stat.v2}
                          {stat.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Mode 2: Club vs Club */}
      {mode === "teams" && (
        <div className="space-y-8">
          {/* Club Selector Bar */}
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-5/12">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                Team 1 (Home/Left)
              </label>
              <select
                value={selectedT1}
                onChange={(e) => setSelectedT1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
              >
                {teamsList.map((t) => (
                  <option key={t.team.id} value={t.team.id}>
                    #{t.position} {t.team.name} ({t.points} pts)
                  </option>
                ))}
              </select>
            </div>

            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-slate-400 flex-shrink-0">
              VS
            </div>

            <div className="w-full md:w-5/12">
              <label className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-2">
                Team 2 (Away/Right)
              </label>
              <select
                value={selectedT2}
                onChange={(e) => setSelectedT2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-purple-500 focus:outline-none"
              >
                {teamsList.map((t) => (
                  <option key={t.team.id} value={t.team.id}>
                    #{t.position} {t.team.name} ({t.points} pts)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <div className="w-10 h-10 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : t1 && t2 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              {/* Head-to-Head Banner */}
              <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-4">
                  <img src={t1.crest} alt="t1" className="w-16 h-16 object-contain" />
                  <div>
                    <span className="text-xs text-cyan-400 font-bold font-mono">Rank #{t1.position}</span>
                    <h2 className="text-2xl font-black text-white">{t1.name}</h2>
                    <p className="text-xs text-slate-400">{t1.stadium}</p>
                  </div>
                </div>

                <div className="text-center font-mono font-bold text-slate-500">
                  <span className="text-3xl font-black text-slate-300">VS</span>
                </div>

                <div className="flex items-center gap-4 flex-row-reverse text-right">
                  <img src={t2.crest} alt="t2" className="w-16 h-16 object-contain" />
                  <div>
                    <span className="text-xs text-purple-400 font-bold font-mono">Rank #{t2.position}</span>
                    <h2 className="text-2xl font-black text-white">{t2.name}</h2>
                    <p className="text-xs text-slate-400">{t2.stadium}</p>
                  </div>
                </div>
              </div>

              {/* Comparison Stat Rows */}
              <div className="space-y-3">
                {[
                  { label: "Points", v1: t1.points, v2: t2.points },
                  { label: "Goals Scored", v1: t1.goalsFor, v2: t2.goalsFor },
                  { label: "Goals Conceded", v1: t1.goalsAgainst, v2: t2.goalsAgainst, reverseWinner: true },
                  { label: "Goal Difference", v1: t1.goalDifference, v2: t2.goalDifference },
                  { label: "Matches Won", v1: t1.won, v2: t2.won },
                  { label: "Clean Sheets", v1: t1.cleanSheets || 8, v2: t2.cleanSheets || 8 },
                  { label: "Average Possession", v1: `${t1.possession || 55}%`, v2: `${t2.possession || 55}%` },
                  { label: "Passing Accuracy", v1: `${t1.passAccuracy || 85}%`, v2: `${t2.passAccuracy || 85}%` },
                ].map((row) => {
                  return (
                    <div
                      key={row.label}
                      className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 flex items-center justify-between text-sm"
                    >
                      <span className="font-mono font-bold text-cyan-400 w-24 text-left">
                        {row.v1}
                      </span>
                      <span className="font-semibold text-slate-300 text-center flex-1">
                        {row.label}
                      </span>
                      <span className="font-mono font-bold text-purple-400 w-24 text-right">
                        {row.v2}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default PlayerComparison;