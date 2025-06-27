import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404");
  const [memeIndex, setMemeIndex] = useState(0);
  
  const memes = [
    { text: "Error 404: Page not found", subtext: "But at least you found this awesome 404 page!" },
    { text: "This page is in another castle", subtext: "- Princess Peach (probably)" },
    { text: "404: Page.exe has stopped working", subtext: "Have you tried turning it off and on again?" },
    { text: "Looks like you're lost", subtext: "GPS recalculating..." },
    { text: "The page you seek does not exist", subtext: "This is not the page you're looking for 👋" },
    { text: "404: Reality not found", subtext: "Please check your existence and try again" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Glitch effect on 404
      setGlitchText(prev => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        if (Math.random() > 0.7) {
          return prev.split('').map(char => 
            Math.random() > 0.5 ? chars[Math.floor(Math.random() * chars.length)] : char
          ).join('');
        }
        return "404";
      });
    }, 100);

    const memeInterval = setInterval(() => {
      setMemeIndex(prev => (prev + 1) % memes.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(memeInterval);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 text-center relative overflow-hidden bg-black">
      {/* Floating 404s in background */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gray-800 text-6xl font-bold opacity-10"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: -100
          }}
          animate={{ 
            y: window.innerHeight + 100,
            rotate: 360
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
        >
          404
        </motion.div>
      ))}

      <motion.h1 
        className="text-8xl font-bold font-mono text-blue-400"
        animate={{ 
          scale: [1, 1.1, 1],
          rotateZ: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity
        }}
      >
        {glitchText}
      </motion.h1>
      
      <motion.div
        key={memeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-3xl text-green-400 mb-2">{memes[memeIndex].text}</p>
        <p className="text-xl text-pink-400">{memes[memeIndex].subtext}</p>
      </motion.div>

      <div className="console-text mt-8">
        <span className="text-red-400">console.error</span>
        <span className="text-white">(</span>
        <span className="text-yellow-400">"Page not found. Developer probably forgot to build this route."</span>
        <span className="text-white">);</span>
      </div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/">
          <Button className="bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold px-8 py-4 text-xl">
            Go Home 🏠
            <span className="text-xs block mt-1">(Before something else breaks)</span>
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute bottom-10 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>Pro tip: If you see this page often, the developer might need more coffee ☕</p>
      </motion.div>

      {/* ASCII art Easter egg */}
      <div className="absolute top-10 left-10 text-xs text-gray-700 font-mono hidden md:block">
        <pre>
{`
   _____ _____  _____ 
  |  _  |     ||  _  |
  | |_| | | | || |_| |
  |_____|_____||_____|
  
  Page not found, but
  humor was discovered!
`}
        </pre>
      </div>
    </div>
  );
}
