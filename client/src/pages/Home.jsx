import { useEffect, useState } from "react";
import api from "../services/api";

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await api.get("/football/matches");
        setMatches(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <h2 className="text-white text-2xl">Loading...</h2>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Premier League Matches
      </h1>

      <div className="grid gap-5">
        {matches.map((match) => (
          <div
            key={match.id}
            className="bg-slate-800 rounded-xl p-5 shadow-lg"
          >
            <h2 className="text-xl font-semibold">
              {match.homeTeam.shortName || match.homeTeam.name}
              {"  vs  "}
              {match.awayTeam.shortName || match.awayTeam.name}
            </h2>

            <p className="mt-2">
              Status: <strong>{match.status}</strong>
            </p>

            <p>
              Score:
              {" "}
              {match.score.fullTime.home ?? 0}
              {" - "}
              {match.score.fullTime.away ?? 0}
            </p>

            <p className="text-gray-400 mt-2">
              {new Date(match.utcDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;