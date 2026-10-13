import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PointsChart({ standings }) {
  const data = standings
    .slice(0, 10)
    .map((team) => ({
      team: team.shortName,
      points: team.points,
    }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Top 10 Points
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="team" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="points"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PointsChart;