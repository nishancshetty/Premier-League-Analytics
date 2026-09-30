import StatCard from "./StatCard";

const stats = [
  {
    title: "Premier League Clubs",
    value: "20",
  },
  {
    title: "Players",
    value: "560",
  },
  {
    title: "Matches Played",
    value: "380",
  },
  {
    title: "Goals Scored",
    value: "1,084",
  },
];

function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-6 mt-8">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
}

export default DashboardStats;