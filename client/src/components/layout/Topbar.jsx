import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { searchAll } from "../../services/api";

function Topbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ teams: [], players: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Global Keyboard Shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ teams: [], players: [] });
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchAll(searchQuery);
        setSearchResults(res || { teams: [], players: [] });
        setShowDropdown(true);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 px-6 sm:px-8 bg-[#050505]/90 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-30 flex items-center justify-between gap-4 lg:gap-8">
      {/* Left: League & Season Indicator (Clean, without Live Match Center) */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] text-xs text-[#B8B8B8] font-bold shadow-sm">
          <span className="pl-pulse-dot"></span>
          <span className="tracking-widest uppercase text-[11px] font-black text-[#1EF2C5]">
            Season 2025/26
          </span>
          <span className="text-[#777777] font-mono">• MW 7</span>
        </div>
      </div>

      {/* Center: Expansive Large Command Bar Search */}
      <div className="relative flex-1 max-w-2xl lg:max-w-3xl mx-auto" ref={dropdownRef}>
        <div className="relative flex items-center">
          <FaMagnifyingGlass className="absolute left-4 sm:left-5 text-[#1EF2C5] text-base pointer-events-none transition-colors duration-200" />
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clubs, players, stats, records... (Press ⌘K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowDropdown(true)}
            className="w-full bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(30,242,197,0.35)] focus:border-[#1EF2C5] focus:shadow-[0_0_35px_rgba(30,242,197,0.22)] focus:outline-none rounded-2xl pl-12 sm:pl-14 pr-24 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white placeholder-[#777777] transition-all duration-300 backdrop-blur-2xl shadow-inner"
          />

          {/* Right Action Icons / Loading Indicator */}
          <div className="absolute right-3.5 flex items-center gap-2">
            {isSearching && (
              <div className="w-4 h-4 border-2 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
            )}

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowDropdown(false);
                }}
                className="text-[#777777] hover:text-white p-1 rounded-lg transition"
              >
                <FaXmark className="text-sm" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold text-[#777777] bg-white/[0.05] border border-white/[0.1] px-2 py-1 rounded-lg pointer-events-none">
              <span className="text-xs">⌘</span>K
            </div>
          </div>
        </div>

        {/* Dropdown Results - Wide & High Quality */}
        {showDropdown && (searchResults.teams.length > 0 || searchResults.players.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#0A0A0A]/95 border border-[rgba(255,255,255,0.12)] rounded-3xl shadow-2xl p-4 z-50 max-h-[460px] overflow-y-auto space-y-4 backdrop-blur-2xl scrollbar-thin scrollbar-thumb-slate-800">
            {searchResults.teams.length > 0 && (
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#1EF2C5] uppercase px-3 mb-2 block">
                  Clubs ({searchResults.teams.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {searchResults.teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        navigate(`/team/${team.id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[rgba(255,255,255,0.06)] hover:border border-transparent hover:border-[rgba(30,242,197,0.3)] transition text-left group"
                    >
                      {team.crest ? (
                        <img src={team.crest} alt={team.name} className="w-8 h-8 object-contain flex-shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-xs text-white">
                          PL
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#1EF2C5] transition truncate block">
                          {team.name}
                        </span>
                        <span className="text-[11px] text-[#777777] font-semibold">
                          Premier League
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-[#1EF2C5] font-mono font-black px-2 py-0.5 rounded-lg bg-[#1EF2C5]/10 border border-[#1EF2C5]/20">
                        #{team.position}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.players.length > 0 && (
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#1EF2C5] uppercase px-3 mb-2 block">
                  Players ({searchResults.players.length})
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {searchResults.players.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        navigate(`/player/${p.id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[rgba(255,255,255,0.06)] hover:border border-transparent hover:border-[rgba(30,242,197,0.3)] transition text-left group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-sm text-white font-black flex-shrink-0">
                        ⚽
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#1EF2C5] transition truncate block">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-[#777777] font-semibold truncate block">
                          {p.team} • {p.position}
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-[#1EF2C5] font-mono font-black px-2 py-0.5 rounded-lg bg-[#1EF2C5]/10 border border-[#1EF2C5]/20 flex-shrink-0">
                        {p.goals} G
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Status Pill & Profile */}
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div className="hidden lg:flex items-center gap-2.5 bg-[rgba(30,242,197,0.08)] border border-[rgba(30,242,197,0.25)] px-4 py-2 rounded-2xl text-xs text-[#1EF2C5] font-extrabold shadow-[0_0_20px_rgba(30,242,197,0.1)]">
          <span className="pl-pulse-dot"></span>
          <span>PL/X ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-[rgba(255,255,255,0.08)]">
          <div className="w-10 h-10 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-0.5 flex items-center justify-center font-black text-sm text-[#1EF2C5] shadow-inner">
            NS
          </div>
          <div className="hidden xl:block text-left">
            <h4 className="text-xs font-black text-white leading-tight">Nishan Shetty</h4>
            <p className="text-[10px] text-[#777777] font-bold tracking-wider uppercase">Analyst Pro</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;