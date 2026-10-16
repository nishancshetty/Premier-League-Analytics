import StatCard from "../ui/StatCard";
import {
  FaFutbol,
  FaFire,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";

function DashboardStats() {
  const stats = [
    {
      title: "Matches Played",
      value: "60",
      icon: <FaFutbol />,
    },
    {
      title: "Goals Scored",
      value: "182",
      icon: <FaFire />,
    },
    {
      title: "Teams",
      value: "20",
      icon: <FaUsers />,
    },
    {
      title: "League Leader",
      value: "Man City",
      icon: <FaTrophy />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}

export default DashboardStats;