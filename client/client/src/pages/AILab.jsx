import "./AILab.css";

function AILab() {
  return (
    <div className="ai-page">

      <h1>AI LAB</h1>

      <div className="ai-grid">

        <div className="ai-card">
          <h2>Match Winner</h2>
          <h1>Manchester City</h1>
          <span>87% Confidence</span>
        </div>

        <div className="ai-card">
          <h2>Top Scorer</h2>
          <h1>Erling Haaland</h1>
          <span>31 Goals</span>
        </div>

        <div className="ai-card">
          <h2>Best Player</h2>
          <h1>Rodri</h1>
          <span>9.1 Rating</span>
        </div>

        <div className="ai-card">
          <h2>Prediction Engine</h2>
          <h1>ONLINE</h1>
          <span>All Models Ready</span>
        </div>

      </div>

    </div>
  );
}

export default AILab;