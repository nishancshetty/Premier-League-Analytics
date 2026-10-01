import { useEffect, useState } from "react";
import api from "../services/api";

function Fixtures() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await api.get("/football/matches");

        console.log("Fixtures API Response:", res.data);

        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching fixtures:", err);
        setError("Failed to load fixtures.");
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <h2 className="text-2xl font-semibold">Loading fixtures...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-red-500">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Premier League Fixtures
      </h1>

      {matches.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          No fixtures available.
        </div>
      ) : (
        <div className="space-y-5">
          {matches.map((match) => (
            <div
              key={match.id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-center">

                <div className="w-1/3 font-semibold text-lg">
                  {match.homeTeam?.shortName || match.homeTeam?.name}
                </div>

                <div className="w-1/3 text-center">
                  <div className="text-2xl font-bold">
                    {match.score?.fullTime?.home ?? "-"}
                    {" : "}
                    {match.score?.fullTime?.away ?? "-"}
                  </div>

                  <div className="text-sm text-gray-400 mt-1">
                    {match.status}
                  </div>
                </div>

                <div className="w-1/3 text-right font-semibold text-lg">
                  {match.awayTeam?.shortName || match.awayTeam?.name}
                </div>

              </div>

              <div className="mt-4 text-sm text-gray-400">
                {new Date(match.utcDate).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Fixtures;