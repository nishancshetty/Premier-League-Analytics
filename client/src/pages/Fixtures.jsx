import { useEffect, useState } from "react";
import api from "../services/api";

function Fixtures() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await api.get("/football/matches");
        setMatches(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center mt-10">
        Loading fixtures...
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Premier League Fixtures
      </h1>

      <div className="space-y-5">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center">

              <div className="font-semibold text-lg">
                {match.homeTeam.shortName || match.homeTeam.name}
              </div>

              <div className="text-center">
                <div className="text-xl font-bold">
                  {match.score.fullTime.home ?? "-"}
                  {" : "}
                  {match.score.fullTime.away ?? "-"}
                </div>

                <div className="text-sm text-gray-400">
                  {match.status}
                </div>
              </div>

              <div className="font-semibold text-lg">
                {match.awayTeam.shortName || match.awayTeam.name}
              </div>

            </div>

            <div className="mt-4 text-sm text-gray-400">
              {new Date(match.utcDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fixtures;