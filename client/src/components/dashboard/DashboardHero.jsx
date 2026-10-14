import "./DashboardHero.css";
import { motion } from "framer-motion";

function DashboardHero() {
  return (
    <motion.div
      className="dashboard-hero"
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-left">
        <span className="hero-tag">PREMIER LEAGUE INTELLIGENCE</span>

        <h1>
          BEYOND
          <br />
          THE <span>PITCH.</span>
        </h1>

        <p>
          Real-time statistics, AI predictions, tactical intelligence and
          football analytics powered by live Premier League data.
        </p>

        <button>ENTER PLATFORM →</button>
      </div>

      <div className="hero-right">
        <div className="hero-circle"></div>

        <div className="hero-card">
          <h3>LIVE MODEL</h3>

          <h2>92.4%</h2>

          <span>Prediction Confidence</span>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHero;