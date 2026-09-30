import DashboardStats from "../components/dashboard/DashboardStats";
import LeagueTable from "../components/dashboard/LeagueTable";
import useLiveMatch from "../hooks/useLiveMatch";

function Home() {
  const liveMatch = useLiveMatch();

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-slate-400">
        Premier League Analytics Overview
      </p>

      {/* Live Match Card */}
      <div className="mt-6 rounded-xl bg-slate-900 p-6 text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Live Match</h2>

        {liveMatch ? (
          <>
            <div className="flex items-center justify-between text-xl font-semibold">
              <span>{liveMatch.homeTeam}</span>

              <span className="text-3xl font-bold">
                {liveMatch.homeScore} - {liveMatch.awayScore}
              </span>

              <span>{liveMatch.awayTeam}</span>
            </div>

            <div className="mt-4 flex justify-between text-slate-300">
              <span>{liveMatch.minute}'</span>

              <span>{liveMatch.status}</span>
            </div>

            <hr className="my-4 border-slate-700" />

            <h3 className="mb-2 text-lg font-semibold">Match Events</h3>

            {liveMatch.events.length === 0 ? (
              <p className="text-slate-400">No events yet.</p>
            ) : (
              <div className="space-y-2">
                {liveMatch.events.map((event, index) => (
                  <div
                    key={index}
                    className="flex justify-between rounded-md bg-slate-800 p-3"
                  >
                    <span>{event.minute}'</span>

                    <span>
                      {event.type} • {event.player}
                    </span>

                    <span>{event.team}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400">
            Waiting for live match updates...
          </p>
        )}
      </div>

      <DashboardStats />

      <LeagueTable />
    </div>
  );
}

export default Home;