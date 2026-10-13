import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function GoalDifferenceChart({ standings }) {
  const data = standings
    .slice(0, 10)
    .map((team) => ({
      team: team.shortName,
      gd: team.goalDifference,
    }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Goal Difference
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="team" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="gd" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default GoalDifferenceChart;
