import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaFutbol,
  FaTrophy,
  FaUsers,
  FaRobot,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import {
  getDashboard,
  getStandings,
  getTopScorers,
  getMatchPrediction,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [standings, setStandings] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [featuredPrediction, setFeaturedPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [dash, table, scorers, pred] = await Promise.all([
          getDashboard().catch(() => null),
          getStandings().catch(() => []),
          getTopScorers().catch(() => []),
          getMatchPrediction(65, 57).catch(() => null), // Man City vs Arsenal
        ]);

        if (dash) {
          setDashboardData(dash);
        }
        setStandings(table || []);
        setTopScorers(scorers.slice(0, 5));
        setFeaturedPrediction(pred);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-extrabold text-[#1EF2C5] tracking-widest uppercase">
            Loading PL/X Intelligence...
          </span>
        </div>
      </div>
    );
  }

  const leagueLeader = standings[0] || dashboardData?.leagueLeader;
  const topScorer = topScorers[0] || dashboardData?.topScorer;

  return (
    <div className="space-y-10">
      {/* Hero Section styled identically to Landing Page */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="pl-glass-panel p-8 sm:p-12 relative overflow-hidden group shadow-2xl"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2.5">
              <span className="pl-pulse-dot"></span>
              <span className="text-xs font-black uppercase tracking-[4px] text-[#1EF2C5]">
                THE FUTURE OF FOOTBALL ANALYTICS • GW {dashboardData?.matchweek || 7}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.92] uppercase">
              BEYOND <br />
              THE <span className="pl-text-stroke">PITCH.</span>
            </h1>

            <p className="text-[#B8B8B8] text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
              Experience Premier League football through artificial intelligence, tactical analytics,
              and real-time live telemetry directly synced from the pitch.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate("/ai")}
                className="pl-btn-primary flex items-center gap-2.5"
              >
                <FaRobot />
                <span>ENTER AI LAB →</span>
              </button>

              <button
                onClick={() => navigate("/fixtures")}
                className="pl-btn-glass flex items-center gap-2.5"
              >
                <FaFutbol className="text-[#1EF2C5]" />
                <span>VIEW FIXTURES</span>
              </button>
            </div>
          </div>

          {/* Model Confidence Box */}
          <div className="bg-[rgba(5,5,5,0.7)] border border-[rgba(255,255,255,0.08)] rounded-3xl p-6 min-w-[260px] shadow-2xl backdrop-blur-2xl">
            <span className="text-[10px] font-black text-[#777777] uppercase tracking-[3px] block mb-1">
              PREDICTION ENGINE
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#1EF2C5] font-mono tracking-tight">92.4%</span>
              <span className="text-xs text-[#B8B8B8] font-bold">Confidence</span>
            </div>
            <div className="w-full bg-[rgba(255,255,255,0.06)] h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#1EF2C5] h-full rounded-full w-[92.4%] shadow-[0_0_15px_#1EF2C5]"></div>
            </div>
            <p className="text-[11px] text-[#777777] font-semibold mt-3">
              Calibrated with latest Opta telemetry and Monte Carlo Poisson models.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4 Stat Metric Cards with Bold Fonts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="pl-glass-panel p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-[#777777] uppercase tracking-[2px]">
              Matchweek
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#1EF2C5]/10 border border-[#1EF2C5]/20 flex items-center justify-center text-[#1EF2C5]">
              <FaTrophy />
            </div>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
            GW 7
          </div>
          <p className="text-xs font-bold text-[#1EF2C5] mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1EF2C5] animate-pulse"></span>
            2025/26 Season Active
          </p>
        </div>

        {/* Metric 2 */}
        <div className="pl-glass-panel p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-[#777777] uppercase tracking-[2px]">
              Goals Scored
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#1EF2C5]/10 border border-[#1EF2C5]/20 flex items-center justify-center text-[#1EF2C5]">
              <FaFutbol />
            </div>
          </div>
          <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
            {dashboardData?.totalGoals || 198}
          </div>
          <p className="text-xs font-bold text-[#B8B8B8] mt-2">
            Avg <span className="text-[#1EF2C5] font-black">{dashboardData?.averageGoals || "2.83"}</span> goals / match
          </p>
        </div>

        {/* Metric 3 */}
        <div className="pl-glass-panel p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-[#777777] uppercase tracking-[2px]">
              Table Leader
            </span>
            <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <FaTrophy />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white truncate flex items-center gap-2.5">
            {leagueLeader?.team?.crest && (
              <img src={leagueLeader.team.crest} alt="crest" className="w-7 h-7 object-contain" />
            )}
            <span className="truncate">{leagueLeader?.team?.shortName || leagueLeader?.name || "Man City"}</span>
          </div>
          <p className="text-xs font-bold text-[#B8B8B8] mt-2">
            <span className="text-[#1EF2C5] font-black">{leagueLeader?.points || 19}</span> pts • 1st Position
          </p>
        </div>

        {/* Metric 4 */}
        <div className="pl-glass-panel p-6 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-[#777777] uppercase tracking-[2px]">
              Golden Boot
            </span>
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FaUsers />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white truncate">
            {topScorer?.name || "Erling Haaland"}
          </div>
          <p className="text-xs font-bold text-[#B8B8B8] mt-2">
            <span className="text-[#1EF2C5] font-black">{topScorer?.goals || 28}</span> Goals ({topScorer?.team || "Man City"})
          </p>
        </div>
      </div>

      {/* Main Grid: Left Column + Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-8">
          {/* League Standings Preview */}
          <div className="pl-glass-panel p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <FaTrophy className="text-[#1EF2C5] text-lg" />
                  Premier League Table
                </h2>
                <p className="text-xs font-bold text-[#777777] uppercase tracking-wider mt-1">Top 6 European Qualification</p>
              </div>
              <Link
                to="/standings"
                className="text-xs font-black text-[#1EF2C5] hover:text-[#42FFD6] flex items-center gap-2 transition uppercase tracking-wider"
              >
                <span>View Full 20 Clubs</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#777777] text-xs font-black uppercase tracking-[2px] border-b border-[rgba(255,255,255,0.08)] text-left">
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Club</th>
                    <th className="py-3 px-3 text-center">P</th>
                    <th className="py-3 px-3 text-center">W</th>
                    <th className="py-3 px-3 text-center">D</th>
                    <th className="py-3 px-3 text-center">L</th>
                    <th className="py-3 px-3 text-center">GD</th>
                    <th className="py-3 px-3 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.05)]">
                  {standings.slice(0, 6).map((item) => (
                    <tr
                      key={item.team.id}
                      onClick={() => navigate(`/team/${item.team.id}`)}
                      className="hover:bg-[rgba(255,255,255,0.04)] cursor-pointer transition duration-200"
                    >
                      <td className="py-4 px-3 font-black text-xs text-[#777777]">
                        <span
                          className={`w-7 h-7 rounded-xl inline-flex items-center justify-center font-bold font-mono ${
                            item.position <= 4
                              ? "bg-[rgba(30,242,197,0.15)] text-[#1EF2C5] border border-[rgba(30,242,197,0.3)]"
                              : "text-[#777777]"
                          }`}
                        >
                          {item.position}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.team.crest}
                            alt={item.team.name}
                            className="w-7 h-7 object-contain"
                          />
                          <span className="font-extrabold text-white hover:text-[#1EF2C5] transition text-sm">
                            {item.team.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center text-[#B8B8B8] font-bold font-mono">{item.playedGames}</td>
                      <td className="py-4 px-3 text-center text-white font-black font-mono">{item.won}</td>
                      <td className="py-4 px-3 text-center text-[#777777] font-bold font-mono">{item.draw}</td>
                      <td className="py-4 px-3 text-center text-[#777777] font-bold font-mono">{item.lost}</td>
                      <td className="py-4 px-3 text-center font-mono font-black text-white">
                        {item.goalDifference > 0 ? `+${item.goalDifference}` : item.goalDifference}
                      </td>
                      <td className="py-4 px-3 text-center font-black text-[#1EF2C5] font-mono text-lg">
                        {item.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* High-Impact Fixtures */}
          <div className="pl-glass-panel p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
                  <FaFutbol className="text-[#1EF2C5] text-lg" />
                  Upcoming Matchweek Schedule
                </h2>
                <p className="text-xs font-bold text-[#777777] uppercase tracking-wider mt-1">High-Profile Premier League Clashes</p>
              </div>
              <Link
                to="/fixtures"
                className="text-xs font-black text-[#1EF2C5] hover:text-[#42FFD6] flex items-center gap-2 transition uppercase tracking-wider"
              >
                <span>Full Calendar</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {(dashboardData?.upcomingFixtures || []).slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className="bg-[rgba(5,5,5,0.6)] border border-[rgba(255,255,255,0.08)] hover:border-[#1EF2C5] rounded-3xl p-5 transition duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between text-xs text-[#777777] mb-3 font-bold">
                    <span className="text-[#B8B8B8] font-black uppercase tracking-wider">
                      Matchweek {m.matchday || 8}
                    </span>
                    <span>
                      {m.utcDate ? new Date(m.utcDate).toLocaleDateString([], { month: "short", day: "numeric" }) : "Upcoming"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between my-3">
                    <div className="flex items-center gap-3 flex-1">
                      {m.homeTeam?.crest && (
                        <img src={m.homeTeam.crest} alt="home" className="w-8 h-8 object-contain" />
                      )}
                      <span className="font-extrabold text-sm text-white truncate">
                        {m.homeTeam?.shortName || m.homeTeam?.name}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-xs font-mono font-black text-[#1EF2C5]">
                      VS
                    </span>

                    <div className="flex items-center gap-3 flex-1 justify-end">
                      <span className="font-extrabold text-sm text-white truncate text-right">
                        {m.awayTeam?.shortName || m.awayTeam?.name}
                      </span>
                      {m.awayTeam?.crest && (
                        <img src={m.awayTeam.crest} alt="away" className="w-8 h-8 object-contain" />
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/ai?home=${m.homeTeam?.id || 65}&away=${m.awayTeam?.id || 57}`)}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-[rgba(30,242,197,0.1)] hover:bg-[#1EF2C5] hover:text-[#050505] text-[#1EF2C5] border border-[rgba(30,242,197,0.3)] font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition duration-300"
                  >
                    <FaRobot />
                    <span>Run AI Simulation</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Broadcast Card & AI Spotlight */}
        <div className="space-y-8">
          {/* Featured Matchweek Clash Card */}
          <div className="pl-glass-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 bg-[#1EF2C5]/10 text-[#1EF2C5] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-[#1EF2C5]/30">
                <span className="w-2 h-2 rounded-full bg-[#1EF2C5] animate-pulse"></span>
                <span>MATCHWEEK 7 CLASH</span>
              </div>
              <span className="text-[#1EF2C5] font-mono font-black text-xs bg-black/60 px-3 py-1 rounded-xl border border-[rgba(255,255,255,0.1)]">
                SUMMIT CLASH
              </span>
            </div>

            <div className="flex items-center justify-between my-6">
              <div className="text-center flex-1">
                <img
                  src="https://crests.football-data.org/65.png"
                  alt="Man City"
                  className="w-14 h-14 mx-auto object-contain mb-2"
                />
                <h3 className="font-black text-sm text-white">
                  Man City
                </h3>
                <span className="text-[10px] font-bold text-[#1EF2C5] uppercase tracking-wider">#1 • 18 PTS</span>
              </div>

              <div className="px-3 text-center">
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-widest">
                  VS
                </div>
                <span className="text-[10px] text-[#1EF2C5] font-bold uppercase tracking-widest mt-1 block font-mono">
                  xG 3.47 - 1.73
                </span>
              </div>

              <div className="text-center flex-1">
                <img
                  src="https://crests.football-data.org/57.png"
                  alt="Arsenal"
                  className="w-14 h-14 mx-auto object-contain mb-2"
                />
                <h3 className="font-black text-sm text-white">
                  Arsenal
                </h3>
                <span className="text-[10px] font-bold text-[#FF5F57] uppercase tracking-wider">#2 • 15 PTS</span>
              </div>
            </div>

            {/* Projected Possession Bar */}
            <div className="space-y-2 mt-5 pt-5 border-t border-[rgba(255,255,255,0.08)] text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-[#1EF2C5] font-mono">62% Possession</span>
                <span className="text-[#777777] uppercase tracking-wider text-[11px]">AI Territory Projection</span>
                <span className="text-[#FF5F57] font-mono">38% Possession</span>
              </div>
              <div className="w-full h-2.5 bg-black/60 rounded-full flex overflow-hidden">
                <div
                  className="bg-[#1EF2C5] h-full transition-all duration-500"
                  style={{ width: "62%" }}
                ></div>
                <div
                  className="bg-[#FF5F57] h-full transition-all duration-500"
                  style={{ width: "38%" }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => navigate("/ai?home=65&away=57")}
              className="mt-6 w-full pl-btn-primary flex items-center justify-center gap-2 text-xs py-3.5"
            >
              <FaRobot />
              <span>SIMULATE IN AI LAB</span>
              <FaArrowRight />
            </button>
          </div>

          {/* AI Spotlight */}
          {featuredPrediction && (
            <div className="pl-glass-panel p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center gap-2">
                  <FaRobot className="text-[#1EF2C5]" />
                  <h3 className="text-base font-black text-white uppercase tracking-wider">AI Supercomputer</h3>
                </div>
                <span className="text-xs text-[#1EF2C5] font-mono font-black">
                  {featuredPrediction.confidence}% CONF.
                </span>
              </div>

              <div className="text-center py-3">
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#777777] mb-1">
                  Predicted Scoreline
                </p>
                <div className="text-4xl font-black text-white font-mono tracking-widest pl-text-stroke">
                  {featuredPrediction.predictedScore}
                </div>
                <p className="text-xs font-bold text-white mt-2">
                  {featuredPrediction.homeTeam.shortName} vs {featuredPrediction.awayTeam.shortName}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)] text-xs">
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-2xl">
                  <p className="text-[#777777] text-[10px] font-bold uppercase">Home Win</p>
                  <p className="font-black text-[#1EF2C5] text-base font-mono mt-1">{featuredPrediction.homeTeam.winProb}%</p>
                </div>
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-2xl">
                  <p className="text-[#777777] text-[10px] font-bold uppercase">Draw</p>
                  <p className="font-black text-white text-base font-mono mt-1">{featuredPrediction.drawProb}%</p>
                </div>
                <div className="bg-[rgba(5,5,5,0.6)] p-2.5 rounded-2xl">
                  <p className="text-[#777777] text-[10px] font-bold uppercase">Away Win</p>
                  <p className="font-black text-[#FF5F57] text-base font-mono mt-1">{featuredPrediction.awayTeam.winProb}%</p>
                </div>
              </div>

              <button
                onClick={() => navigate("/ai")}
                className="mt-5 w-full pl-btn-glass text-xs py-3 block text-center"
              >
                CUSTOM AI SIMULATION →
              </button>
            </div>
          )}

          {/* Top Goalscorers List */}
          <div className="pl-glass-panel p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[rgba(255,255,255,0.08)]">
              <h3 className="text-base font-black text-white flex items-center gap-2 uppercase tracking-wider">
                <FaFutbol className="text-[#1EF2C5]" />
                Golden Boot Race
              </h3>
              <Link to="/players" className="text-xs text-[#1EF2C5] font-black uppercase tracking-wider hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {topScorers.map((s, idx) => (
                <div
                  key={s.id || idx}
                  onClick={() => navigate(`/player/${s.id}`)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[rgba(255,255,255,0.04)] cursor-pointer transition text-xs"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono font-black text-[#777777] w-4 text-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="font-extrabold text-white text-sm">{s.name}</p>
                      <p className="text-[#777777] text-[11px] font-semibold">{s.team}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-[#1EF2C5] font-mono">
                      {s.goals}
                    </span>
                    <span className="text-[#777777] text-[9px] block uppercase font-bold tracking-wider">Goals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;