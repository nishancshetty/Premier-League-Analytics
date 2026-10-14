function TeamHeader({ team }) {
  if (!team) return null;

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-lg flex items-center gap-8">

      <img
        src={team.crest}
        alt={team.name}
        className="w-28 h-28 object-contain bg-white rounded-full p-3"
      />

      <div>
        <h1 className="text-5xl font-bold text-white">
          {team.name}
        </h1>

        <p className="text-slate-400 mt-3">
          Premier League Club
        </p>
      </div>

    </div>
  );
}

export default TeamHeader;