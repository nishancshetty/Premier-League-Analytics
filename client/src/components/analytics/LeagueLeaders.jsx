function LeagueLeaders({ standings }) {
  const topPoints = standings[0];

  const topGoals = [...standings].sort(
    (a, b) => b.goalsFor - a.goalsFor
  )[0];

  const topWins = [...standings].sort(
    (a, b) => b.won - a.won
  )[0];

  const bestGD = [...standings].sort(
    (a, b) => b.goalDifference - a.goalDifference
  )[0];

  const cards = [
    {
      title: "League Leaders",
      team: topPoints.name,
      value: `${topPoints.points} pts`,
    },
    {
      title: "Most Goals",
      team: topGoals.name,
      value: `${topGoals.goalsFor}`,
    },
    {
      title: "Most Wins",
      team: topWins.name,
      value: `${topWins.won}`,
    },
    {
      title: "Best Goal Difference",
      team: bestGD.name,
      value: `${bestGD.goalDifference}`,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 rounded-2xl p-6 shadow-lg"
        >
          <p className="text-slate-400 text-sm">
            {card.title}
          </p>

          <h2 className="text-xl font-bold mt-4">
            {card.team}
          </h2>

          <p className="text-3xl font-bold mt-4 text-sky-400">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default LeagueLeaders;