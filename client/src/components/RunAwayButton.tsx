import { useState } from "react";
import { motion } from "framer-motion";

const RunAwayButton = () => {
  const [position, setPosition] = useState({ x: 50, y: 400 });
  const [clickAttempts, setClickAttempts] = useState(0);

  const handleMouseEnter = () => {
    const newX = Math.random() * (window.innerWidth - 200);
    const newY = Math.random() * (window.innerHeight - 100);
    setPosition({ x: newX, y: newY });
    setClickAttempts(prev => prev + 1);
  };

  const handleClick = () => {
    alert("Wow! You actually caught me! Here's your prize: 🏆 (It's just an emoji)");
    setClickAttempts(0);
  };

  return (
    <motion.div
      className="fixed z-30"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 15 }}
    >
      <button
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
      >
        Click Me! 🎯
      </button>
      {clickAttempts > 5 && (
        <div className="absolute -bottom-8 left-0 text-xs text-gray-400 whitespace-nowrap">
          {clickAttempts} failed attempts... keep trying!
        </div>
      )}
    </motion.div>
  );
};

export default RunAwayButton;