import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingElements from "@/components/FloatingElements";
import SpiralBinding from "@/components/SpiralBinding";
import SkillTree from "@/components/SkillTree";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LoadingScreen from "@/components/LoadingScreen";
import MatrixRain from "@/components/MatrixRain";
import ErrorPopup from "@/components/ErrorPopup";
import MemeGenerator from "@/components/MemeGenerator";
import GlitchText from "@/components/GlitchText";
import DevConsole from "@/components/DevConsole";
import CursorTrail from "@/components/CursorTrail";
import RandomComments from "@/components/RandomComments";
import BugCounter from "@/components/BugCounter";
import CustomContextMenu from "@/components/CustomContextMenu";
import AnnoyingPopup from "@/components/AnnoyingPopup";
import FakeLoadingBar from "@/components/FakeLoadingBar";
import RandomGlitch from "@/components/RandomGlitch";
import RunAwayButton from "@/components/RunAwayButton";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState("landing");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [secretMode, setSecretMode] = useState(false);
  const [devConsoleOpen, setDevConsoleOpen] = useState(false);
  const isKonamiActivated = useKonamiCode();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) return 0;
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Console easter eggs
  useEffect(() => {
    console.log('%c🚀 Welcome to the Developer Console!', 'color: #00D4FF; font-size: 24px; font-weight: bold;');
    console.log('%c👨‍💻 Since you\'re here, you must be a fellow developer!', 'color: #00FF88; font-size: 16px;');
    console.log('%c🎮 Try these console commands:', 'color: #FF1493; font-size: 16px;');
    console.log('%c  • portfolio.unlockSecretMode()', 'color: #FFD700; font-size: 14px;');
    console.log('%c  • portfolio.showMeTheMoney()', 'color: #FFD700; font-size: 14px;');
    console.log('%c  • portfolio.iAmBatman()', 'color: #FFD700; font-size: 14px;');
    console.log('%c  • portfolio.glitchMode()', 'color: #FFD700; font-size: 14px;');
    
    // Add console commands
    (window as any).portfolio = {
      unlockSecretMode: () => {
        setSecretMode(true);
        console.log('%c🎉 Secret mode activated! Matrix rain incoming...', 'color: #00FF88; font-size: 20px;');
        return "Welcome to the Matrix, Neo.";
      },
      showMeTheMoney: () => {
        console.log('%c💰 Error: Bank account still empty. Try becoming a client instead! 😄', 'color: #FFD700; font-size: 16px;');
        return "Nice try!";
      },
      iAmBatman: () => {
        document.body.style.filter = 'invert(1)';
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 3000);
        console.log('%c🦇 I\'m Batman!', 'color: #000; background: #FFD700; font-size: 30px; padding: 10px;');
        return "Na na na na na na na na... BATMAN!";
      },
      glitchMode: () => {
        document.body.classList.add('animate-glitch');
        setTimeout(() => {
          document.body.classList.remove('animate-glitch');
        }, 5000);
        return "Glitch mode activated for 5 seconds!";
      },
      openDevConsole: () => {
        setDevConsoleOpen(true);
        return "Developer console opened! Press ESC to close.";
      }
    };
  }, []);

  // Keyboard shortcuts and easter eggs
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Dev console toggle
      if (e.key === '`') {
        e.preventDefault();
        setDevConsoleOpen(prev => !prev);
      }
      
      // Ctrl+S "saves" the page
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        alert("Saved! Just kidding, this is a static site. Nothing to save here. But I appreciate your muscle memory!");
      }
      
      // Escape key adds chaos
      if (e.key === 'Escape') {
        document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 2000);
      }
      
      // Space bar tilts the page
      if (e.key === ' ' && e.target === document.body) {
        e.preventDefault();
        const rotation = Math.random() * 10 - 5;
        document.body.style.transform = `rotate(${rotation}deg)`;
      }
      
      // F key to pay respects
      if (e.key === 'f' || e.key === 'F') {
        console.log('%c💐 You paid respects. The code appreciates it.', 'color: #FFD700; font-size: 16px;');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const enterPortfolio = () => {
    setIsEntered(true);
    setCurrentSection("about");
  };

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      description: "Built with tears, caffeine, and questionable design choices. Features more components than a spaceship!",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "web",
      stickyNote: "May contain traces of bugs",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 2,
      title: "Task Manager App",
      description: "Because apparently I needed another way to procrastinate. Now with 37% more productivity!",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      technologies: ["React Native", "Firebase", "Redux"],
      category: "mobile",
      stickyNote: "Works 60% of the time, every time",
      liveUrl: "#",
      codeUrl: "#"
    },
    {
      id: 3,
      title: "Pixel Art Game",
      description: "A completely original game that definitely doesn't involve falling blocks. Promise!",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
      technologies: ["JavaScript", "Canvas API", "WebGL"],
      category: "experimental",
      stickyNote: "Definitely not Tetris (lawyer approved)",
      liveUrl: "#",
      codeUrl: "#"
    }
  ];

  const skills = [
    { name: "React.js", level: 95, category: "frontend" },
    { name: "TypeScript", level: 90, category: "frontend" },
    { name: "CSS Wizardry", level: 88, category: "frontend" },
    { name: "Node.js", level: 92, category: "backend" },
    { name: "Database Design", level: 85, category: "backend" },
    { name: "Server Configuration", level: 80, category: "backend" }
  ];

  // Handle logo clicks for easter egg
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount === 4) {
      console.log('🎉 You found the secret click easter egg!');
      document.body.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        document.body.style.transform = 'none';
      }, 2000);
      setClickCount(0);
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className={`min-h-screen ${isKonamiActivated ? 'hue-rotate-180' : ''} transition-all duration-1000`}>
      <SpiralBinding />
      <FloatingElements />
      <ErrorPopup />
      <MemeGenerator />
      <MatrixRain isActive={secretMode} />
      <DevConsole isOpen={devConsoleOpen} onClose={() => setDevConsoleOpen(false)} />
      <CursorTrail />
      <RandomComments />
      <BugCounter />
      <CustomContextMenu />
      <AnnoyingPopup />
      <FakeLoadingBar />
      <RandomGlitch />
      <RunAwayButton />
      
      {/* Secret keyboard shortcut hint */}
      <motion.div
        className="fixed bottom-4 left-20 text-xs text-gray-600 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        whileHover={{ opacity: 1 }}
      >
        Press ` to open dev console
      </motion.div>
      
      <div className="ml-16 min-h-screen">
        {/* Landing Section */}
        <motion.section 
          className="min-h-screen flex items-center justify-center px-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center z-10">
            <motion.pre 
              className="font-mono text-blue-400 text-lg md:text-xl lg:text-2xl mb-8 leading-tight animate-glitch cursor-pointer"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              onClick={handleLogoClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
{` ____                       ____  _          _ _           
|  _ \\ _   _  __ _ _ __      / ___|| |__   ___| | |__  _   _ 
| |_) | | | |/ _\` | '_ \\     \\___ \\| '_ \\ / _ \\ | '_ \\| | | |
|  _ <| |_| | (_| | | | |     ___) | | | |  __/ | |_) | |_| |
|_| \\_\\\\__, |\\__,_|_| |_|    |____/|_| |_|\\___|_|_.__ / \\__, |
       |___/                                           |___/ `}
            </motion.pre>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <GlitchText text="Full-Stack" className="text-blue-400" />{" "}
              <GlitchText text="Developer" className="text-green-400" />
            </motion.h1>
            
            <motion.div 
              className="text-xl md:text-2xl mb-8 font-mono"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-pink-400">Bug Whisperer</span> | 
              <span className="text-blue-400"> Pixel Pusher</span> | 
              <span className="text-green-400"> Code Wizard</span>
            </motion.div>
            
            <motion.div 
              className="console-text mb-8 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="animate-typewriter">console.log("Welcome to my beautifully broken portfolio");</span>
              <span className="animate-blink">|</span>
            </motion.div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, type: "spring" }}
            >
              <Button 
                onClick={enterPortfolio}
                className="bg-gradient-to-r from-blue-400 to-pink-400 px-8 py-4 rounded-lg font-bold text-xl hover:scale-110 transition-all duration-300 hover:rotate-2 border-2 border-green-400"
              >
                Enter Portfolio
                <span className="ml-2">🚀</span>
              </Button>
            </motion.div>
          </div>
          
          <div className="sticky-note absolute top-10 right-10 text-sm max-w-xs hidden md:block">
            <div className="annotation">
              "Yes, I made the header glitch on purpose. It's not a bug, it's a feature! 😏"
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          id="about" 
          className="py-20 px-8 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="notebook-paper torn-edge p-8 rounded-lg mb-12 relative">
              <h2 className="text-4xl font-bold mb-6 font-mono text-gray-900">
                The Human Behind the Code
                <span className="text-sm annotation absolute -top-4 right-4 text-pink-400">
                  (Existential Crisis Loading...)
                </span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 text-gray-900">
                <div>
                  <p className="text-lg mb-4 leading-relaxed">
                    Hey there! I'm Ryan, a full-stack developer who believes that the best code is written with a healthy dose of caffeine, a sprinkle of sarcasm, and an unhealthy obsession with making things work perfectly... most of the time.
                  </p>
                  
                  <div className="error-feature mb-4">
                    <i className="fas fa-bug mr-2"></i>
                    Error 418: I'm a teapot (and also a developer)
                  </div>
                  
                  <p className="mb-6">
                    When I'm not busy convincing servers to cooperate or explaining to CSS why it should do what I want, you'll find me turning coffee into code and bugs into features.
                  </p>
                  
                  <div className="bg-black p-4 rounded-lg font-terminal text-green-400 text-sm">
                    <div className="mb-2">&gt; ryan.getPersonalityTraits()</div>
                    <div className="ml-4 text-blue-400">
                      [{`{`}<br />
                      &nbsp;&nbsp;"humor": "sarcastic",<br />
                      &nbsp;&nbsp;"coffee_dependency": "critical",<br />
                      &nbsp;&nbsp;"bug_fixing_level": "legendary",<br />
                      &nbsp;&nbsp;"perfectionism": "beautifully_broken"<br />
                      {`}`}]
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                    alt="Developer workspace with multiple monitors and creative setup" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                  
                  <div className="absolute -top-4 -left-4 bg-green-400 text-black px-3 py-1 rounded-full text-sm font-bold animate-pixel-bounce">
                    🏆 Bug Whisperer
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-pink-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-float">
                    ⚡ Code Ninja
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <h3 className="text-3xl font-bold mb-8 text-blue-400">My Journey (So Far)</h3>
              <div className="space-y-8">
                {[
                  { year: "2023", text: "Successfully convinced React to be my friend (most of the time)", color: "bg-green-400" },
                  { year: "2022", text: "Discovered that \"it works on my machine\" isn't always helpful", color: "bg-blue-400" },
                  { year: "2021", text: "First successful deployment without breaking production (party ensued)", color: "bg-pink-400" }
                ].map((milestone, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-4"
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-4 h-4 ${milestone.color} rounded-full animate-pulse`}></div>
                    <div className="bg-gray-800 p-4 rounded-lg flex-1">
                      <span className="text-pink-400 font-bold">{milestone.year}:</span> {milestone.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="py-20 px-8 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-green-400">My Arsenal</span>
              <div className="annotation text-sm text-pink-400 mt-2">
                (Weapons of Mass Development)
              </div>
            </h2>
            
            <SkillTree />
            
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Frontend Magic</h3>
                {skills.filter(skill => skill.category === "frontend").map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="loading-bar">
                      <motion.div 
                        className="loading-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-pink-400 mb-4">Backend Sorcery</h3>
                {skills.filter(skill => skill.category === "backend").map((skill, index) => (
                  <motion.div 
                    key={index}
                    className="mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span className="text-green-400">{skill.level}%</span>
                    </div>
                    <div className="loading-bar">
                      <motion.div 
                        className="loading-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.2, duration: 1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="mt-16 bg-gray-800 p-8 rounded-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring" }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-green-400 mb-6">Currently Learning</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { emoji: "🦀", name: "Rust", desc: "Because memory safety is cool" },
                  { emoji: "🚀", name: "GraphQL", desc: "Query all the things!" },
                  { emoji: "🧠", name: "Machine Learning", desc: "Teaching computers to be smart" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl animate-pulse">
                      {item.emoji}
                    </div>
                    <span className="font-bold">{item.name}</span>
                    <div className="text-sm text-gray-400">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-20 px-8 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-pink-400">Stuff I Actually Finished</span>
              <div className="annotation text-sm text-blue-400 mt-2">
                (Mostly functional, batteries not included)
              </div>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
            
            <div className="error-feature mt-12 text-center">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Error 404: More awesome projects loading... please wait while I convince my motivation to cooperate.
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="py-20 px-8 relative"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-green-400">Let's Debug This Together</span>
              <div className="annotation text-sm text-pink-400 mt-2">
                (I promise to respond faster than my CSS loads)
              </div>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <ContactForm />
              
              <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-4 text-blue-400">Find Me Online</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "fab fa-github", text: "github.com/MdSagorMunshi", color: "text-green-400" },
                      { icon: "fab fa-linkedin", text: "linkedin.com/in/rynex", color: "text-blue-400" },
                      { icon: "fab fa-twitter", text: "@sudoRyanShelby", color: "text-pink-400" },
                      { icon: "fas fa-envelope", text: "nev@disroot.org", color: "text-green-400" }
                    ].map((contact, index) => (
                      <motion.a 
                        key={index}
                        href="#" 
                        className={`flex items-center space-x-3 text-white hover:${contact.color} transition-colors group`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.i 
                          className={`${contact.icon} text-2xl group-hover:animate-bounce`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        />
                        <span>{contact.text}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
                
                <div className="bg-black p-6 rounded-lg font-terminal text-green-400">
                  <div className="text-sm space-y-2">
                    <div>&gt; ryan.getStats()</div>
                    <div className="ml-4 text-blue-400">
                      Coffee consumed: <span className="text-pink-400">∞ cups</span><br />
                      Bugs fixed: <span className="text-green-400">999+</span><br />
                      Features shipped: <span className="text-blue-400">47</span><br />
                      Current mood: <span className="text-pink-400 animate-pulse">debugging</span><br />
                      Response time: <span className="text-green-400">~2 coffee cycles</span>
                    </div>
                  </div>
                </div>
                
                <div className="sticky-note text-center">
                  <div className="text-sm font-bold text-gray-800">
                    🥚 Easter Egg Alert! 🥚
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    Try the Konami Code somewhere on this page... I dare you!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <div className="console-text mb-4">
              console.log("Thanks for visiting my beautifully broken portfolio!");
            </div>
            
            <p className="text-gray-400 mb-4">
              © 2024 Ryan Shelby. Made with ❤️, ☕, and a healthy dose of <span className="text-pink-400">controlled chaos</span>.
            </p>
            
            <p className="text-xs text-gray-500">
              No servers were harmed in the making of this website. All bugs are intentional and part of the experience.
            </p>
            
            <div className="loading-bar max-w-md mx-auto mt-6">
              <div className="loading-progress animate-loading"></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Loading more awesome content... or pretending to 🤖
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;
