import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function GoalsChart({ standings }) {
  const data = standings
    .slice(0, 10)
    .map((team) => ({
      team: team.shortName,
      goals: team.goalsFor,
    }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Top 10 Goal Scorers (Teams)
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="team" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="goals"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default GoalsChart;