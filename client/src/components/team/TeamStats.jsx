import "./TeamStats.css";

function TeamStats({ team }) {
  return (
    <div className="team-stats-grid">

      <div className="stat-box">

        <h3>Founded</h3>

        <span>{team.founded}</span>

      </div>

      <div className="stat-box">

        <h3>Coach</h3>

        <span>{team.coach?.name || "Unknown"}</span>

      </div>

      <div className="stat-box">

        <h3>Stadium</h3>

        <span>{team.venue}</span>

      </div>

      <div className="stat-box">

        <h3>Club Colors</h3>

        <span>{team.clubColors}</span>

      </div>

    </div>
  );
}

export default TeamStats;