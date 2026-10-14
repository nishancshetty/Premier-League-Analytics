import "./SystemStatus.css";

function SystemStatus() {
  return (
    <div className="system-status">

      <h3>SYSTEM STATUS</h3>

      <div className="status-grid">

        <div>
          <h2>99.9%</h2>
          <p>Uptime</p>
        </div>

        <div>
          <h2>20</h2>
          <p>Teams</p>
        </div>

        <div>
          <h2>380</h2>
          <p>Matches</p>
        </div>

        <div>
          <h2>LIVE</h2>
          <p>Feed</p>
        </div>

      </div>

    </div>
  );
}

export default SystemStatus;