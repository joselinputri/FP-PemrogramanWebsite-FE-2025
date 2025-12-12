import { motion } from "framer-motion";

interface PenguinProps {
  size?: number;
  isFlying?: boolean;
  isSad?: boolean;
  isHappy?: boolean;
  className?: string;
}

export const Penguin = ({ 
  size = 120, 
  isFlying = false, 
  isSad = false,
  isHappy = false,
  className = "" 
}: PenguinProps) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={isFlying ? {
        y: [-4, -18, -8, -22, -4],
        rotate: [-1, 3, -1, 4, -1],
      } : isHappy ? {
        scale: [1, 1.05, 1],
        y: [0, -6, 0],
      } : isSad ? {
        y: [0, 2, 0],
      } : {
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
      }}
      transition={{
        duration: isFlying ? 3.5 : isHappy ? 0.5 : 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Soft shadow */}
      <ellipse cx="50" cy="94" rx="20" ry="4" fill="#00000012" />
      
      {/* Body - rounder, cuter, softer black */}
      <ellipse cx="50" cy="60" rx="26" ry="30" fill="#3A3A3A" stroke="#2D2D2D" strokeWidth="1.5" />
      
      {/* White belly - cream tint, larger */}
      <ellipse cx="50" cy="64" rx="18" ry="24" fill="#FFF8F0" />
      
      {/* Left Wing */}
      <motion.ellipse 
        cx="25" cy="58" rx="7" ry="16" fill="#3A3A3A" stroke="#2D2D2D" strokeWidth="1.5"
        animate={isFlying ? { rotate: [-20, 20, -20] } : { rotate: [0, -6, 0] }}
        transition={{ duration: isFlying ? 0.2 : 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "30px 48px" }}
      />
      
      {/* Right Wing */}
      <motion.ellipse 
        cx="75" cy="58" rx="7" ry="16" fill="#3A3A3A" stroke="#2D2D2D" strokeWidth="1.5"
        animate={isFlying ? { rotate: [20, -20, 20] } : { rotate: [0, 6, 0] }}
        transition={{ duration: isFlying ? 0.2 : 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "70px 48px" }}
      />
      
      {/* Head - big kawaii proportions */}
      <circle cx="50" cy="32" r="24" fill="#3A3A3A" stroke="#2D2D2D" strokeWidth="1.5" />
      
      {/* Face - cream white */}
      <ellipse cx="50" cy="36" rx="17" ry="15" fill="#FFF8F0" />
      
      {/* Blush - soft pink circles */}
      <motion.circle 
        cx="33" cy="44" r="5" fill="#FFB6C1" opacity="0.6"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="67" cy="44" r="5" fill="#FFB6C1" opacity="0.6"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Eyes */}
      {isSad ? (
        <>
          {/* Sad Eyes */}
          <ellipse cx="42" cy="34" rx="4" ry="5" fill="#2D2D2D" />
          <ellipse cx="58" cy="34" rx="4" ry="5" fill="#2D2D2D" />
          <circle cx="43" cy="32" r="1.5" fill="#FFFFFF" />
          <circle cx="59" cy="32" r="1.5" fill="#FFFFFF" />
          {/* Sad eyebrows */}
          <path d="M35 28 Q42 32 48 29" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M52 29 Q58 32 65 28" stroke="#2D2D2D" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Teardrop */}
          <motion.ellipse
            cx="62" cy="42" rx="2" ry="3.5" fill="#87CEEB"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: [0, 10], opacity: [1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeIn" }}
          />
        </>
      ) : isHappy ? (
        <>
          {/* Happy closed eyes - ^ ^ shape */}
          <path d="M37 34 Q42 27 47 34" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M53 34 Q58 27 63 34" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Sparkles */}
          <motion.g
            animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <polygon points="28,24 30,28 34,26 30,30 28,34 26,30 22,26 26,28" fill="#FFD700" />
            <polygon points="72,24 74,28 78,26 74,30 72,34 70,30 66,26 70,28" fill="#FFD700" />
          </motion.g>
        </>
      ) : (
        <>
          {/* Normal Eyes - big and shiny */}
          <ellipse cx="42" cy="34" rx="4.5" ry="5.5" fill="#2D2D2D" />
          <ellipse cx="58" cy="34" rx="4.5" ry="5.5" fill="#2D2D2D" />
          <motion.circle 
            cx="43.5" cy="32" r="2" fill="#FFFFFF"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.circle 
            cx="59.5" cy="32" r="2" fill="#FFFFFF"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <circle cx="41" cy="35" r="0.8" fill="#FFFFFF" opacity="0.6" />
          <circle cx="57" cy="35" r="0.8" fill="#FFFFFF" opacity="0.6" />
        </>
      )}
      
      {/* Beak - cute rounded orange */}
      <ellipse cx="50" cy="47" rx="5.5" ry="3.5" fill="#FFB74D" stroke="#FF9800" strokeWidth="1" />
      <ellipse cx="50" cy="46" rx="3.5" ry="2" fill="#FFCC80" />
      
      {/* Mouth expression */}
      {isSad ? (
        <path d="M45 54 Q50 50 55 54" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ) : isHappy ? (
        <path d="M44 52 Q50 58 56 52" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M46 53 Q50 56 54 53" stroke="#2D2D2D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
      
      {/* Feet - cute orange */}
      <ellipse cx="38" cy="92" rx="8" ry="3.5" fill="#FFB74D" stroke="#FF9800" strokeWidth="1" />
      <ellipse cx="62" cy="92" rx="8" ry="3.5" fill="#FFB74D" stroke="#FF9800" strokeWidth="1" />
      
      {/* Flying accessories */}
      {isFlying && (
        <>
          {/* Pilot goggles */}
          <ellipse cx="42" cy="32" rx="8" ry="6" fill="none" stroke="#8B5A2B" strokeWidth="2.5" />
          <ellipse cx="58" cy="32" rx="8" ry="6" fill="none" stroke="#8B5A2B" strokeWidth="2.5" />
          <rect x="49" y="30" width="2" height="4" fill="#8B5A2B" rx="1" />
          <ellipse cx="42" cy="32" rx="6" ry="4.5" fill="#87CEEB" opacity="0.35" />
          <ellipse cx="58" cy="32" rx="6" ry="4.5" fill="#87CEEB" opacity="0.35" />
          {/* Goggle strap */}
          <path d="M26 32 Q22 30 20 33" stroke="#8B5A2B" strokeWidth="2" fill="none" />
          <path d="M74 32 Q78 30 80 33" stroke="#8B5A2B" strokeWidth="2" fill="none" />
          
          {/* Scarf - flowing */}
          <motion.path 
            d="M28 54 Q50 60 72 54 L74 61 Q50 67 26 61 Z" 
            fill="#FF7043"
            stroke="#E64A19"
            strokeWidth="1"
            animate={{ d: [
              "M28 54 Q50 60 72 54 L74 61 Q50 67 26 61 Z",
              "M28 56 Q50 62 72 56 L74 63 Q50 69 26 63 Z",
              "M28 54 Q50 60 72 54 L74 61 Q50 67 26 61 Z"
            ]}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          {/* Scarf tail */}
          <motion.path 
            d="M72 58 Q86 70 80 88" 
            stroke="#FF7043" 
            strokeWidth="8" 
            fill="none"
            strokeLinecap="round"
            animate={{ 
              d: [
                "M72 58 Q86 70 80 88",
                "M72 58 Q90 76 86 92",
                "M72 58 Q86 70 80 88"
              ]
            }}
            transition={{ duration: 0.3, repeat: Infinity }}
          />
          
          {/* Wind lines */}
          <motion.g
            animate={{ x: [-4, 4, -4], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 0.35, repeat: Infinity }}
          >
            <line x1="10" y1="40" x2="3" y2="42" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="50" x2="1" y2="52" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="60" x2="5" y2="62" stroke="#B3E5FC" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        </>
      )}
    </motion.svg>
  );
};
