import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Player() {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await api.get(`/player/${id}`);
        setPlayer(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        <h1 className="text-3xl font-bold">
          Loading Player...
        </h1>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Player not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto text-white">

      <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">

        <h1 className="text-5xl font-bold">
          {player.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="space-y-3">

            <p>
              <strong>Position:</strong>{" "}
              {player.position || "Unknown"}
            </p>

            <p>
              <strong>Nationality:</strong>{" "}
              {player.nationality}
            </p>

            <p>
              <strong>Date of Birth:</strong>{" "}
              {player.dateOfBirth}
            </p>

            <p>
              <strong>Current Team:</strong>{" "}
              {player.currentTeam?.name || "Unknown"}
            </p>

          </div>

          <div className="space-y-3">

            <p>
              <strong>First Name:</strong>{" "}
              {player.firstName || "-"}
            </p>

            <p>
              <strong>Last Name:</strong>{" "}
              {player.lastName || "-"}
            </p>

            <p>
              <strong>Shirt Number:</strong>{" "}
              {player.shirtNumber || "-"}
            </p>

            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(player.lastUpdated).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Player;