function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Premier League Analytics
        </h2>

        <p className="text-slate-400 text-sm">
          Live Football Intelligence Platform
        </p>
      </div>

      <div className="flex items-center gap-3">

        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

        <span className="text-green-400 font-semibold">
          LIVE
        </span>

      </div>

    </header>
  );
}

export default Navbar;