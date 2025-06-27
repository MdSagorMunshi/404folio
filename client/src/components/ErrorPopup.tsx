import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ErrorPopup = () => {
  const [errors, setErrors] = useState<Array<{ id: number; message: string; position: { x: number; y: number } }>>([]);
  
  const errorMessages = [
    "Error 404: Motivation not found",
    "Warning: Coffee levels critically low",
    "Exception: Too many tabs open",
    "Fatal: Git commit message too honest",
    "Alert: Imposter syndrome detected",
    "Error: Keyboard not found. Press F1 to continue",
    "Warning: Your code works but nobody knows why",
    "Exception: Brain.exe has stopped responding",
    "Error 418: I'm a teapot",
    "Alert: Semicolon missing somewhere",
    "Warning: This feature is not a bug",
    "Error: Success (wait, what?)",
    "Fatal: Too much recursion in recursion",
    "Exception: Divided by zero coffees",
    "Alert: Stack Overflow addiction detected"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newError = {
          id: Date.now(),
          message: errorMessages[Math.floor(Math.random() * errorMessages.length)],
          position: {
            x: Math.random() * (window.innerWidth - 300),
            y: Math.random() * (window.innerHeight - 200)
          }
        };
        
        setErrors(prev => [...prev, newError]);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
          setErrors(prev => prev.filter(err => err.id !== newError.id));
        }, 5000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const dismissError = (id: number) => {
    setErrors(prev => prev.filter(err => err.id !== id));
  };

  return (
    <AnimatePresence>
      {errors.map(error => (
        <motion.div
          key={error.id}
          className="fixed z-30 bg-red-500 text-white p-4 rounded-lg shadow-lg max-w-xs"
          style={{
            left: error.position.x,
            top: error.position.y,
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: "spring", damping: 15 }}
          drag
          dragElastic={0.2}
          whileDrag={{ scale: 1.1 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-sm mb-1">⚠️ FAKE ERROR</h3>
              <p className="text-xs">{error.message}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:text-red-200 -mt-1 -mr-2"
              onClick={() => dismissError(error.id)}
            >
              ✕
            </Button>
          </div>
          <div className="text-xs mt-2 opacity-75">
            Drag me around or dismiss me!
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default ErrorPopup;