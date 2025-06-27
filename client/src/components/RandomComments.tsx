import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RandomComments = () => {
  const [comments, setComments] = useState<Array<{ id: number; text: string; position: { x: number; y: number } }>>([]);
  
  const commentTexts = [
    "// TODO: Fix this later (never)",
    "// This works, don't touch it",
    "// I have no idea why this works",
    "// Magic numbers, don't ask",
    "// Copy-pasted from StackOverflow",
    "// This is fine 🔥",
    "// Works on my machine ¯\\_(ツ)_/¯",
    "// Not a bug, it's a feature",
    "// Here be dragons 🐉",
    "// Temporary fix (since 2019)",
    "// If you're reading this, I'm sorry",
    "// Trust me, I'm an engineer",
    "// 99 bugs in the code...",
    "// Shouldn't reach here",
    "// Dark magic ahead",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newComment = {
          id: Date.now(),
          text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
          position: {
            x: Math.random() * (window.innerWidth - 300),
            y: Math.random() * window.innerHeight
          }
        };
        
        setComments(prev => [...prev, newComment]);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
          setComments(prev => prev.filter(c => c.id !== newComment.id));
        }, 4000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {comments.map(comment => (
        <motion.div
          key={comment.id}
          className="fixed z-20 font-mono text-sm text-green-400 opacity-50 pointer-events-none"
          style={{
            left: comment.position.x,
            top: comment.position.y,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {comment.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default RandomComments;