import "./Teams.css";
import { useEffect, useState } from "react";
import { getTeams } from "../services/api";
import TeamCard from "../components/teams/TeamCard";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTeams();
  }, []);

  const filtered = teams.filter((club) =>
    club.team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teams-page">
      <div className="teams-header">
        <h1>Premier League Clubs</h1>

        <input
          placeholder="Search club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="teams-grid">
        {filtered.map((club) => (
          <TeamCard key={club.team.id} club={club} />
        ))}
      </div>
    </div>
  );
}

export default Teams;