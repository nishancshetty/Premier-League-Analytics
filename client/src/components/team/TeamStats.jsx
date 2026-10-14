function TeamStats({ team }) {
  if (!team) return null;

  const stats = [
    {
      title: "Position",
      value: team.position,
    },
    {
      title: "Points",
      value: team.points,
    },
    {
      title: "Wins",
      value: team.won,
    },
    {
      title: "Draws",
      value: team.draw,
    },
    {
      title: "Losses",
      value: team.lost,
    },
    {
      title: "Goals",
      value: team.goalsFor,
    },
    {
      title: "Goals Against",
      value: team.goalsAgainst,
    },
    {
      title: "Goal Difference",
      value: team.goalDifference,
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

          <h2 className="text-4xl font-bold text-white mt-3">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default TeamStats;