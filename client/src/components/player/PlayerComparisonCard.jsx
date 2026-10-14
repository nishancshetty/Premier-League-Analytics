function PlayerComparisonCard({ player }) {
  if (!player) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <div className="flex items-center gap-5">

        <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-4xl">
          👤
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">
            {player.name}
          </h2>

          <p className="text-slate-400">
            {player.position}
          </p>

          <p className="text-slate-500">
            {player.team}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">Age</p>
          <h3 className="text-2xl font-bold text-white">
            {player.age ?? "--"}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">Nationality</p>
          <h3 className="text-2xl font-bold text-white">
            {player.nationality ?? "--"}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">Goals</p>
          <h3 className="text-2xl font-bold text-white">
            {player.goals ?? "--"}
          </h3>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400">Assists</p>
          <h3 className="text-2xl font-bold text-white">
            {player.assists ?? "--"}
          </h3>
        </div>

      </div>

    </div>
  );
}

export default PlayerComparisonCard;