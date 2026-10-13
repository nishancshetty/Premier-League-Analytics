import { useState } from "react";
import api from "../services/api";

import PlayerSelector from "../components/comparison/PlayerSelector";
import ComparisonTable from "../components/comparison/ComparisonTable";
import RadarChart from "../components/comparison/RadarChart";

function PlayerComparison() {
  const [comparison, setComparison] = useState(null);

  const handleCompare = async (team1, team2) => {
    if (!team1 || !team2) return;

    try {
      const res = await api.get(
        `/comparison?team1=${team1}&team2=${team2}`
      );

      setComparison(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 text-white">

      <h1 className="text-5xl font-bold mb-10">
        Team Comparison
      </h1>

      <PlayerSelector onCompare={handleCompare} />

      <ComparisonTable comparison={comparison} />

      <RadarChart comparison={comparison} />

    </div>
  );
}

export default PlayerComparison; 