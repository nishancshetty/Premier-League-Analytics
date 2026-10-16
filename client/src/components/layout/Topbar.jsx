import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { searchAll, getLiveMatch } from "../../services/api";
import socket from "../../services/socket";

function Topbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ teams: [], players: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [liveScore, setLiveScore] = useState(null);
  const dropdownRef = useRef(null);

  // Live match score ticker
  useEffect(() => {
    getLiveMatch().then((data) => {
      if (data) setLiveScore(data);
    }).catch(() => {});

    const onUpdate = (data) => {
      setLiveScore(data);
    };

    socket.on("liveMatchUpdate", onUpdate);
    return () => socket.off("liveMatchUpdate", onUpdate);
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
    }, 250);

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
    <header className="h-20 px-8 bg-[#050505]/85 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.08)] sticky top-0 z-30 flex items-center justify-between gap-6">
      {/* Left: Match Ticker / Season Indicator */}
      <div className="flex items-center gap-4">
        {liveScore ? (
          <Link
            to="/live"
            className="flex items-center gap-3 bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.09)] hover:border-[#1EF2C5] px-4 py-2 rounded-2xl text-xs transition duration-300 group shadow-lg"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5F57] opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5F57]"></span>
            </span>
            <span className="font-black text-[#FF5F57] tracking-wider uppercase text-[11px]">
              LIVE
            </span>
            <span className="text-white font-extrabold group-hover:text-[#1EF2C5] transition">
              {liveScore.homeTeam?.shortName || liveScore.homeTeam || "Man City"} {liveScore.homeScore} : {liveScore.awayScore} {liveScore.awayTeam?.shortName || liveScore.awayTeam || "Liverpool"}
            </span>
            <span className="text-[#1EF2C5] font-mono font-black bg-black/60 px-2 py-0.5 rounded-lg text-xs">
              {liveScore.minute}'
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-2.5 text-xs text-[#B8B8B8] font-bold">
            <span className="pl-pulse-dot"></span>
            <span className="tracking-widest uppercase text-[11px] font-extrabold text-[#1EF2C5]">
              Season 2025/26
            </span>
            <span className="text-[#777777]">• Matchweek 7</span>
          </div>
        )}
      </div>

      {/* Center: Search Box matching Glass Button style */}
      <div className="relative flex-1 max-w-lg" ref={dropdownRef}>
        <div className="relative">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777777] text-sm" />
          <input
            type="text"
            placeholder="Search clubs, players, stats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.trim() && setShowDropdown(true)}
            className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)] focus:border-[#1EF2C5] focus:shadow-[0_0_25px_rgba(30,242,197,0.18)] focus:outline-none rounded-2xl pl-11 pr-4 py-2.5 text-sm font-semibold text-white placeholder-[#777777] transition duration-300 backdrop-blur-xl"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        {/* Dropdown Results */}
        {showDropdown && (searchResults.teams.length > 0 || searchResults.players.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-[#0A0A0A] border border-[rgba(255,255,255,0.12)] rounded-3xl shadow-2xl p-4 z-50 max-h-96 overflow-y-auto space-y-4 backdrop-blur-2xl">
            {searchResults.teams.length > 0 && (
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#1EF2C5] uppercase px-2 mb-2 block">
                  Clubs
                </span>
                <div className="space-y-1">
                  {searchResults.teams.map((team) => (
                    <button
                      key={team.id}
                      onClick={() => {
                        navigate(`/team/${team.id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.06)] hover:border border-transparent hover:border-[rgba(30,242,197,0.3)] transition text-left"
                    >
                      <img src={team.crest} alt={team.name} className="w-7 h-7 object-contain" />
                      <span className="text-sm font-bold text-white">{team.name}</span>
                      <span className="ml-auto text-xs text-[#1EF2C5] font-mono font-black">#{team.position}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.players.length > 0 && (
              <div>
                <span className="text-[10px] font-black tracking-widest text-[#1EF2C5] uppercase px-2 mb-2 block">
                  Players
                </span>
                <div className="space-y-1">
                  {searchResults.players.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        navigate(`/player/${p.id}`);
                        setShowDropdown(false);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[rgba(255,255,255,0.06)] hover:border border-transparent hover:border-[rgba(30,242,197,0.3)] transition text-left"
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs text-white font-black">
                        ⚽
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">{p.name}</span>
                        <span className="text-[11px] text-[#777777] font-semibold">{p.team} • {p.position}</span>
                      </div>
                      <span className="ml-auto text-xs text-[#1EF2C5] font-mono font-black">
                        {p.goals} Goals
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
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2.5 bg-[rgba(30,242,197,0.08)] border border-[rgba(30,242,197,0.25)] px-4 py-2 rounded-2xl text-xs text-[#1EF2C5] font-extrabold shadow-[0_0_20px_rgba(30,242,197,0.1)]">
          <span className="pl-pulse-dot"></span>
          <span>PL/X ENGINE ACTIVE</span>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-[rgba(255,255,255,0.08)]">
          <div className="w-10 h-10 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-0.5 flex items-center justify-center font-black text-sm text-[#1EF2C5]">
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