import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Trail {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = () => {
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return;

      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails(prev => [...prev.slice(-10), newTrail]);

      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id));
      }, 1000);
    };

    // Activate trail on rapid mouse movement
    let lastX = 0;
    let lastY = 0;
    const checkSpeed = (e: MouseEvent) => {
      const distance = Math.sqrt(
        Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
      );
      
      if (distance > 50) {
        setIsActive(true);
        setTimeout(() => setIsActive(false), 2000);
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkSpeed);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkSpeed);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {trails.map(trail => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-50"
          initial={{
            x: trail.x - 10,
            y: trail.y - 10,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full" />
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default CursorTrail;