import "./TeamCard.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function TeamCard({ club }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="team-card"
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      onClick={() => navigate(`/team/${club.team.id}`)}
    >
      <img
        src={club.team.crest}
        alt={club.team.name}
      />

      <h2>{club.team.name}</h2>

      <div className="team-info">
        <span>#{club.position}</span>
        <span>{club.points} pts</span>
      </div>

      <div className="team-record">
        <span>W {club.won}</span>
        <span>D {club.draw}</span>
        <span>L {club.lost}</span>
      </div>

      <div className="goal-difference">
        GD {club.goalDifference}
      </div>
    </motion.div>
  );
}

export default TeamCard;