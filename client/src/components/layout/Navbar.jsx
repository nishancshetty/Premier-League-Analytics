import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="relative w-80">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search players, clubs..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-300 hover:text-white">
          <FaBell size={18} />
        </button>

        <div className="flex items-center gap-3">
          <FaUserCircle size={32} />

          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-slate-400">Project Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;