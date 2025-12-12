import { motion } from "framer-motion";
import { ANIMALS, AnimalId } from "../animals/AnimalCollection";

interface WalkingAnimalProps {
  animalId: AnimalId;
  delay: number;
  onComplete?: () => void;
  direction?: "left" | "right";
  size?: number;
}

export const WalkingAnimal = ({
  animalId,
  delay,
  onComplete,
  direction = "right",
  size = 180,
}: WalkingAnimalProps) => {
  const animal = ANIMALS.find((a) => a.id === animalId);
  const AnimalComponent = animal?.component;

  if (!AnimalComponent) return null;

  const startX = direction === "right" ? "-220px" : "calc(100vw + 220px)";
  const endX = direction === "right" ? "calc(100vw + 220px)" : "-220px";

  return (
    <motion.div
      className="absolute bottom-24 z-10"
      initial={{ x: startX, opacity: 0 }}
      animate={{ x: endX, opacity: 1 }}
      transition={{
        x: { duration: 5.5, delay, ease: "linear" },
        opacity: { duration: 0.5, delay },
      }}
      onAnimationComplete={onComplete}
      style={{ scaleX: direction === "left" ? -1 : 1 }}
    >
      {/* Walking bob animation wrapper */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow effect behind animal */}
        <div 
          className="absolute inset-0 -z-10 rounded-full blur-xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
            transform: "scale(1.3)",
          }}
        />
        <AnimalComponent size={size} isWalking />
      </motion.div>
      
      {/* Cute dust puffs - enhanced */}
      <motion.div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        animate={{
          opacity: [0, 0.7, 0],
          scale: [0.4, 1.3, 0.4],
        }}
        transition={{
          duration: 0.35,
          repeat: Infinity,
        }}
      >
        <svg width="70" height="30" viewBox="0 0 70 30">
          <ellipse cx="15" cy="22" rx="10" ry="6" fill="#E8DCC8" opacity="0.6" />
          <ellipse cx="35" cy="18" rx="14" ry="8" fill="#E8DCC8" opacity="0.5" />
          <ellipse cx="55" cy="22" rx="10" ry="6" fill="#E8DCC8" opacity="0.6" />
        </svg>
      </motion.div>
      
      {/* Multiple sparkle trail */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute -bottom-1"
          style={{ left: `${30 + i * 15}%` }}
          animate={{
            opacity: [0, 1, 0],
            x: [-15 - i * 10, -40 - i * 15],
            y: [0, -15 - i * 5, 5],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <polygon 
              points="7,1 8.5,5 13,5.5 9.5,8 10.5,12.5 7,10 3.5,12.5 4.5,8 1,5.5 5.5,5" 
              fill={["#FFE082", "#FFB6C1", "#98FB98"][i]}
              opacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* Name label below animal */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.5 }}
      >
        <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border-2 border-border shadow-sm">
          <span className="font-pixel text-[10px] text-foreground">{animal?.name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
