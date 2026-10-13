import { useEffect, useState } from "react";
import api from "../../services/api";

function PlayerSelector({ onCompare }) {
  const [teams, setTeams] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await api.get("/standings");
        setTeams(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTeams();
  }, []);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Compare Teams
      </h2>

      <div className="grid md:grid-cols-3 gap-4">

        <select
          className="bg-slate-800 p-3 rounded-lg"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        >
          <option value="">Select Team 1</option>

          {teams.map((item) => (
  <option key={item.team.id} value={item.team.id}>
    {item.team.name}
  </option>
))}
        </select>

        <select
          className="bg-slate-800 p-3 rounded-lg"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        >
          <option value="">Select Team 2</option>

          {teams.map((item) => (
                <option key={item.team.id} value={item.team.id}>
                {item.team.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => onCompare(team1, team2)}   
          className="bg-sky-600 hover:bg-sky-700 rounded-lg font-semibold"
        >
          Compare
        </button>

      </div>

    </div>
  );
}

export default PlayerSelector;  