import "./AnalyticsPanel.css";
import PossessionChart from "../charts/PossessionChart";

function AnalyticsPanel() {

  return (

    <div className="analytics-panel">

      <div className="analytics-header">

        <h2>Match Analytics</h2>

        <span>LIVE</span>

      </div>

      <PossessionChart />

    </div>

  );

}

export default AnalyticsPanel;