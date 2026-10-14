import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import GlassPanel from "../layout/GlassPanel";

function DashboardHome() {
  const [table, setTable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/standings")
      .then((res) => setTable(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <motion.div
      className="dashboard-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Stats */}

      <section className="stats-grid">

        <GlassPanel>
          <h2>20</h2>
          <p>Premier League Clubs</p>
        </GlassPanel>

        <GlassPanel>
          <h2>380</h2>
          <p>Season Matches</p>
        </GlassPanel>

        <GlassPanel>
          <h2>1140+</h2>
          <p>Players</p>
        </GlassPanel>

        <GlassPanel>
          <h2>Live</h2>
          <p>Realtime Updates</p>
        </GlassPanel>

      </section>

      {/* Main */}

      <section className="main-grid">

        <GlassPanel title="Premier League Standings">

          <table className="standings-table">

            <thead>

              <tr>

                <th>#</th>

                <th>Club</th>

                <th>Pts</th>

              </tr>

            </thead>

            <tbody>

              {table.slice(0, 10).map((team) => (
                <tr key={team.position}>

                  <td>{team.position}</td>

                  <td>{team.team.name}</td>

                  <td>{team.points}</td>

                </tr>
              ))}

            </tbody>

          </table>

        </GlassPanel>

        <GlassPanel title="AI Prediction">

          <h2>Manchester City</h2>

          <p>Win Probability</p>

          <h1>73%</h1>

        </GlassPanel>

        <GlassPanel title="Top Scorer">

          <h2>Erling Haaland</h2>

          <p>Goals</p>

          <h1>27</h1>

        </GlassPanel>

        <GlassPanel title="Today's Fixtures">

          <p>
            Live fixtures coming next...
          </p>

        </GlassPanel>

      </section>

    </motion.div>
  );
}

export default DashboardHome;