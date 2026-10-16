import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import {
  FaFutbol,
  FaShieldAlt,
  FaExchangeAlt,
  FaArrowLeft,
  FaStar,
  FaFire,
  FaBullseye,
} from "react-icons/fa";
import { getPlayer } from "../services/api";

function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      setLoading(true);
      try {
        const data = await getPlayer(id);
        setPlayer(data);
      } catch (err) {
        console.error("Player load error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-400">Loading Player Intel...</span>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center my-12">
        <h2 className="text-2xl font-bold text-red-400">Player Not Found</h2>
        <p className="text-slate-400 mt-2">Could not find record for player ID #{id}.</p>
        <button
          onClick={() => navigate("/players")}
          className="mt-5 bg-cyan-500 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          Back to Players Directory
        </button>
      </div>
    );
  }

  const radarData = [
    { stat: "Pace", val: player.pace || 85 },
    { stat: "Shooting", val: player.shooting || 90 },
    { stat: "Passing", val: player.passing || 80 },
    { stat: "Dribbling", val: player.dribbling || 85 },
    { stat: "Defense", val: player.defending || 45 },
    { stat: "Physical", val: player.physical || 88 },
  ];

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
        >
          <FaArrowLeft />
          <span>Back to previous</span>
        </button>
      </div>

      {/* Player Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center font-black text-3xl text-cyan-400 shadow-2xl flex-shrink-0">
              #{player.shirtNumber || 10}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                  {player.position}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Age {player.age || 26} • {player.nationality}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {player.name}
              </h1>

              <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                <FaShieldAlt className="text-cyan-400" />
                <span>{player.team}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/compare?player1=${player.id}`)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/25 transition text-sm"
          >
            <FaExchangeAlt />
            <span>Compare Head-to-Head</span>
          </button>
        </div>

        {/* 6 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Goals</span>
            <p className="text-2xl font-black text-yellow-400 font-mono mt-0.5">{player.goals}</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Assists</span>
            <p className="text-2xl font-black text-cyan-400 font-mono mt-0.5">{player.assists}</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Expected Goals (xG)</span>
            <p className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{player.xG || 14.2}</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Pass Accuracy</span>
            <p className="text-2xl font-black text-purple-400 font-mono mt-0.5">{player.passAccuracy || 84}%</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Shots on Target</span>
            <p className="text-2xl font-black text-white font-mono mt-0.5">{player.shotsOnTarget || 42}</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/60 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Opta Rating</span>
            <p className="text-2xl font-black text-cyan-300 font-mono mt-0.5">★ {player.rating || 8.4}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar chart on left + Attribute breakdown on right */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Hexagonal Radar Chart */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaBullseye className="text-cyan-400" />
              FIFA / Opta Attribute Radar
            </h3>
            <span className="text-xs font-mono font-bold text-slate-400">Scale: 0 - 100</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="stat" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#334155" />
                <Radar
                  name={player.name}
                  dataKey="val"
                  stroke="#22d3ee"
                  fill="#22d3ee"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Attribute Sliders */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <FaFire className="text-yellow-400" />
            Core Technical Ratings
          </h3>

          <div className="space-y-4 pt-1">
            {[
              { label: "Pace / Sprint Speed", value: player.pace || 85, color: "bg-cyan-400" },
              { label: "Shooting & Finishing", value: player.shooting || 90, color: "bg-yellow-400" },
              { label: "Passing & Vision", value: player.passing || 80, color: "bg-purple-400" },
              { label: "Dribbling & Agility", value: player.dribbling || 85, color: "bg-blue-400" },
              { label: "Defending & Pressing", value: player.defending || 45, color: "bg-red-400" },
              { label: "Physicality & Stamina", value: player.physical || 88, color: "bg-emerald-400" },
            ].map((attr) => (
              <div key={attr.label}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">{attr.label}</span>
                  <span className="font-mono font-bold text-white">{attr.value} / 100</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`${attr.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${attr.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80 text-xs text-slate-400 leading-relaxed">
            <strong className="text-white">Scouting Note:</strong> Elite attacking output with exceptional finishing composure and physical presence in high-leverage penalty box sequences.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;