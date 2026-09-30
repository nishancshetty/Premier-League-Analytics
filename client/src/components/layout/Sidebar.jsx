import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaFutbol,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaChartLine />,
  },
  {
    name: "Teams",
    path: "/dashboard/teams",
    icon: <FaShieldAlt />,
  },
  {
    name: "Players",
    path: "/dashboard/players",
    icon: <FaUsers />,
  },
  {
    name: "Fixtures",
    path: "/dashboard/fixtures",
    icon: <FaFutbol />,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          PL Analytics
        </h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-6 mt-6 border-t border-slate-800">
          <NavLink
            to="/"
            className="flex items-center gap-3 p-3 text-sm text-cyan-400 hover:bg-slate-800/60 rounded-lg transition-colors"
          >
            <span>← PL/X Experience</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;