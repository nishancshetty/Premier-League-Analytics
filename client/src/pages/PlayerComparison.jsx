import { useState } from "react";

import PlayerComparisonCard from "../components/player/PlayerComparisonCard";
import PlayerRadar from "../components/player/PlayerRadar";

function PlayerComparison() {
  const [player1] = useState({
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    age: 25,
    nationality: "Norway",
    goals: 27,
    assists: 8,
    pace: 90,
    shooting: 96,
    passing: 76,
    dribbling: 88,
    defending: 42,
    physical: 95,
  });

  const [player2] = useState({
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    age: 33,
    nationality: "Egypt",
    goals: 24,
    assists: 13,
    pace: 89,
    shooting: 92,
    passing: 84,
    dribbling: 91,
    defending: 45,
    physical: 82,
  });

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-5xl font-bold text-white mb-10">
        Player Comparison
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">

        <PlayerComparisonCard player={player1} />

        <PlayerComparisonCard player={player2} />

      </div>

      <div className="grid lg:grid-cols-2 gap-8 mt-8">

        <PlayerRadar player={player1} />

        <PlayerRadar player={player2} />

      </div>

    </div>
  );
}

export default PlayerComparison;