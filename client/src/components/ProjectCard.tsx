import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  stickyNote: string;
  liveUrl: string;
  codeUrl: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="notebook-paper torn-edge p-6 rounded-lg transform transition-all duration-300 group relative"
      whileHover={{ 
        rotate: 1, 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <motion.img 
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300"
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Sticky note */}
        <motion.div
          className="sticky-note absolute -top-2 -right-2 text-xs max-w-xs"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
            rotate: isHovered ? -2 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {project.stickyNote}
        </motion.div>
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-gray-900">{project.title}</h3>
      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Badge 
              variant="secondary"
              className={`
                ${tech === "React" || tech === "React Native" ? "bg-blue-400 text-white" : ""}
                ${tech === "Node.js" || tech === "Firebase" ? "bg-green-400 text-black" : ""}
                ${tech === "MongoDB" || tech === "Redux" ? "bg-pink-400 text-white" : ""}
                ${tech === "JavaScript" || tech === "Canvas API" || tech === "WebGL" ? "bg-yellow-400 text-black" : ""}
              `}
            >
              {tech}
            </Badge>
          </motion.div>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <Button
          asChild
          size="sm"
          className="text-blue-400 hover:text-green-400 font-bold bg-transparent border border-blue-400 hover:border-green-400"
        >
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-external-link-alt mr-1"></i>
            Live Demo
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          className="text-pink-400 hover:text-blue-400 font-bold bg-transparent border border-pink-400 hover:border-blue-400"
        >
          <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github mr-1"></i>
            Code
          </a>
        </Button>
      </div>
      
      {/* Hover effect annotations */}
      <motion.div
        className="absolute -left-8 top-1/2 transform -translate-y-1/2 annotation text-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -20
        }}
        transition={{ duration: 0.3 }}
      >
        "Actually works!"
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
