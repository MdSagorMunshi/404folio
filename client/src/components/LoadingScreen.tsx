import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  
  const loadingMessages = [
    "Initializing sarcasm module...",
    "Teaching bugs how to be features...",
    "Convincing pixels to behave...",
    "Downloading more RAM (just kidding)...",
    "Reticulating splines...",
    "Mining bitcoin (not really)...",
    "Feeding the hamsters that power the server...",
    "Compiling sass into css (and actual sass)...",
    "Loading loading screen...",
    "This is definitely not frozen...",
    "Almost there... maybe...",
    "99% complete (but that's what they all say)...",
    "ERROR: Success!",
  ];

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length) {
        setMessage(loadingMessages[messageIndex]);
        messageIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(messageInterval);
          setTimeout(onComplete, 500);
          return 100;
        }
        // Sometimes go backwards for fun
        if (Math.random() > 0.9 && prev > 20) {
          return prev - 5;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <pre className="text-green-400 text-xs md:text-sm mb-8">
{`
 _     ___    _    ____  ___ _   _  ____ 
| |   / _ \\  / \\  |  _ \\|_ _| \\ | |/ ___|
| |  | | | |/ _ \\ | | | || ||  \\| | |  _ 
| |__| |_| / ___ \\| |_| || || |\\  | |_| |
|_____\\___/_/   \\_\\____/|___|_| \\_|\\____|
                                          
`}
        </pre>
      </motion.div>

      <div className="w-80 mb-4">
        <div className="loading-bar relative">
          <motion.div 
            className="loading-progress"
            style={{ width: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white font-mono text-sm">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>

      <motion.p
        className="text-green-400 font-mono text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>

      {progress > 90 && (
        <motion.p
          className="text-pink-400 font-mono text-xs mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Pro tip: The loading is fake but the portfolio is real
        </motion.p>
      )}
    </motion.div>
  );
};

export default LoadingScreen;