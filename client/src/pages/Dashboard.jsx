import "./Dashboard.css";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import LeagueTable from "../components/dashboard/LeagueTable";
import RecentFixtures from "../components/dashboard/RecentFixtures";

import LiveMatchCard from "../components/widgets/LiveMatchCard";
import AIPrediction from "../components/widgets/AIPrediction";
import LeagueStats from "../components/widgets/LeagueStats";

import CommandCenter from "../components/command/CommandCenter";
import SystemStatus from "../components/command/SystemStatus";

import AnalyticsPanel from "../components/analytics/AnalyticsPanel";

function Dashboard() {
  return (
    <div className="dashboard-page">

      <Sidebar />

      <div className="dashboard-main">

        <Topbar />

        <div className="dashboard-content">

          <DashboardHero />

          <DashboardStats />

          <div className="dashboard-grid">

            <div className="dashboard-left">

              <div className="dashboard-section">
                <LeagueTable />
              </div>

              <div className="dashboard-section">
                <RecentFixtures />
              </div>

              <div className="dashboard-section">
                <CommandCenter />
              </div>

              <div className="dashboard-section">
                <AnalyticsPanel />
              </div>

            </div>

            <div className="dashboard-right">

              <div className="dashboard-section">
                <LiveMatchCard />
              </div>

              <div className="dashboard-section">
                <AIPrediction />
              </div>

              <div className="dashboard-section">
                <LeagueStats />
              </div>

              <div className="dashboard-section">
                <SystemStatus />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;