import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaRobot,
  FaBolt,
  FaTrophy,
  FaFutbol,
  FaBrain,
  FaChartPie,
  FaFire,
  FaShieldAlt,
} from "react-icons/fa";
import {
  getMatchPrediction,
  getSeasonForecast,
  getStandings,
} from "../services/api";

function AILab() {
  const [searchParams] = useSearchParams();
  const [teams, setTeams] = useState([]);
  const [homeTeam, setHomeTeam] = useState(searchParams.get("home") || 65); // Man City
  const [awayTeam, setAwayTeam] = useState(searchParams.get("away") || 57); // Arsenal
  const [prediction, setPrediction] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load team dropdown options & season forecast
  useEffect(() => {
    async function init() {
      try {
        const [standings, seasonData] = await Promise.all([
          getStandings(),
          getSeasonForecast().catch(() => null),
        ]);
        setTeams(standings || []);
        setForecast(seasonData);

        // Run default prediction
        const initialPred = await getMatchPrediction(homeTeam, awayTeam);
        setPrediction(initialPred);
      } catch (err) {
        console.error("AI Lab Init Error:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      const res = await getMatchPrediction(homeTeam, awayTeam);
      setPrediction(res);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setSimulating(false), 400);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-400">Initializing AI Neural Engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
            <FaBrain /> Artificial Intelligence & Predictive Modelling
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            AI Tactical Laboratory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Monte Carlo Poisson simulations, win probability distributions, and tactical battle breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs text-cyan-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Engine v2.4 Online</span>
        </div>
      </div>

      {/* Simulator Control Box */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FaRobot className="text-cyan-400" />
          Match Simulator Studio
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Home team selector */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-2">
              Home Team
            </label>
            <select
              value={homeTeam}
              onChange={(e) => setHomeTeam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              {teams.map((t) => (
                <option key={t.team.id} value={t.team.id}>
                  {t.team.name} (#{t.position})
                </option>
              ))}
            </select>
          </div>

          {/* Button in middle */}
          <div className="text-center md:col-span-1">
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
            >
              {simulating ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>Computing...</span>
                </>
              ) : (
                <>
                  <FaBolt />
                  <span>Simulate</span>
                </>
              )}
            </button>
          </div>

          {/* Away team selector */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-2">
              Away Team
            </label>
            <select
              value={awayTeam}
              onChange={(e) => setAwayTeam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              {teams.map((t) => (
                <option key={t.team.id} value={t.team.id}>
                  {t.team.name} (#{t.position})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Simulation Results Display */}
      {prediction && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Win Probabilities Gauge & Score */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Probabilistic Outcome
              </span>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                Confidence: {prediction.confidence}%
              </span>
            </div>

            {/* Scoreboard Projection */}
            <div className="flex items-center justify-between p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-center">
              <div className="flex-1">
                {prediction.homeTeam.crest && (
                  <img src={prediction.homeTeam.crest} alt="home" className="w-14 h-14 mx-auto object-contain mb-2" />
                )}
                <h3 className="font-extrabold text-base text-white">{prediction.homeTeam.name}</h3>
                <span className="text-xs text-cyan-400 font-mono font-bold">xG {prediction.homeTeam.xG}</span>
              </div>

              <div className="px-6">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  Most Likely Score
                </span>
                <div className="text-4xl sm:text-5xl font-black text-cyan-300 font-mono tracking-widest">
                  {prediction.predictedScore}
                </div>
              </div>

              <div className="flex-1">
                {prediction.awayTeam.crest && (
                  <img src={prediction.awayTeam.crest} alt="away" className="w-14 h-14 mx-auto object-contain mb-2" />
                )}
                <h3 className="font-extrabold text-base text-white">{prediction.awayTeam.name}</h3>
                <span className="text-xs text-red-400 font-mono font-bold">xG {prediction.awayTeam.xG}</span>
              </div>
            </div>

            {/* Win Probability Tri-Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-cyan-400">{prediction.homeTeam.shortName} ({prediction.homeTeam.winProb}%)</span>
                <span className="text-slate-400">Draw ({prediction.drawProb}%)</span>
                <span className="text-red-400">{prediction.awayTeam.shortName} ({prediction.awayTeam.winProb}%)</span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full flex overflow-hidden">
                <div
                  className="bg-cyan-400 h-full transition-all duration-700"
                  style={{ width: `${prediction.homeTeam.winProb}%` }}
                ></div>
                <div
                  className="bg-slate-500 h-full transition-all duration-700"
                  style={{ width: `${prediction.drawProb}%` }}
                ></div>
                <div
                  className="bg-red-500 h-full transition-all duration-700"
                  style={{ width: `${prediction.awayTeam.winProb}%` }}
                ></div>
              </div>
            </div>

            {/* Tactical Narrative */}
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-400 block mb-1 text-sm">AI Tactical Briefing:</strong>
              {prediction.tacticalInsight}
            </div>

            {/* Key Matchup Box */}
            {prediction.keyMatchup && (
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-2xl text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Key Tactical Duel to Watch
                </span>
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span className="text-cyan-400">{prediction.keyMatchup.homePlayer} ({prediction.keyMatchup.homePlayerRole})</span>
                  <span className="text-slate-500 text-[10px]">VS</span>
                  <span className="text-red-400">{prediction.keyMatchup.awayPlayer} ({prediction.keyMatchup.awayPlayerRole})</span>
                </div>
                <p className="text-slate-400 mt-1">{prediction.keyMatchup.insight}</p>
              </div>
            )}
          </div>

          {/* Right Column: Score Probabilities & Market Odds */}
          <div className="space-y-6">
            {/* Top Scorelines */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-slate-800">
                Top Likely Scorelines
              </h3>
              <div className="space-y-2.5">
                {(prediction.topScorelines || []).map((score, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                  >
                    <span className="font-mono font-black text-white text-base">
                      {score.home} - {score.away}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-cyan-400 h-full rounded-full"
                          style={{ width: `${Math.min(100, score.prob * 4)}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold text-cyan-400 w-12 text-right">
                        {score.prob}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Markets */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
              <h3 className="text-base font-bold text-white pb-2 border-b border-slate-800">
                Goal Expectations
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Over 2.5 Goals:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {prediction.over25GoalsProbability}% Probability
                  </span>
                </div>
                <div className="flex justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="text-slate-400">Both Teams to Score (BTTS):</span>
                  <span className="font-mono font-bold text-purple-400">
                    {prediction.bttsProbability}% Probability
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Season Champion Forecast */}
      {forecast && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaTrophy className="text-yellow-400" />
                AI Season Forecast: Title Race Probability
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Projected champion and European qualification chances</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {forecast.titleFavorites.map((fav, i) => (
              <div
                key={fav.team}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={fav.crest} alt={fav.team} className="w-8 h-8 object-contain" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{fav.team}</h4>
                    <span className="text-[10px] text-slate-400">Proj. {fav.projectedPoints} Pts</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400">Title Win %</span>
                    <span className="text-yellow-400 font-mono">{fav.prob}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${fav.prob}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AILab;