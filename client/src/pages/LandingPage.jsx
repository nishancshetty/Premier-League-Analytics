import "./LandingPage.css";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      <div className="background-grid"></div>

      <div className="background-glow glow-left"></div>
      <div className="background-glow glow-right"></div>

      <header className="landing-header">

        <div className="brand">

          <h2>PL/X</h2>

          <span>Premier Intelligence Platform</span>

        </div>

        <div className="header-right">

          <div className="season">

            <span className="pulse"></span>

            Season 2025/26

          </div>

          <button
            className="glass-button"
            onClick={() => navigate("/dashboard")}
          >
            Launch Platform
          </button>

        </div>

      </header>

      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      >

        <p className="hero-label">

          THE FUTURE OF FOOTBALL ANALYTICS

        </p>

        <h1>

          BEYOND

          <br />

          THE <span>PITCH.</span>

        </h1>

        <p className="hero-description">

          Experience football through artificial intelligence,

          tactical analytics and real-time intelligence.

        </p>

        <button
          className="hero-button"
          onClick={() => navigate("/dashboard")}
        >
          ENTER FOOTBALL OS →
        </button>

      </motion.section>

    </div>
  );
}

export default LandingPage;