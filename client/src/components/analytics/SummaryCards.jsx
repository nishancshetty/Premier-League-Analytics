import StatCard from "./StatCard";

function SummaryCards({ analytics }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

      <StatCard
        title="Teams"
        value={analytics.totalTeams}
      />

      <StatCard
        title="Goals"
        value={analytics.totalGoals}
      />

      <StatCard
        title="Average Goals"
        value={analytics.averageGoals}
      />

      <StatCard
        title="Average Points"
        value={analytics.averagePoints}
      />

    </div>
  );
}

export default SummaryCards;