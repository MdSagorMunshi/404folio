import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface DevConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

const DevConsole = ({ isOpen, onClose }: DevConsoleProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "> Welcome to the Developer Console!",
    "> Type 'help' for available commands",
  ]);

  const commands = {
    help: () => {
      return [
        "Available commands:",
        "  help - Show this message",
        "  about - Learn about Ryan",
        "  skills - List technical skills",
        "  coffee - Check coffee levels",
        "  joke - Get a programming joke",
        "  clear - Clear console",
        "  matrix - Enter the Matrix",
        "  flip - Flip the world",
        "  party - Start a party",
        "  secret - ???",
      ];
    },
    about: () => ["Ryan Shelby - Full-stack developer who turns bugs into features"],
    skills: () => ["JavaScript", "TypeScript", "React", "Node.js", "CSS Wizardry", "Bug Whispering"],
    coffee: () => [`Coffee levels: ${Math.floor(Math.random() * 100)}% (Never enough)`],
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
        "How many programmers does it take to change a light bulb? None. It's a hardware problem.",
        "Why do Java developers wear glasses? Because they don't C#!",
        "I would tell you a UDP joke, but you might not get it.",
      ];
      return [jokes[Math.floor(Math.random() * jokes.length)]];
    },
    clear: () => {
      setHistory(["> Console cleared"]);
      return [];
    },
    matrix: () => {
      document.body.classList.add('hue-rotate-90');
      setTimeout(() => document.body.classList.remove('hue-rotate-90'), 3000);
      return ["Welcome to the Matrix, Neo..."];
    },
    flip: () => {
      document.body.style.transform = 'scaleY(-1)';
      setTimeout(() => document.body.style.transform = 'none', 2000);
      return ["World flipped! (Temporarily)"];
    },
    party: () => {
      const party = document.createElement('div');
      party.innerHTML = '🎉🎊🎈🎉🎊🎈';
      party.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:5rem;z-index:9999;pointer-events:none;';
      document.body.appendChild(party);
      setTimeout(() => document.body.removeChild(party), 3000);
      return ["Party mode activated! 🎉"];
    },
    secret: () => ["You found the secret command! Check your browser console for a surprise..."],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, `> ${cmd}`]);
    
    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd as keyof typeof commands]();
      setHistory(prev => [...prev, ...result]);
      
      if (trimmedCmd === 'secret') {
        console.log('%c🎁 Secret unlocked! Here\'s a cookie: 🍪', 'font-size: 24px; color: #FFD700;');
      }
    } else if (trimmedCmd === '') {
      // Empty command, do nothing
    } else {
      setHistory(prev => [...prev, `Command not found: ${cmd}. Type 'help' for available commands.`]);
    }
    
    setInput("");
  };

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed bottom-0 right-0 w-96 h-96 bg-black border-2 border-green-400 rounded-t-lg z-50 flex flex-col"
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          exit={{ y: 400 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="flex justify-between items-center p-2 border-b border-green-400">
            <h3 className="text-green-400 font-mono">Developer Console</h3>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-green-400 hover:text-white"
            >
              ✕
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
            {history.map((line, index) => (
              <div key={index} className={line.startsWith('>') ? 'text-green-400' : 'text-gray-300'}>
                {line}
              </div>
            ))}
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            className="p-2 border-t border-green-400"
          >
            <div className="flex items-center">
              <span className="text-green-400 mr-2">{'>'}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-green-400 outline-none"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevConsole;