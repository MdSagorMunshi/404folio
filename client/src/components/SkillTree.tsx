import { motion } from "framer-motion";
import { useState } from "react";

const SkillTree = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: "React", icon: "fab fa-react", position: { x: 0, y: 0 }, color: "from-blue-400 to-green-400" },
    { name: "TypeScript", icon: "fab fa-js-square", position: { x: 1, y: 0 }, color: "from-blue-500 to-yellow-400" },
    { name: "CSS", icon: "fab fa-css3-alt", position: { x: 2, y: 0 }, color: "from-blue-400 to-pink-400" },
    { name: "HTML", icon: "fab fa-html5", position: { x: 3, y: 0 }, color: "from-orange-400 to-red-400" },
    { name: "Node.js", icon: "fab fa-node-js", position: { x: 0, y: 1 }, color: "from-green-400 to-green-600" },
    { name: "Python", icon: "fab fa-python", position: { x: 1, y: 1 }, color: "from-yellow-400 to-blue-400" },
    { name: "MongoDB", icon: "fas fa-database", position: { x: 2, y: 1 }, color: "from-green-500 to-teal-400" },
    { name: "AWS", icon: "fab fa-aws", position: { x: 3, y: 1 }, color: "from-orange-400 to-yellow-400" },
  ];

  return (
    <div className="relative mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-node relative cursor-pointer"
            style={{
              background: `linear-gradient(45deg, var(--electric-blue), var(--neon-green))`,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <i className={`${skill.icon} text-2xl text-white`} />
            
            {/* Skill name tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none whitespace-nowrap"
              animate={{
                opacity: hoveredSkill === skill.name ? 1 : 0,
                y: hoveredSkill === skill.name ? 0 : 10,
              }}
              transition={{ duration: 0.2 }}
            >
              {skill.name}
            </motion.div>
            
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              style={{
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
              }}
              animate={{
                opacity: hoveredSkill === skill.name ? 1 : 0,
              }}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
        {/* Horizontal connections */}
        {[0, 1].map(row => (
          <g key={row}>
            {[0, 1, 2].map(col => (
              <motion.line
                key={`${row}-${col}`}
                x1={`${(col + 0.5) * 25}%`}
                y1={`${(row + 0.5) * 50}%`}
                x2={`${(col + 1.5) * 25}%`}
                y2={`${(row + 0.5) * 50}%`}
                stroke="url(#gradient)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: col * 0.2 + row * 0.8, duration: 0.5 }}
              />
            ))}
          </g>
        ))}
        
        {/* Vertical connections */}
        {[0, 1, 2, 3].map(col => (
          <motion.line
            key={col}
            x1={`${(col + 0.5) * 25}%`}
            y1="25%"
            x2={`${(col + 0.5) * 25}%`}
            y2="75%"
            stroke="url(#gradient)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: col * 0.2 + 0.5, duration: 0.5 }}
          />
        ))}
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--electric-blue)" />
            <stop offset="100%" stopColor="var(--neon-green)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default SkillTree;
