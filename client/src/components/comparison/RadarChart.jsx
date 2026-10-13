import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

function RadarChartComponent({ comparison }) {
  if (!comparison) return null;

  const { team1, team2 } = comparison;

  const data = [
    {
      stat: "Goals",
      team1: team1.goalsFor,
      team2: team2.goalsFor,
    },
    {
      stat: "Wins",
      team1: team1.won,
      team2: team2.won,
    },
    {
      stat: "Points",
      team1: team1.points,
      team2: team2.points,
    },
    {
      stat: "GD",
      team1: team1.goalDifference,
      team2: team2.goalDifference,
    },
    {
      stat: "Defense",
      team1: Math.max(0, 50 - team1.goalsAgainst),
      team2: Math.max(0, 50 - team2.goalsAgainst),
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Team Radar Comparison
      </h2>

      <ResponsiveContainer width="100%" height={450}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis />

          <Radar
            name={team1.name}
            dataKey="team1"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.35}
          />

          <Radar
            name={team2.name}
            dataKey="team2"
            stroke="#EF4444"
            fill="#EF4444"
            fillOpacity={0.35}
          />

          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RadarChartComponent;