import { motion, AnimatePresence } from "framer-motion";
import { ANIMALS, AnimalId } from "../animals/AnimalCollection";

interface MemoryCardProps {
  animalId?: AnimalId;
  isFlipped: boolean;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  orderNumber?: number;
}

export const MemoryCard = ({
  animalId,
  isFlipped,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  onClick,
  size = "md",
  disabled = false,
  orderNumber,
}: MemoryCardProps) => {
  const sizeClasses = {
    sm: "w-20 h-24",
    md: "w-24 h-28",
    lg: "w-32 h-36",
  };

  const animalSizes = {
    sm: 50,
    md: 65,
    lg: 85,
  };

  const animal = ANIMALS.find((a) => a.id === animalId);
  const AnimalComponent = animal?.component;

  return (
    <motion.div
      className={`${sizeClasses[size]} cursor-pointer select-none relative group`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.08, y: -6, rotateZ: [-1, 1, 0] }}
      whileTap={disabled ? {} : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      animate={
        isWrong
          ? { x: [-10, 10, -10, 10, 0], transition: { duration: 0.45 } }
          : isCorrect
          ? { scale: [1, 1.12, 1], transition: { duration: 0.35, type: "spring" } }
          : {}
      }
    >
      {/* Card face - Always showing animal now */}
      <div
        className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center overflow-hidden
          shadow-lg transition-all duration-200
          ${isCorrect 
            ? "border-4 border-success ring-4 ring-success/30" 
            : isWrong 
            ? "border-4 border-destructive ring-4 ring-destructive/30" 
            : isSelected
            ? "border-4 border-warning ring-4 ring-warning/30"
            : "border-3 border-game-brown-light/50 group-hover:border-primary/70 group-hover:shadow-xl"
          }
        `}
        style={{ 
          background: isCorrect 
            ? "linear-gradient(165deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)"
            : isWrong
            ? "linear-gradient(165deg, #FFEBEE 0%, #FFCDD2 50%, #EF9A9A 100%)"
            : "linear-gradient(165deg, #FFFAF0 0%, #FFF8E7 50%, #FFECD2 100%)"
        }}
      >
        {/* Hover shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: 'translateX(-100%)' }}
          animate={{ translateX: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
        {/* Decorative corners */}
        <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-game-brown/15 rounded-tl-lg" />
        <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-game-brown/15 rounded-tr-lg" />
        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-game-brown/15 rounded-bl-lg" />
        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-game-brown/15 rounded-br-lg" />
        
        {/* Inner decorative dots */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-game-brown"
              style={{
                left: `${20 + (i % 2) * 60}%`,
                top: `${20 + Math.floor(i / 2) * 60}%`,
              }}
            />
          ))}
        </div>

        {/* Animal - centered and properly proportioned */}
        {AnimalComponent && (
          <AnimatePresence>
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 350, delay: 0.1 }}
            >
              <AnimalComponent
                size={animalSizes[size]}
                isSad={isWrong}
                isHappy={isCorrect}
              />
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Animal name label */}
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="font-pixel text-[8px] text-game-brown/60">{animal?.name}</span>
        </div>
        
        {/* Order number badge */}
        {orderNumber !== undefined && (
          <motion.div
            className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center font-pixel text-[10px] ${
              isCorrect ? "bg-success text-white" : "bg-warning text-warning-foreground"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, delay: 0.15 }}
          >
            {orderNumber}
          </motion.div>
        )}

        {/* Success sparkles */}
        {isCorrect && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ["#FFD700", "#FF6B9D", "#4CAF50", "#87CEEB", "#FFB6C1"][i % 5],
                }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.3, 0],
                  x: [(Math.random() - 0.5) * 70],
                  y: [(Math.random() - 0.5) * 70],
                }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
            ))}
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ boxShadow: "0 0 20px rgba(76, 175, 80, 0.5)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.7 }}
            />
          </>
        )}

        {/* Wrong effect - subtle red flash + shake */}
        {isWrong && (
          <>
            <motion.div
              className="absolute inset-0 bg-destructive/20 rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.1, 1], opacity: [0, 1, 0.7] }}
              transition={{ duration: 0.35 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="18" fill="rgba(239, 68, 68, 0.75)" />
                <path d="M13 13 L27 27 M27 13 L13 27" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};
