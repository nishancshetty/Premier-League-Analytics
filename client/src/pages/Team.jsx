import { useEffect, useState } from "react";
import axios from "axios";

import TeamCard from "../components/teams/TeamCard";
import "./Teams.css";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/standings")
      .then((res) => {
        setTeams(res.data);
      })
      .catch(console.error);
  }, []);

  const filteredTeams = teams.filter((team) =>
    team.team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="teams-page">

      <div className="teams-header">

        <h1>Premier League Clubs</h1>

        <input
          type="text"
          placeholder="Search club..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="teams-grid">

        {filteredTeams.map((club) => (
          <TeamCard
            key={club.team.id}
            club={club}
          />
        ))}

      </div>

    </div>
  );
}

export default Teams;