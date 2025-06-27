import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const FloatingElements = () => {
  const [elements, setElements] = useState([
    { id: 1, emoji: "☁️", x: 80, y: 20, size: "text-6xl" },
    { id: 2, emoji: "🦆", x: 75, y: 40, size: "text-4xl" },
    { id: 3, emoji: "✈️", x: 70, y: 60, size: "text-3xl" },
    { id: 4, emoji: "☕", x: 85, y: 80, size: "text-5xl" }
  ]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleElementClick = (id: number) => {
    const messages = [
      "☁️ Cloud says: 'I'm having a precipitation day!'",
      "🦆 Rubber duck says: 'Have you tried turning it off and on again?'",
      "✈️ Paper plane says: 'I'm flying to production!'",
      "☕ Coffee says: 'I fuel the code that fuels the world!'"
    ];
    
    console.log(messages[id - 1]);
    
    // Add special animation for rubber duck
    if (id === 2) {
      const element = document.getElementById(`floating-${id}`);
      if (element) {
        element.style.transform = 'scale(1.5) rotate(360deg)';
        setTimeout(() => {
          element.style.transform = 'scale(1) rotate(0deg)';
        }, 1000);
      }
    }
  };

  return (
    <>
      {elements.map((element, index) => (
        <motion.div
          key={element.id}
          id={`floating-${element.id}`}
          className={`floating-element ${element.size} cursor-pointer select-none`}
          style={{
            top: `${element.y}%`,
            right: `${100 - element.x}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => handleElementClick(element.id)}
        >
          {element.emoji}
        </motion.div>
      ))}
      
      {/* Cursor follower - rubber duck */}
      <motion.div
        className="fixed pointer-events-none z-50 text-2xl"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      >
        🦆
      </motion.div>
    </>
  );
};

export default FloatingElements;
