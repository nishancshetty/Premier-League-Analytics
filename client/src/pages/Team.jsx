import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

function Team() {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await api.get(`/team/${id}`);
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <h1 className="text-3xl font-bold">Loading Team...</h1>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Team not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto text-white">

      {/* Team Header */}

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">

        <div className="flex items-center gap-8">

          <img
            src={team.crest}
            alt={team.name}
            className="w-32 h-32"
          />

          <div>

            <h1 className="text-5xl font-bold">
              {team.name}
            </h1>

            <p className="text-gray-400 mt-2">
              {team.shortName}
            </p>

            <div className="mt-6 space-y-2">

              <p>
                <strong>🏟 Stadium:</strong> {team.venue}
              </p>

              <p>
                <strong>📅 Founded:</strong> {team.founded}
              </p>

              <p>
                <strong>👔 Coach:</strong>{" "}
                {team.coach?.name ?? "Unknown"}
              </p>

              <p>
                <strong>🌍 Website:</strong>{" "}
                <a
                  href={team.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  {team.website}
                </a>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Squad */}

      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Squad
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {team.squad.map((player) => (

            <Link
              key={player.id}
              to={`/player/${player.id}`}
            >

              <div className="bg-slate-900 rounded-xl p-5 hover:bg-slate-800 hover:scale-[1.02] transition duration-300 cursor-pointer">

                <h3 className="text-xl font-semibold">
                  {player.name}
                </h3>

                <p className="text-slate-400 mt-1">
                  {player.position || "Unknown Position"}
                </p>

                <p className="text-sm mt-3">
                  🌍 {player.nationality}
                </p>

                <div className="mt-4 text-sky-400 text-sm font-semibold">
                  View Profile →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Team;