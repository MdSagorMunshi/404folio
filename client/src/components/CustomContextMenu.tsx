import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContextMenuPosition {
  x: number;
  y: number;
}

const CustomContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<ContextMenuPosition>({ x: 0, y: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions = [
    { label: "Copy (Just kidding, it's disabled)", icon: "📋", action: "copy" },
    { label: "Paste (From your imagination)", icon: "📄", action: "paste" },
    { label: "Inspect Element (You're not that smart)", icon: "🔍", action: "inspect" },
    { label: "View Source (It's minified anyway)", icon: "📜", action: "source" },
    { label: "Reload (Why? It's perfect)", icon: "🔄", action: "reload" },
    { label: "Add More Bugs", icon: "🐛", action: "bugs" },
    { label: "Summon Developer", icon: "🧙‍♂️", action: "summon" },
    { label: "Delete System32", icon: "💀", action: "delete" },
    { label: "Download More RAM", icon: "💾", action: "ram" },
    { label: "Exit (There is no escape)", icon: "🚪", action: "exit" },
  ];

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setIsOpen(true);
      setSelectedOption(null);
    };

    const handleClick = () => {
      setIsOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleOptionClick = (action: string) => {
    setSelectedOption(action);
    
    switch (action) {
      case "copy":
        alert("Nice try! Text selection is disabled. This is a feature, not a bug.");
        break;
      case "paste":
        alert("Pasting from the void... ERROR: Void is empty.");
        break;
      case "inspect":
        alert("console.log('You found me!'); // TODO: Hide this better");
        break;
      case "source":
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        break;
      case "reload":
        document.body.style.transform = "rotate(180deg)";
        setTimeout(() => {
          document.body.style.transform = "rotate(0deg)";
        }, 1000);
        break;
      case "bugs":
        const bugEmojis = ["🐛", "🦗", "🕷️", "🐜"];
        for (let i = 0; i < 10; i++) {
          const bug = document.createElement("div");
          bug.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];
          bug.style.position = "fixed";
          bug.style.left = Math.random() * window.innerWidth + "px";
          bug.style.top = Math.random() * window.innerHeight + "px";
          bug.style.fontSize = "30px";
          bug.style.zIndex = "9999";
          bug.style.animation = "spin 2s linear infinite";
          document.body.appendChild(bug);
          setTimeout(() => bug.remove(), 3000);
        }
        break;
      case "summon":
        alert("Ryan has been summoned! He says: 'Have you tried turning it off and on again?'");
        break;
      case "delete":
        alert("Access Denied: You need admin rights... and a Windows machine... and poor judgment.");
        break;
      case "ram":
        alert("Downloading RAM... 100% Complete! (Just kidding, that's not how it works)");
        break;
      case "exit":
        alert("You can check out any time you like, but you can never leave!");
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-50 bg-gray-900 border border-cyan-400 rounded-lg shadow-2xl py-2 min-w-[250px]"
          style={{
            left: position.x,
            top: position.y,
            filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1 }}
        >
          {menuOptions.map((option, index) => (
            <motion.div
              key={option.action}
              className={`px-4 py-2 cursor-pointer flex items-center gap-3 transition-colors ${
                selectedOption === option.action
                  ? "bg-cyan-500 text-black"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
              onClick={() => handleOptionClick(option.action)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <span className="text-xl">{option.icon}</span>
              <span className="text-sm font-mono">{option.label}</span>
            </motion.div>
          ))}
          <div className="border-t border-gray-700 mt-2 pt-2 px-4 pb-1">
            <p className="text-xs text-gray-500 font-mono">
              Right-click menu v4.0.4 (buggy edition)
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomContextMenu;