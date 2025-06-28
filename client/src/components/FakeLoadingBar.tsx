import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FakeLoadingBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Loading something important...");
  
  const loadingMessages = [
    "Reticulating splines...",
    "Generating witty error messages...",
    "Warming up the hamsters...",
    "Downloading more RAM...",
    "Dividing by zero...",
    "Proving P=NP...",
    "Reversing entropy...",
    "Compiling coffee into code...",
    "Syncing blockchain with toaster...",
    "Mining bitcoin with CSS...",
    "Teaching AI to feel emotions...",
    "Deleting System32... Just kidding!",
    "Converting bugs to features...",
    "Optimizing pessimizations..."
  ];

  useEffect(() => {
    const showLoader = () => {
      if (Math.random() > 0.9) {
        setIsVisible(true);
        setProgress(0);
        setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
        
        // Fake progress
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 95) {
              // Get stuck at 95%
              setTimeout(() => {
                setIsVisible(false);
              }, 3000);
              clearInterval(interval);
              return 95;
            }
            return prev + Math.random() * 20;
          });
        }, 500);
      }
    };

    // Show randomly on scroll
    const handleScroll = () => {
      if (Math.random() > 0.95) {
        showLoader();
      }
    };

    // Show randomly on click
    const handleClick = () => {
      if (Math.random() > 0.92) {
        showLoader();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 border border-cyan-400 rounded-lg p-4 shadow-2xl min-w-[300px]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
    >
      <div className="text-cyan-400 font-mono text-sm mb-2">{message}</div>
      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">
        {progress.toFixed(0)}% (This will get stuck at 95%)
      </div>
    </motion.div>
  );
};

export default FakeLoadingBar;