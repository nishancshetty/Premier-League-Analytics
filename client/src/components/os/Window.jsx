import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { useState } from "react";

function Window({ title, children }) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <Draggable handle=".window-header">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          overflow-hidden
          shadow-2xl
          absolute
          w-[900px]
        "
      >
        {/* Header */}

        <div
          className="
            window-header
            cursor-move
            flex
            items-center
            justify-between
            px-6
            py-4
            bg-black/30
            border-b
            border-white/10
          "
        >
          <div className="flex gap-3">

            <button
              className="w-4 h-4 rounded-full bg-red-500"
            />

            <button
              onClick={() =>
                setIsMinimized(!isMinimized)
              }
              className="w-4 h-4 rounded-full bg-yellow-400"
            />

            <button
              className="w-4 h-4 rounded-full bg-green-500"
            />

          </div>

          <h2 className="text-white font-semibold">
            {title}
          </h2>

          <div className="w-16" />

        </div>

        {!isMinimized && (

          <div className="p-8">
            {children}
          </div>

        )}

      </motion.div>

    </Draggable>
  );
}

export default Window;