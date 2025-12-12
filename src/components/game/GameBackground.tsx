import { motion } from "framer-motion";

interface CloudProps {
  delay?: number;
  top?: string;
  scale?: number;
  speed?: number;
}

const Cloud = ({ delay = 0, top = "10%", scale = 1, speed = 45 }: CloudProps) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ top }}
    initial={{ x: "-250px" }}
    animate={{ x: "calc(100vw + 250px)" }}
    transition={{
      duration: speed,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    <svg 
      width={180 * scale} 
      height={90 * scale} 
      viewBox="0 0 180 90" 
      className="drop-shadow-sm"
    >
      {/* Soft fluffy cloud - Widgetable style */}
      <ellipse cx="45" cy="58" rx="40" ry="26" fill="#FFFFFF" />
      <ellipse cx="80" cy="48" rx="45" ry="32" fill="#FFFFFF" />
      <ellipse cx="125" cy="54" rx="42" ry="28" fill="#FFFFFF" />
      <ellipse cx="60" cy="38" rx="35" ry="24" fill="#FFFFFF" />
      <ellipse cx="100" cy="34" rx="38" ry="26" fill="#FFFFFF" />
      <ellipse cx="140" cy="46" rx="32" ry="24" fill="#FFFFFF" />
      {/* Subtle inner highlights */}
      <ellipse cx="70" cy="42" rx="26" ry="18" fill="#FAFEFF" opacity="0.8" />
      <ellipse cx="105" cy="40" rx="30" ry="20" fill="#F8FDFF" opacity="0.6" />
    </svg>
  </motion.div>
);

interface FlowerProps {
  x: number;
  y: number;
  color?: string;
  size?: number;
  delay?: number;
}

const Flower = ({ x, y, color = "#FFB6C1", size = 1, delay = 0 }: FlowerProps) => (
  <motion.svg
    width={24 * size}
    height={24 * size}
    viewBox="0 0 24 24"
    className="absolute"
    style={{ left: `${x}%`, bottom: `${y}%` }}
    animate={{ rotate: [-3, 3, -3], scale: [1, 1.05, 1] }}
    transition={{ duration: 3.5 + Math.random() * 2, repeat: Infinity, delay }}
  >
    {/* Stem */}
    <path d="M12 15 L12 22" stroke="#7CB37C" strokeWidth="2" strokeLinecap="round" />
    {/* Simple leaf */}
    <ellipse cx="14" cy="19" rx="2.5" ry="1.5" fill="#7CB37C" transform="rotate(30 14 19)" />
    {/* Simple petals */}
    <circle cx="12" cy="7" r="4" fill={color} />
    <circle cx="17" cy="12" r="4" fill={color} />
    <circle cx="12" cy="17" r="4" fill={color} />
    <circle cx="7" cy="12" r="4" fill={color} />
    {/* Center */}
    <circle cx="12" cy="12" r="3.5" fill="#FFE082" />
    <circle cx="11" cy="11" r="1.5" fill="#FFFDE7" opacity="0.8" />
  </motion.svg>
);

const Butterfly = ({ delay = 0, startY = 35 }: { delay?: number; startY?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ x: "-50px", y: `${startY}%` }}
    animate={{ 
      x: ["0%", "100vw"],
      y: [`${startY}%`, `${startY - 8}%`, `${startY + 4}%`, `${startY - 4}%`, `${startY}%`]
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    <motion.svg width="28" height="22" viewBox="0 0 28 22">
      <motion.g
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      >
        {/* Soft pastel wings */}
        <ellipse cx="8" cy="11" rx="7" ry="10" fill="#FFD1DC" opacity="0.9" />
        <ellipse cx="20" cy="11" rx="7" ry="10" fill="#FFD1DC" opacity="0.9" />
        <ellipse cx="8" cy="11" rx="4" ry="6" fill="#FFB6C1" opacity="0.8" />
        <ellipse cx="20" cy="11" rx="4" ry="6" fill="#FFB6C1" opacity="0.8" />
        {/* Body */}
        <ellipse cx="14" cy="11" rx="2" ry="7" fill="#4A4A4A" />
        {/* Antennae */}
        <path d="M13 4 Q10 1 8 0" stroke="#4A4A4A" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M15 4 Q18 1 20 0" stroke="#4A4A4A" strokeWidth="1" fill="none" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  </motion.div>
);

// Cute sun with kawaii face - Widgetable style
const Sun = () => (
  <motion.div
    className="absolute top-6 right-8 w-24 h-24"
    animate={{ scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Soft glow */}
    <div 
      className="absolute inset-0 rounded-full"
      style={{ 
        background: "radial-gradient(circle, rgba(255, 238, 130, 0.4) 0%, transparent 65%)",
        transform: "scale(1.6)"
      }}
    />
    <svg width="96" height="96" viewBox="0 0 96 96">
      {/* Simple rays */}
      {[...Array(8)].map((_, i) => (
        <motion.line
          key={i}
          x1="48" y1="48"
          x2={48 + Math.cos(i * Math.PI / 4) * 42}
          y2={48 + Math.sin(i * Math.PI / 4) * 42}
          stroke="#FFE082"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
      {/* Sun circle - soft gradient */}
      <circle cx="48" cy="48" r="26" fill="url(#sunGradientNew)" />
      <defs>
        <radialGradient id="sunGradientNew" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#FFFDE7" />
          <stop offset="60%" stopColor="#FFF59D" />
          <stop offset="100%" stopColor="#FFEE58" />
        </radialGradient>
      </defs>
      {/* Kawaii face - happy closed eyes */}
      <path d="M39 46 Q42 40 45 46" stroke="#FFB74D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M51 46 Q54 40 57 46" stroke="#FFB74D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M42 54 Q48 60 54 54" stroke="#FFB74D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="36" cy="50" rx="4" ry="2.5" fill="#FFAB91" opacity="0.45" />
      <ellipse cx="60" cy="50" rx="4" ry="2.5" fill="#FFAB91" opacity="0.45" />
    </svg>
  </motion.div>
);

// Small decorative daisy
const Daisy = ({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) => (
  <motion.svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    className="absolute"
    style={{ left: `${x}%`, bottom: `${y}%` }}
    animate={{ scale: [1, 1.08, 1], rotate: [-2, 2, -2] }}
    transition={{ duration: 4, repeat: Infinity, delay }}
  >
    <circle cx="8" cy="5" r="3" fill="#FFFFFF" />
    <circle cx="11" cy="8" r="3" fill="#FFFFFF" />
    <circle cx="8" cy="11" r="3" fill="#FFFFFF" />
    <circle cx="5" cy="8" r="3" fill="#FFFFFF" />
    <circle cx="8" cy="8" r="2.5" fill="#FFE082" />
  </motion.svg>
);

export const GameBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Sky gradient - soft pastel Widgetable style */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #D4EDFC 0%, #E8F5FE 25%, #C5E8D5 55%, #A8D5B8 75%, #8BC99A 100%)"
        }}
      />
      
      {/* Sun with cute face */}
      <Sun />
      
      {/* Clouds - simple and soft */}
      <Cloud delay={0} top="5%" scale={1.3} speed={65} />
      <Cloud delay={8} top="12%" scale={1.0} speed={55} />
      <Cloud delay={16} top="3%" scale={1.1} speed={60} />
      <Cloud delay={24} top="18%" scale={0.85} speed={50} />
      <Cloud delay={32} top="8%" scale={0.95} speed={58} />
      <Cloud delay={40} top="15%" scale={0.75} speed={52} />
      
      {/* Butterflies */}
      <Butterfly delay={0} startY={30} />
      <Butterfly delay={12} startY={38} />
      
      {/* Rolling hills - Widgetable soft green style */}
      <svg 
        className="absolute bottom-0 w-full" 
        viewBox="0 0 1440 450" 
        preserveAspectRatio="none"
        style={{ height: "55%" }}
      >
        {/* Far hill - lightest sage */}
        <ellipse cx="200" cy="480" rx="500" ry="250" fill="#C5E1C0" />
        <ellipse cx="1200" cy="500" rx="580" ry="270" fill="#C5E1C0" />
        <ellipse cx="700" cy="520" rx="450" ry="240" fill="#C5E1C0" />
        
        {/* Middle hills - soft green */}
        <ellipse cx="400" cy="500" rx="420" ry="230" fill="#A8D5A2" />
        <ellipse cx="950" cy="490" rx="520" ry="250" fill="#A8D5A2" />
        <ellipse cx="1350" cy="510" rx="380" ry="220" fill="#A8D5A2" />
        
        {/* Front hills - fresh green */}
        <ellipse cx="180" cy="520" rx="400" ry="200" fill="#8CC984" />
        <ellipse cx="620" cy="505" rx="480" ry="210" fill="#8CC984" />
        <ellipse cx="1050" cy="515" rx="520" ry="220" fill="#8CC984" />
        <ellipse cx="1380" cy="530" rx="360" ry="190" fill="#8CC984" />
        
        {/* Ground base - vibrant meadow green */}
        <rect x="0" y="380" width="1440" height="100" fill="#7ABE73" />
        
        {/* Grass blades - subtle strokes */}
        {[...Array(40)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${25 + i * 36} 420 Q${28 + i * 36} 402 ${25 + i * 36} 388`}
            stroke="#68A860"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{ skewX: [-2, 2, -2] }}
            transition={{ duration: 2.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
          />
        ))}
        {[...Array(35)].map((_, i) => (
          <motion.path
            key={`g2-${i}`}
            d={`M${45 + i * 42} 415 Q${47 + i * 42} 400 ${45 + i * 42} 392`}
            stroke="#5A9852"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            animate={{ skewX: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 0.4 }}
          />
        ))}
      </svg>
      
      {/* Flowers scattered on grass */}
      <div className="absolute bottom-0 w-full h-1/3 pointer-events-none">
        <Flower x={3} y={12} color="#FFD1DC" size={0.85} delay={0} />
        <Daisy x={8} y={8} delay={0.3} />
        <Flower x={14} y={15} color="#FFFFFF" size={0.7} delay={0.2} />
        <Flower x={22} y={10} color="#FFE4B5" size={0.75} delay={0.4} />
        <Daisy x={28} y={14} delay={0.1} />
        <Flower x={35} y={8} color="#FFD1DC" size={0.8} delay={0.3} />
        <Flower x={42} y={13} color="#E8D5FF" size={0.65} delay={0.5} />
        <Daisy x={48} y={9} delay={0.2} />
        <Flower x={55} y={15} color="#FFFFFF" size={0.75} delay={0.1} />
        <Flower x={62} y={7} color="#FFE4B5" size={0.7} delay={0.4} />
        <Daisy x={68} y={12} delay={0.3} />
        <Flower x={75} y={14} color="#FFD1DC" size={0.8} delay={0.2} />
        <Flower x={82} y={9} color="#E8D5FF" size={0.65} delay={0.5} />
        <Daisy x={88} y={11} delay={0.1} />
        <Flower x={94} y={13} color="#FFFFFF" size={0.7} delay={0.3} />
      </div>
      
      {/* Floating sparkles - subtle golden */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: "radial-gradient(circle, #FFFDE7 0%, #FFE082 100%)",
            left: `${10 + Math.random() * 80}%`,
            top: `${15 + Math.random() * 35}%`,
            boxShadow: "0 0 8px 2px rgba(255, 224, 130, 0.4)"
          }}
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};
