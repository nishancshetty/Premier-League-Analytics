import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

function PlayerRadar({ player }) {
  if (!player) return null;

  const data = [
    {
      stat: "Pace",
      value: player.pace ?? 0,
    },
    {
      stat: "Shooting",
      value: player.shooting ?? 0,
    },
    {
      stat: "Passing",
      value: player.passing ?? 0,
    },
    {
      stat: "Dribbling",
      value: player.dribbling ?? 0,
    },
    {
      stat: "Defense",
      value: player.defending ?? 0,
    },
    {
      stat: "Physical",
      value: player.physical ?? 0,
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Player Attributes
      </h2>

      <ResponsiveContainer width="100%" height={450}>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis domain={[0, 100]} />

          <Radar
            name={player.name}
            dataKey="value"
            stroke="#38BDF8"
            fill="#38BDF8"
            fillOpacity={0.45}
          />

          <Legend />
        </RadarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PlayerRadar;