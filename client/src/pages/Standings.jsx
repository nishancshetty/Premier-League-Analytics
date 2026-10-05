import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Standings() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await api.get("/standings");
        setTable(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Loading Standings...</h1>
      </div>
    );
  }

  const getRowColor = (position) => {
    if (position <= 4) return "border-l-4 border-green-500";
    if (position === 5) return "border-l-4 border-orange-500";
    if (position === 6) return "border-l-4 border-blue-500";
    if (position >= 18) return "border-l-4 border-red-500";
    return "border-l-4 border-transparent";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-2">
          Premier League Standings
        </h1>

        <p className="text-gray-400 mb-8">
          Current League Table
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-700 shadow-2xl">

          <table className="w-full">

            <thead className="bg-slate-900 text-gray-300">

              <tr>

                <th className="p-4">Pos</th>
                <th className="p-4 text-left">Club</th>
                <th className="p-4">P</th>
                <th className="p-4">W</th>
                <th className="p-4">D</th>
                <th className="p-4">L</th>
                <th className="p-4">GF</th>
                <th className="p-4">GA</th>
                <th className="p-4">GD</th>
                <th className="p-4">Pts</th>

              </tr>

            </thead>

            <tbody>

              {table.map((club) => (

                <tr
                  key={club.team.id}
                  className={`${getRowColor(
                    club.position
                  )} border-b border-slate-800 hover:bg-slate-900 transition duration-300`}
                >

                  <td className="p-4 text-center font-bold">
                    {club.position}
                  </td>

                  <td className="p-4">

                    <Link
                      to={`/team/${club.team.id}`}
                      className="flex items-center gap-4 hover:text-sky-400 transition"
                    >

                      <img
                        src={club.team.crest}
                        alt={club.team.name}
                        className="w-9 h-9"
                      />

                      <span className="font-semibold">
                        {club.team.shortName}
                      </span>

                    </Link>

                  </td>

                  <td className="p-4 text-center">
                    {club.playedGames}
                  </td>

                  <td className="p-4 text-center">
                    {club.won}
                  </td>

                  <td className="p-4 text-center">
                    {club.draw}
                  </td>

                  <td className="p-4 text-center">
                    {club.lost}
                  </td>

                  <td className="p-4 text-center">
                    {club.goalsFor}
                  </td>

                  <td className="p-4 text-center">
                    {club.goalsAgainst}
                  </td>

                  <td className="p-4 text-center">
                    {club.goalDifference}
                  </td>

                  <td className="p-4 text-center font-bold text-sky-400">
                    {club.points}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4 text-sm">

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            Champions League Qualification
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            Europa League Qualification
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            Conference League Qualification
          </div>

          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            Relegation Zone
          </div>

        </div>

      </div>
    </div>
  );
}

export default Standings;