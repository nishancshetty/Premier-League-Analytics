import "./CommandCenter.css";

function CommandCenter() {
  return (
    <div className="command-center">

      <div className="command-header">
        AI COMMAND CENTER
      </div>

      <div className="command-body">

        <div className="command-item">
          <span>Prediction Engine</span>
          <strong>ONLINE</strong>
        </div>

        <div className="command-item">
          <span>Football API</span>
          <strong>CONNECTED</strong>
        </div>

        <div className="command-item">
          <span>News & Media API</span>
          <strong>CONNECTED</strong>
        </div>

        <div className="command-item">
          <span>Sportmonks API</span>
          <strong>CONNECTED</strong>
        </div>

        <div className="command-item">
          <span>AI Models</span>
          <strong>READY</strong>
        </div>

      </div>

    </div>
  );
}

export default CommandCenter;