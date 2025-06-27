import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const MemeGenerator = () => {
  const [currentMeme, setCurrentMeme] = useState<number | null>(null);
  
  const memes = [
    {
      id: 1,
      text: "When your code works on the first try",
      image: "😱",
      subtitle: "Sus... very sus..."
    },
    {
      id: 2,
      text: "Me: I'll just fix this one bug quickly",
      image: "🤡",
      subtitle: "3 hours later..."
    },
    {
      id: 3,
      text: "CSS: Works perfectly\nMe: *adds margin: 0*\nCSS:",
      image: "💥",
      subtitle: "Everything breaks"
    },
    {
      id: 4,
      text: "Senior Dev: 'It's just a simple feature'",
      image: "😭",
      subtitle: "Narrator: It wasn't"
    },
    {
      id: 5,
      text: "My code at 3 AM:",
      image: "🍝",
      subtitle: "Spaghetti code supreme"
    },
    {
      id: 6,
      text: "When you forget a semicolon in JavaScript",
      image: "😏",
      subtitle: "JS: I'll allow it"
    },
    {
      id: 7,
      text: "git push --force",
      image: "😈",
      subtitle: "Some devs just want to watch the world burn"
    },
    {
      id: 8,
      text: "When the intern deploys to production on Friday",
      image: "🔥",
      subtitle: "This is fine"
    }
  ];

  const showRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setCurrentMeme(randomIndex);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setCurrentMeme(null);
    }, 3000);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-4 right-4 z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={showRandomMeme}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full shadow-lg"
        >
          <span className="text-2xl mr-2">🎭</span>
          Meme Break
        </Button>
      </motion.div>

      <AnimatePresence>
        {currentMeme !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentMeme(null)}
          >
            <motion.div
              className="bg-white text-black p-8 rounded-lg max-w-md text-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-8xl mb-4">{memes[currentMeme].image}</div>
              <h3 className="text-xl font-bold mb-2 whitespace-pre-line">{memes[currentMeme].text}</h3>
              <p className="text-gray-600 italic">{memes[currentMeme].subtitle}</p>
              <div className="mt-4 text-xs text-gray-400">Click anywhere to dismiss</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MemeGenerator;