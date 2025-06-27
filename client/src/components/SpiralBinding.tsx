import { motion } from "framer-motion";

const SpiralBinding = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 z-50">
      <motion.div
        className="absolute left-5 top-5 bottom-5 w-6 rounded-full opacity-80"
        style={{
          background: "repeating-linear-gradient(to bottom, #888 0px, #888 10px, transparent 10px, transparent 30px)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Spiral holes */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="absolute left-6 w-4 h-4 bg-gray-900 rounded-full"
          style={{
            top: `${5 + i * 4.5}%`,
          }}
        />
      ))}
    </div>
  );
};

export default SpiralBinding;
