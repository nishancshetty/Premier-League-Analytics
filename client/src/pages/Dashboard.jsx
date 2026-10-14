import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import ContentWrapper from "../components/layout/ContentWrapper";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import LeagueTable from "../components/dashboard/LeagueTable";
import RecentFixtures from "../components/dashboard/RecentFixtures";

import LiveMatchCard from "../components/widgets/LiveMatchCard";
import AIPrediction from "../components/widgets/AIPrediction";
import LeagueStats from "../components/widgets/LeagueStats";

import CommandCenter from "../components/command/CommandCenter";
import SystemStatus from "../components/command/SystemStatus";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />

        <ContentWrapper>

          <DashboardHero />

          <DashboardStats />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "24px",
              marginTop: "24px",
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <LeagueTable />
              <RecentFixtures />
              <CommandCenter />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
              }}
            >
              <LiveMatchCard />
              <AIPrediction />
              <LeagueStats />
              <SystemStatus />
            </div>
          </div>

        </ContentWrapper>
      </div>
    </div>
  );
}

export default Dashboard;