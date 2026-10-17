import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaFutbol,
  FaTrophy,
  FaRobot,
  FaExchangeAlt,
  FaBolt,
  FaHospitalUser,
  FaChartBar,
} from "react-icons/fa";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FaChartLine /> },
  { name: "Standings", path: "/standings", icon: <FaTrophy /> },
  { name: "Fixtures", path: "/fixtures", icon: <FaFutbol /> },
  { name: "Clubs", path: "/teams", icon: <FaShieldAlt /> },
  { name: "Players", path: "/players", icon: <FaUsers /> },
  { name: "Comparison", path: "/compare", icon: <FaExchangeAlt /> },
  {
    name: "AI Lab",
    path: "/ai",
    icon: <FaRobot className="text-[#1EF2C5]" />,
    badge: "PRO",
    badgeColor: "bg-[#1EF2C5]/20 text-[#1EF2C5] border border-[#1EF2C5]/40",
  },
  { name: "Analytics", path: "/analytics", icon: <FaChartBar /> },
  { name: "Injuries & News", path: "/news", icon: <FaHospitalUser /> },
];

function Sidebar({ collapsed }) {
  return (
    <aside
      className={`sticky top-0 h-screen flex-shrink-0 z-40 bg-[#050505]/95 backdrop-blur-2xl border-r border-[rgba(255,255,255,0.08)] transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header matching Landing Page */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.08)]">
        <NavLink to="/dashboard" className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] group-hover:border-[#1EF2C5] shadow-[0_0_20px_rgba(30,242,197,0.15)] flex items-center justify-center transition duration-300">
            <span className="font-black text-[#1EF2C5] text-lg tracking-wider">
              PL
            </span>
          </div>

          {!collapsed && (
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-[2px] text-white block">
                  PL<span className="text-[#1EF2C5]">/X</span>
                </span>
                <span className="pl-pulse-dot"></span>
              </div>
              <span className="text-[9px] font-bold text-[#777777] tracking-[2px] uppercase block">
                Premier Intelligence
              </span>
            </div>
          )}
        </NavLink>
      </div>

      {/* Navigation List with Bold Fonts */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 group relative ${
                isActive
                  ? "bg-[rgba(30,242,197,0.12)] text-[#1EF2C5] border border-[rgba(30,242,197,0.35)] shadow-[0_0_25px_rgba(30,242,197,0.12)] font-black"
                  : "text-[#B8B8B8] hover:text-white hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.06)] border border-transparent"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`text-base transition-transform group-hover:scale-110 ${
                    isActive ? "text-[#1EF2C5]" : "text-[#777777] group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="flex-1 tracking-wide">{item.name}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-[#1EF2C5] rounded-r-full shadow-[0_0_15px_#1EF2C5]"></span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Season & Intro link matching Landing Page */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.01)]">
        <NavLink
          to="/"
          className="flex items-center justify-between p-3 text-xs font-bold text-[#B8B8B8] hover:text-[#1EF2C5] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(30,242,197,0.3)] rounded-2xl transition duration-300"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#1EF2C5]">✦</span>
            {!collapsed && <span>Landing Experience</span>}
          </div>
          {!collapsed && <span className="text-[10px] text-[#777777]">PL/X →</span>}
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;