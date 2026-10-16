import "./TeamCard.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaTrophy,
  FaFutbol,
  FaShieldAlt,
} from "react-icons/fa";

function TeamCard({ club }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="team-card"
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/team/${club.team.id}`)}
    >
      <div className="team-header">

        <img
          src={club.team.crest}
          alt={club.team.name}
        />

        <div>

          <h2>{club.team.name}</h2>

          <span>Premier League</span>

        </div>

      </div>

      <div className="team-stats">

        <div>

          <FaTrophy />

          <span>#{club.position}</span>

        </div>

        <div>

          <FaShieldAlt />

          <span>{club.points} pts</span>

        </div>

        <div>

          <FaFutbol />

          <span>{club.goalsFor} Goals</span>

        </div>

      </div>

      <div className="record">

        <div>

          <strong>{club.won}</strong>

          <p>Wins</p>

        </div>

        <div>

          <strong>{club.draw}</strong>

          <p>Draws</p>

        </div>

        <div>

          <strong>{club.lost}</strong>

          <p>Losses</p>

        </div>

      </div>

      <button>

        View Club →

      </button>

    </motion.div>
  );
}

export default TeamCard;