import { useEffect, useState } from "react";
import api from "../services/api";

import SummaryCards from "../components/analytics/SummaryCards";
import GoalsChart from "../components/analytics/GoalsChart";
import PointsChart from "../components/analytics/PointsChart";
import GoalDifferenceChart from "../components/analytics/GoalDifferenceChart";
import GoalsDistributionChart from "../components/analytics/GoalsDistributionChart";
import LeagueLeaders from "../components/analytics/LeagueLeaders";
import TeamForm from "../components/analytics/TeamForm";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl text-white">
        Loading Analytics...
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Premier League Analytics
        </h1>

        <p className="text-slate-400 mt-3">
          Live league insights and statistics
        </p>
      </div>

      <SummaryCards analytics={analytics} />

      <LeagueLeaders standings={analytics.standings} />

      <div className="grid lg:grid-cols-2 gap-8 mt-10">
        <GoalsChart standings={analytics.standings} />
        <PointsChart standings={analytics.standings} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">
        <GoalDifferenceChart standings={analytics.standings} />
        <GoalsDistributionChart standings={analytics.standings} />
      </div>

      <TeamForm standings={analytics.standings} />

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-5">
            Best Attack
          </h2>

          <h3 className="text-3xl font-semibold">
            {analytics.bestAttack.name}
          </h3>

          <p className="text-slate-400 mt-3">
            Goals Scored
          </p>

          <p className="text-5xl font-bold mt-2">
            {analytics.bestAttack.goalsFor}
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-5">
            Best Defense
          </h2>

          <h3 className="text-3xl font-semibold">
            {analytics.bestDefense.name}
          </h3>

          <p className="text-slate-400 mt-3">
            Goals Conceded
          </p>

          <p className="text-5xl font-bold mt-2">
            {analytics.bestDefense.goalsAgainst}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Analytics;