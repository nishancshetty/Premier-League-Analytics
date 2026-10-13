function TeamForm({ standings }) {
  const form = ["W", "W", "D", "L", "W"];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Top 5 Teams Form
      </h2>

      {standings.slice(0, 5).map((team) => (
        <div
          key={team.id}
          className="flex justify-between items-center py-4 border-b border-slate-800"
        >
          <span className="font-semibold">
            {team.name}
          </span>

          <div className="flex gap-2">
            {form.map((result, index) => (
              <span
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  result === "W"
                    ? "bg-green-500"
                    : result === "D"
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamForm;