import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#84CC16",
  "#EC4899",
  "#6366F1",
];

function GoalsDistributionChart({ standings }) {
  const data = standings.slice(0, 10).map((team) => ({
    name: team.shortName,
    value: team.goalsFor,
  }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Goal Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GoalsDistributionChart;