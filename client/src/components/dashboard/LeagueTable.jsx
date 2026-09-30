const teams = [
  {
    position: 1,
    club: "Manchester City",
    played: 38,
    points: 91,
  },
  {
    position: 2,
    club: "Arsenal",
    played: 38,
    points: 89,
  },
  {
    position: 3,
    club: "Liverpool",
    played: 38,
    points: 82,
  },
  {
    position: 4,
    club: "Chelsea",
    played: 38,
    points: 72,
  },
];

function LeagueTable() {
  return (
    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-xl">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-semibold">
          Premier League Table
        </h2>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-slate-400 border-b border-slate-800">
            <th className="text-left p-4">#</th>
            <th className="text-left p-4">Club</th>
            <th className="text-center p-4">P</th>
            <th className="text-center p-4">Pts</th>
          </tr>
        </thead>

        <tbody>
          {teams.map((team) => (
            <tr
              key={team.position}
              className="border-b border-slate-800 hover:bg-slate-800 transition-colors"
            >
              <td className="p-4">{team.position}</td>
              <td className="p-4">{team.club}</td>
              <td className="text-center p-4">{team.played}</td>
              <td className="text-center p-4 font-semibold">
                {team.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeagueTable;