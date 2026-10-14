import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

import PlayerHeader from "../components/player/PlayerHeader";
import PlayerStats from "../components/player/PlayerStats";
import PlayerRadar from "../components/player/PlayerRadar";
import PlayerComparisonCard from "../components/player/PlayerComparisonCard";

function Player() {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayer = async () => {
      try {
        const res = await api.get(`/players/${id}`);

        setPlayer(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlayer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-3xl">
        Loading Player...
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-3xl">
        Player Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <PlayerHeader player={player} />

      <PlayerStats player={player} />

      <PlayerRadar player={player} />

      <div className="mt-8">
        <PlayerComparisonCard player={player} />
      </div>

    </div>
  );
}

export default Player;