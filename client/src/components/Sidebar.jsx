import {
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaFutbol,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">
          ⚽ PL Analytics
        </h1>
      </div>

      <nav className="px-4">
        <ul className="space-y-2">

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <FaChartLine />
            Dashboard
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <FaShieldAlt />
            Teams
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <FaUsers />
            Players
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer">
            <FaFutbol />
            Fixtures
          </li>

        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;