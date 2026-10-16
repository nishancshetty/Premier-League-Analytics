import { useEffect, useState } from "react";
import { getInjuries, getTransfers } from "../services/api";
import { FaHospitalUser, FaExchangeAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function News() {
  const [injuries, setInjuries] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("injuries");

  useEffect(() => {
    async function loadData() {
      try {
        const [injData, trData] = await Promise.all([
          getInjuries(),
          getTransfers(),
        ]);
        setInjuries(injData || []);
        setTransfers(trData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 tracking-widest uppercase mb-1">
            <span>●</span> Live Premier League Intelligence
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Injuries & Transfer News
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time player fitness reports, confirmed signings, and market rumors.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("injuries")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "injuries"
                ? "bg-red-500/20 text-red-400 border border-red-500/30 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaHospitalUser />
            <span>Injury Table ({injuries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("transfers")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === "transfers"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FaExchangeAlt />
            <span>Transfers & Rumours ({transfers.length})</span>
          </button>
        </div>
      </div>

      {/* Injuries Tab Content */}
      {activeTab === "injuries" && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {injuries.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-red-500/40 transition duration-300 relative overflow-hidden group shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl group-hover:bg-red-500/10 transition"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition">
                      {item.player}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">{item.team}</p>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      item.status === "Out"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : item.status === "Available"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 mt-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Diagnosis:</span>
                    <span className="font-semibold text-slate-200">{item.injury}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expected Return:</span>
                    <span className="font-semibold text-cyan-400">{item.expectedReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Severity:</span>
                    <span className={`font-bold ${item.severity === "High" ? "text-red-400" : "text-yellow-400"}`}>
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
          <div className="grid md:grid-cols-2 gap-4">
            {transfers.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition duration-300 relative overflow-hidden group shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        item.type === "Confirmed"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                      }`}
                    >
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">
                    {item.fee}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{item.player}</h3>

                <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs my-3">
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">From</p>
                    <p className="font-bold text-slate-200 mt-0.5">{item.from}</p>
                  </div>
                  <FaExchangeAlt className="text-cyan-400" />
                  <div className="flex-1 text-center">
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">To</p>
                    <p className="font-bold text-cyan-300 mt-0.5">{item.to}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                  <span>Status:</span>
                  <span className="font-semibold text-slate-300">{item.status}</span>
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
