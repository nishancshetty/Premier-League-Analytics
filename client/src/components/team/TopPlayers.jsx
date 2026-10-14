function TopPlayers({ team }) {
  if (!team) return null;

  const players = [
    {
      name: "Star Player",
      position: "Forward",
    },
    {
      name: "Captain",
      position: "Midfielder",
    },
    {
      name: "Key Defender",
      position: "Defender",
    },
    {
      name: "Goalkeeper",
      position: "Goalkeeper",
    },
  ];

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Top Players
      </h2>

      <div className="space-y-4">

        {players.map((player) => (
          <div
            key={player.name}
            className="flex justify-between items-center bg-slate-800 rounded-xl p-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-white">
                {player.name}
              </h3>

              <p className="text-slate-400">
                {player.position}
              </p>
            </div>

            <div className="text-3xl">
              ⚽
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default TopPlayers;