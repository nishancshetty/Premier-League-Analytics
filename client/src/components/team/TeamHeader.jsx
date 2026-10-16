import "./TeamHeader.css";

function TeamHeader({ team }) {
  return (
    <div className="team-header">

      <img
        src={team.crest}
        alt={team.name}
      />

      <div>

        <h1>{team.name}</h1>

        <p>{team.venue}</p>

      </div>

    </div>
  );
}

export default TeamHeader;