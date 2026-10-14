import "./LiveMatchCard.css";

function LiveMatchCard() {
  return (
    <div className="live-card">

      <div className="live-header">

        <span className="live-dot"></span>

        LIVE MATCH

      </div>

      <div className="teams">

        <div>

          <h2>Manchester City</h2>

          <span>Home</span>

        </div>

        <h1>2 : 1</h1>

        <div>

          <h2>Liverpool</h2>

          <span>Away</span>

        </div>

      </div>

      <p>78'</p>

    </div>
  );
}

export default LiveMatchCard;