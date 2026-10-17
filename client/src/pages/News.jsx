import { useEffect, useState } from "react";
import { getInjuries, getTransfers, getLatestNews } from "../services/api";
import { FaHospitalUser, FaExchangeAlt } from "react-icons/fa";
import {
  FaNewspaper,
  FaArrowUpRightFromSquare,
  FaRotate,
} from "react-icons/fa6";


function formatNewsDate(dateString) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function News() {
  const [articles, setArticles] = useState([]);
  const [injuries, setInjuries] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("news");
  const [refreshing, setRefreshing] = useState(false);

  async function loadData() {
    try {
      const [newsData, injData, trData] = await Promise.all([
        getLatestNews().catch(() => ({ articles: [] })),
        getInjuries().catch(() => []),
        getTransfers().catch(() => []),
      ]);

      setArticles(newsData?.articles || []);
      setInjuries(injData || []);
      setTransfers(trData || []);
    } catch (err) {
      console.error("News load error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[#1EF2C5] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-black text-[#1EF2C5] tracking-widest uppercase">
            Loading Live Intelligence Feed...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[rgba(255,255,255,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#1EF2C5] tracking-[3px] uppercase mb-1">
            <span className="pl-pulse-dot"></span> Live Media & Squad Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Premier League Newsroom
          </h1>
          <p className="text-[#B8B8B8] text-sm font-medium mt-1">
            Real-time breaking stories via NewsAPI, verified injury timetables, and transfer market dossiers.
          </p>
        </div>

        {/* Tab switch + Refresh */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("news")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === "news"
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                  : "text-[#B8B8B8] hover:text-white"
              }`}
            >
              <FaNewspaper />
              <span>Headlines ({articles.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("injuries")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === "injuries"
                  ? "bg-[#FF5F57] text-white shadow-[0_0_20px_rgba(255,95,87,0.3)]"
                  : "text-[#B8B8B8] hover:text-white"
              }`}
            >
              <FaHospitalUser />
              <span>Injuries ({injuries.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("transfers")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition ${
                activeTab === "transfers"
                  ? "bg-[#1EF2C5] text-[#050505] shadow-[0_0_20px_rgba(30,242,197,0.3)]"
                  : "text-[#B8B8B8] hover:text-white"
              }`}
            >
              <FaExchangeAlt />
              <span>Transfers ({transfers.length})</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] text-white transition disabled:opacity-40"
            title="Refresh Feed"
          >
            <FaRotate className={`text-xs ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Headlines (NewsAPI Live Feed) */}
      {activeTab === "news" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#777777] font-semibold">
            <span>Powered by NewsAPI Live Feed • Curated Premier League Telemetry</span>
            <span className="text-[#1EF2C5] font-mono">Live Sync Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-glass-panel flex flex-col justify-between overflow-hidden group shadow-xl hover:border-[#1EF2C5]/50 transition-all duration-300"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="h-44 w-full bg-slate-900 overflow-hidden relative">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#1EF2C5] border border-[rgba(255,255,255,0.1)]">
                        {item.category || "Headline"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-[#777777] font-semibold mb-2">
                      <span className="text-white font-bold">{item.source}</span>
                      <span>{formatNewsDate(item.publishedAt)}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-[#1EF2C5] transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#B8B8B8] mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-5 pb-5 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs font-bold text-[#1EF2C5]">
                  <span>Read Full Coverage</span>
                  <FaArrowUpRightFromSquare className="text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Injuries Tab Content */}
      {activeTab === "injuries" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {injuries.map((item) => (
              <div
                key={item.id}
                className="pl-glass-panel p-6 hover:border-[#FF5F57]/40 transition-all duration-300 relative overflow-hidden group shadow-xl"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-[#FF5F57] transition">
                      {item.player}
                    </h3>
                    <p className="text-xs text-[#777777] font-semibold">{item.team}</p>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      item.status === "Out"
                        ? "bg-[#FF5F57]/20 text-[#FF5F57] border border-[#FF5F57]/30"
                        : item.status === "Available"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)] text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Diagnosis:</span>
                    <span className="font-semibold text-white">{item.injury}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Expected Return:</span>
                    <span className="font-semibold text-[#1EF2C5]">{item.expectedReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#777777]">Severity:</span>
                    <span
                      className={`font-black ${
                        item.severity === "High" ? "text-[#FF5F57]" : "text-yellow-400"
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Transfers Tab Content */}
      {activeTab === "transfers" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {transfers.map((item) => (
              <div
                key={item.id}
                className="pl-glass-panel p-6 hover:border-[#1EF2C5]/40 transition-all duration-300 relative overflow-hidden group shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        item.type === "Confirmed"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-[#777777] font-mono">{item.date}</span>
                  </div>
                  <span className="text-base font-black text-[#1EF2C5] font-mono">
                    {item.fee}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-2">{item.player}</h3>

                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] p-3.5 rounded-2xl border border-[rgba(255,255,255,0.08)] text-xs my-3">
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-[#777777] uppercase font-bold">From</p>
                    <p className="font-extrabold text-white mt-0.5 truncate">{item.from}</p>
                  </div>
                  <FaExchangeAlt className="text-[#1EF2C5] flex-shrink-0" />
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-[#777777] uppercase font-bold">To</p>
                    <p className="font-extrabold text-[#1EF2C5] mt-0.5 truncate">{item.to}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#777777] mt-2">
                  <span>Status:</span>
                  <span className="font-bold text-white">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
