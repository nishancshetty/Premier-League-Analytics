function PlayerHeader({ player }) {
  if (!player) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg flex items-center gap-8">

      <div className="w-28 h-28 rounded-full bg-slate-700 flex items-center justify-center text-5xl">
        👤
      </div>

      <div>

        <h1 className="text-5xl font-bold text-white">
          {player.name}
        </h1>

        <p className="text-slate-400 mt-2">
          {player.position}
        </p>

        <p className="text-slate-500 mt-1">
          {player.team}
        </p>

      </div>

    </div>
  );
}

export default PlayerHeader;