import { motion } from "framer-motion";

function DesktopIcon({
  icon,
  title,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer select-none"
    >
      <div
        className="
          w-20
          h-20
          rounded-2xl
          bg-white/10
          backdrop-blur-md
          border
          border-white/20
          flex
          items-center
          justify-center
          text-5xl
          shadow-xl
        "
      >
        {icon}
      </div>

      <p className="text-white mt-3 text-sm font-medium text-center">
        {title}
      </p>
    </motion.div>
  );
}

export default DesktopIcon;