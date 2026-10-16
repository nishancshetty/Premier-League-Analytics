import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FaChartBar,
  FaFutbol,
  FaShieldAlt,
  FaTrophy,
  FaFire,
  FaBalanceScale,
} from "react-icons/fa";
import { getAnalytics } from "../services/api";

const PIE_COLORS = [
  "#22d3ee",
  "#a855f7",
  "#eab308",
  "#ef4444",
  "#10b981",
  "#3b82f6",
  "#f97316",
  "#ec4899",
  "#6366f1",
  "#14b8a6",
];

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await getAnalytics();
        setAnalytics(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-slate-400">Computing League Analytics...</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center">
        <p className="text-red-400 font-bold">Failed to load league analytics.</p>
      </div>
    );
  }

  const standings = analytics.standings || [];

  // Data format for Goals chart (GF vs GA)
  const goalsData = standings.slice(0, 10).map((item) => ({
    team: item.team?.shortName || item.shortName || item.team?.name || "Club",
    Scored: item.goalsFor,
    Conceded: item.goalsAgainst,
  }));

  // Data for Points progression
  const pointsData = standings.slice(0, 10).map((item) => ({
    team: item.team?.shortName || item.shortName || item.team?.name || "Club",
    Points: item.points,
  }));

  // Data for Goal Difference
  const gdData = standings.slice(0, 10).map((item) => ({
    team: item.team?.shortName || item.shortName || item.team?.name || "Club",
    GD: item.goalDifference,
  }));

  // Pie chart for top attacking teams
  const distributionData = standings.slice(0, 8).map((item) => ({
    name: item.team?.shortName || item.team?.name || "Club",
    value: item.goalsFor,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
            <FaChartBar /> Advanced League Analytics & Visual Telemetry
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            League Analytics Hub
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Data visualizations of attack efficiency, defensive resilience, goal difference, and points trajectory.
          </p>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Goals
            </span>
            <div className="w-8 h-8 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
              <FaFutbol />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{analytics.totalGoals}</div>
          <p className="text-xs text-slate-400 mt-1">Across 20 Premier League Clubs</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Goals Per Match
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FaFire />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">{analytics.averageGoals}</div>
          <p className="text-xs text-slate-400 mt-1">High-tempo offensive benchmark</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Best Attack
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <FaTrophy />
            </div>
          </div>
          <div className="text-xl font-black text-white truncate">{analytics.bestAttack?.name}</div>
          <p className="text-xs text-purple-400 font-mono mt-1 font-bold">
            {analytics.bestAttack?.goalsFor} Goals Scored
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Best Defense
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FaShieldAlt />
            </div>
          </div>
          <div className="text-xl font-black text-white truncate">{analytics.bestDefense?.name}</div>
          <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">
            {analytics.bestDefense?.goalsAgainst} Goals Conceded
          </p>
        </div>
      </div>

      {/* Row 1: Goals Scored vs Conceded + Points Progression */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Goals Scored vs Conceded Chart */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Attacking & Defensive Output</h3>
              <p className="text-xs text-slate-400">Goals Scored (GF) vs Goals Conceded (GA)</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="team" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                />
                <Legend />
                <Bar dataKey="Scored" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Conceded" fill="#f43f5e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Points Curve */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Points Trajectory</h3>
              <p className="text-xs text-slate-400">Top 10 League Leaderboard Points</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pointsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="team" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Points"
                  stroke="#a855f7"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#c084fc" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Goal Difference Horizon + Goal Distribution Pie */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Goal Difference Horizon */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Goal Difference Differential</h3>
              <p className="text-xs text-slate-400">Net goal margin per team</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gdData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="team" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                />
                <Bar dataKey="GD" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goal Distribution Pie */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Share of League Goals</h3>
              <p className="text-xs text-slate-400">Distribution among top clubs</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={105}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {distributionData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;