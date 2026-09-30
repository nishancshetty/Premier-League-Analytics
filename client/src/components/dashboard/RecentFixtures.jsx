import recentFixtures from "../../data/recentFixtures";

function RecentFixtures() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-semibold">Recent Fixtures</h2>
      </div>

      <div className="divide-y divide-slate-800">
        {recentFixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="p-5 hover:bg-slate-800 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {fixture.home} vs {fixture.away}
                </p>

                <p className="text-sm text-slate-400 mt-1">
                  {fixture.date}
                </p>
              </div>

              <span className="font-bold text-lg">
                {fixture.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentFixtures;