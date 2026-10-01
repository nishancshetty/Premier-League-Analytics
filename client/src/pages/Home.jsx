import { FaFutbol, FaTrophy, FaUsers, FaBolt } from "react-icons/fa";

import StatCard from "../components/ui/StatCard";
import LeagueTable from "../components/dashboard/LeagueTable";

function Home() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Premier League Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Live analytics and match insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Live Matches"
          value="3"
          subtitle="Currently in progress"
          icon={<FaBolt />}
          color="text-red-400"
        />

        <StatCard
          title="Teams"
          value="20"
          subtitle="Premier League Clubs"
          icon={<FaUsers />}
          color="text-green-400"
        />

        <StatCard
          title="Goals Today"
          value="12"
          subtitle="Across all matches"
          icon={<FaFutbol />}
          color="text-yellow-400"
        />

        <StatCard
          title="Matchweek"
          value="8"
          subtitle="2026 / 27 Season"
          icon={<FaTrophy />}
          color="text-blue-400"
        />

      </div>

      <LeagueTable />

    </div>
  );
}

export default Home;