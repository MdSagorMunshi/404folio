import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [glitchedText, setGlitchedText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";
        const glitched = text.split('').map(char => 
          Math.random() > 0.7 ? chars[Math.floor(Math.random() * chars.length)] : char
        ).join('');
        
        setGlitchedText(glitched);
        
        setTimeout(() => {
          setGlitchedText(text);
          setIsGlitching(false);
        }, 100);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <motion.span
      className={`${className} ${isGlitching ? 'text-pink-400' : ''}`}
      animate={{
        x: isGlitching ? [-2, 2, -2, 0] : 0,
      }}
      transition={{ duration: 0.1 }}
    >
      {glitchedText}
    </motion.span>
  );
};

export default GlitchText;