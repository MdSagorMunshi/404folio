import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AnnoyingPopup = () => {
  const [popups, setPopups] = useState<Array<{ id: number; message: string; position: { x: number; y: number } }>>([]);
  
  const annoyingMessages = [
    "Did you know? This popup serves no purpose!",
    "Warning: Low battery on wireless cable",
    "Error 418: I'm a teapot ☕",
    "Update available: Version 0.0.0 → Version 0.0.0",
    "Achievement unlocked: Wasted 5 seconds reading this",
    "This website uses cookies. Not the edible kind.",
    "Press Alt+F4 for a surprise! (Don't actually do it)",
    "Congratulations! You're the 1,000,000th visitor! (You're not)",
    "Your computer is running perfectly. This concerns us.",
    "Warning: This popup will self-destruct in... never",
    "Fun fact: This popup is coded in Comic Sans",
    "Breaking: Local developer discovers ctrl+z",
    "Alert: Your mouse is working correctly. Suspicious...",
    "Notification: This notification notifies you about notifications"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newPopup = {
          id: Date.now(),
          message: annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)],
          position: {
            x: Math.random() * (window.innerWidth - 300),
            y: Math.random() * (window.innerHeight - 200)
          }
        };
        
        setPopups(prev => [...prev, newPopup]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const closePopup = (id: number) => {
    // 30% chance it doesn't close properly
    if (Math.random() > 0.3) {
      setPopups(prev => prev.filter(p => p.id !== id));
    } else {
      // Move it somewhere else instead
      setPopups(prev => prev.map(p => 
        p.id === id 
          ? { ...p, position: { x: Math.random() * (window.innerWidth - 300), y: Math.random() * (window.innerHeight - 200) } }
          : p
      ));
    }
  };

  return (
    <AnimatePresence>
      {popups.map(popup => (
        <motion.div
          key={popup.id}
          className="fixed z-40 bg-yellow-400 text-black p-4 rounded-lg shadow-2xl max-w-[300px] cursor-move"
          style={{
            left: popup.position.x,
            top: popup.position.y,
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          drag
          dragElastic={0.2}
          whileDrag={{ scale: 1.1 }}
        >
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm font-bold">{popup.message}</p>
            <button
              onClick={() => closePopup(popup.id)}
              className="text-black hover:text-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-2 text-xs opacity-70">
            Click X to maybe close (70% success rate)
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default AnnoyingPopup;