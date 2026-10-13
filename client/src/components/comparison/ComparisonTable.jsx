function ComparisonTable({ comparison }) {
  if (!comparison) return null;

  const { team1, team2 } = comparison;

  const rows = [
    ["Points", team1.points, team2.points],
    ["Wins", team1.won, team2.won],
    ["Draws", team1.draw, team2.draw],
    ["Losses", team1.lost, team2.lost],
    ["Goals", team1.goalsFor, team2.goalsFor],
    ["Goals Against", team1.goalsAgainst, team2.goalsAgainst],
    ["Goal Difference", team1.goalDifference, team2.goalDifference],
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">

      <table className="w-full">

        <thead>

          <tr className="border-b border-slate-700">

            <th className="text-left py-3">
              Stat
            </th>

            <th>{team1.name}</th>

            <th>{team2.name}</th>

          </tr>

        </thead>

        <tbody>

          {rows.map(([label, a, b]) => (
            <tr
              key={label}
              className="border-b border-slate-800"
            >
              <td className="py-4 font-semibold">
                {label}
              </td>

              <td>{a}</td>

              <td>{b}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ComparisonTable;