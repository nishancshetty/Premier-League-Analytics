import { motion } from "framer-motion";
import DesktopIcon from "./DesktopIcon";

function Desktop({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1508098682722-e99c643e7484?auto=format&fit=crop&w=2000&q=80')",
        }}
      />

      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 min-h-screen p-8">

        <div className="grid grid-cols-4 md:grid-cols-6 gap-8 w-fit">

          <DesktopIcon
            icon="⚽"
            title="Fixtures"
          />

          <DesktopIcon
            icon="🏆"
            title="Standings"
          />

          <DesktopIcon
            icon="📊"
            title="Analytics"
          />

          <DesktopIcon
            icon="👥"
            title="Players"
          />

          <DesktopIcon
            icon="🛡️"
            title="Teams"
          />

          <DesktopIcon
            icon="🤖"
            title="AI Lab"
          />

        </div>

        <div className="mt-10">
          {children}
        </div>

      </div>
    </motion.div>
  );
}

export default Desktop;