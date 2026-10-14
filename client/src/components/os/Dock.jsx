import { motion } from "framer-motion";
import {
  FaHome,
  FaFutbol,
  FaChartBar,
  FaRobot,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const items = [
  { icon: <FaHome />, label: "Home" },
  { icon: <FaFutbol />, label: "Fixtures" },
  { icon: <FaChartBar />, label: "Analytics" },
  { icon: <FaUsers />, label: "Players" },
  { icon: <FaRobot />, label: "AI Lab" },
  { icon: <FaCog />, label: "Settings" },
];

function Dock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className="
          flex
          gap-4
          px-6
          py-4
          rounded-3xl
          bg-white/10
          backdrop-blur-2xl
          border
          border-white/20
          shadow-2xl
        "
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            whileHover={{
              scale: 1.35,
              y: -12,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
            }}
            className="
              w-16
              h-16
              rounded-2xl
              bg-white/10
              flex
              items-center
              justify-center
              text-white
              text-2xl
              cursor-pointer
            "
            title={item.label}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dock;