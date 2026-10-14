import { NavLink } from "react-router-dom";
import {
  FaHouse,
  FaFutbol,
  FaRankingStar,
  FaPeopleGroup,
  FaChartSimple,
  FaRobot,
} from "react-icons/fa6";

function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHouse /> },
    { name: "Fixtures", path: "/fixtures", icon: <FaFutbol /> },
    { name: "Standings", path: "/standings", icon: <FaRankingStar /> },
    { name: "Teams", path: "/team/64", icon: <FaPeopleGroup /> },
    { name: "Analytics", path: "/analytics", icon: <FaChartSimple /> },
    { name: "AI Lab", path: "/compare", icon: <FaRobot /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>PL/X</h2>
        <span>Football Intelligence</span>
      </div>

      <nav>
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;