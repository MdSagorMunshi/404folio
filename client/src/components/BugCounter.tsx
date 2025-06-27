import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const BugCounter = () => {
  const [bugCount, setBugCount] = useState(404);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Randomly increment bugs
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setBugCount(prev => prev + Math.floor(Math.random() * 5));
      }
    }, 3000);

    // Add click listener to increment bugs
    const handleClick = () => {
      setBugCount(prev => prev + 1);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    };

    window.addEventListener('click', handleClick);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-4 right-4 z-30 bg-red-500 text-white px-4 py-2 rounded-full font-mono text-sm"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", delay: 2 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">🐛</span>
        <span>{bugCount} bugs found</span>
      </div>
      
      {showMessage && (
        <motion.div
          className="absolute top-full mt-2 right-0 bg-black text-white px-3 py-1 rounded text-xs whitespace-nowrap"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          +1 bug (you created it by clicking!)
        </motion.div>
      )}
    </motion.div>
  );
};

export default BugCounter;