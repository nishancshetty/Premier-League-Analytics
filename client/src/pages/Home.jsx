import DashboardStats from "../components/dashboard/DashboardStats";
import LeagueTable from "../components/dashboard/LeagueTable";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-2 text-slate-400">
        Premier League Analytics Overview
      </p>

      <DashboardStats />

      <LeagueTable />
    </div>
  );
}

export default Home;