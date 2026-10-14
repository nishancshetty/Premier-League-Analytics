function PlayerStats({ player }) {
  if (!player) return null;

  const stats = [
    {
      title: "Age",
      value: player.age ?? "--",
    },
    {
      title: "Nationality",
      value: player.nationality ?? "--",
    },
    {
      title: "Position",
      value: player.position ?? "--",
    },
    {
      title: "Shirt No.",
      value: player.shirtNumber ?? "--",
    },
    {
      title: "Appearances",
      value: player.appearances ?? "--",
    },
    {
      title: "Goals",
      value: player.goals ?? "--",
    },
    {
      title: "Assists",
      value: player.assists ?? "--",
    },
    {
      title: "Minutes",
      value: player.minutes ?? "--",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-slate-900 rounded-2xl p-6 shadow-lg"
        >
          <p className="text-slate-400 text-sm">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold text-white mt-3">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default PlayerStats;