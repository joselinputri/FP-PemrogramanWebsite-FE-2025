import { motion } from "framer-motion";

export type PendantType = "hint" | "freeze" | "double" | "shield" | "reveal";

interface PendantProps {
  type: PendantType;
  size?: number;
  owned?: number;
  onClick?: () => void;
  disabled?: boolean;
  showCount?: boolean;
  isActivating?: boolean;
}

const pendantData: Record<PendantType, { name: string; color: string; glowColor: string; icon: JSX.Element; description: string }> = {
  hint: {
    name: "Hint Star",
    color: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.6)",
    description: "Shows one correct animal",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <polygon
          points="20,2 25,15 39,15 28,24 32,38 20,30 8,38 12,24 1,15 15,15"
          fill="#FFD700"
          stroke="#E6B800"
          strokeWidth="1.5"
        />
        <polygon
          points="20,8 23,16 32,16 25,21 27,30 20,25 13,30 15,21 8,16 17,16"
          fill="#FFF3B0"
          opacity="0.6"
        />
      </svg>
    ),
  },
  freeze: {
    name: "Ice Crystal",
    color: "#87CEEB",
    glowColor: "rgba(135, 206, 235, 0.6)",
    description: "Freezes time for 5 seconds",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M20 2 L20 38 M5 11 L35 29 M35 11 L5 29"
          stroke="#87CEEB"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="6" fill="#B0E2FF" />
        <circle cx="20" cy="6" r="3" fill="#B0E2FF" />
        <circle cx="20" cy="34" r="3" fill="#B0E2FF" />
        <circle cx="8" cy="13" r="3" fill="#B0E2FF" />
        <circle cx="32" cy="27" r="3" fill="#B0E2FF" />
        <circle cx="32" cy="13" r="3" fill="#B0E2FF" />
        <circle cx="8" cy="27" r="3" fill="#B0E2FF" />
      </svg>
    ),
  },
  double: {
    name: "Lucky Clover",
    color: "#4CAF50",
    glowColor: "rgba(76, 175, 80, 0.6)",
    description: "Doubles points this round",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <ellipse cx="14" cy="14" rx="8" ry="9" fill="#4CAF50" />
        <ellipse cx="26" cy="14" rx="8" ry="9" fill="#4CAF50" />
        <ellipse cx="14" cy="26" rx="8" ry="9" fill="#4CAF50" />
        <ellipse cx="26" cy="26" rx="8" ry="9" fill="#4CAF50" />
        <ellipse cx="14" cy="14" rx="5" ry="6" fill="#81C784" />
        <ellipse cx="26" cy="14" rx="5" ry="6" fill="#81C784" />
        <ellipse cx="14" cy="26" rx="5" ry="6" fill="#81C784" />
        <ellipse cx="26" cy="26" rx="5" ry="6" fill="#81C784" />
        <rect x="18" y="30" width="4" height="10" fill="#8D6E63" rx="1" />
      </svg>
    ),
  },
  shield: {
    name: "Heart Shield",
    color: "#FF6B9D",
    glowColor: "rgba(255, 107, 157, 0.6)",
    description: "Protects from one wrong answer",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <path
          d="M20 36 C8 28 4 20 4 12 C4 6 8 4 14 4 C17 4 19 6 20 8 C21 6 23 4 26 4 C32 4 36 6 36 12 C36 20 32 28 20 36"
          fill="#FF6B9D"
          stroke="#E91E63"
          strokeWidth="1.5"
        />
        <path
          d="M20 30 C12 24 9 18 9 12 C9 8 12 7 15 7 C17 7 19 9 20 11"
          fill="#FFB6C1"
          opacity="0.5"
        />
      </svg>
    ),
  },
  reveal: {
    name: "Magic Eye",
    color: "#B24BF3",
    glowColor: "rgba(178, 75, 243, 0.7)",
    description: "Shows all cards briefly",
    icon: (
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <ellipse cx="20" cy="20" rx="16" ry="10" fill="#E1BEE7" stroke="#B24BF3" strokeWidth="2" />
        <circle cx="20" cy="20" r="7" fill="#B24BF3" />
        <circle cx="20" cy="20" r="4" fill="#2D2D2D" />
        <circle cx="22" cy="18" r="2" fill="#FFF" />
        <path d="M4 20 Q20 8 36 20" fill="none" stroke="#B24BF3" strokeWidth="2" />
        <path d="M4 20 Q20 32 36 20" fill="none" stroke="#B24BF3" strokeWidth="2" />
      </svg>
    ),
  },
};

// Floating particle component for magical effect
const MagicParticle = ({ delay, color }: { delay: number; color: string }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 rounded-full"
    style={{ backgroundColor: color }}
    initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      y: [0, -20, -30],
      x: [0, Math.random() * 20 - 10],
      scale: [0, 1, 0.5],
    }}
    transition={{
      duration: 1.5,
      delay,
      repeat: Infinity,
      repeatDelay: 1,
    }}
  />
);

export const Pendant = ({
  type,
  size = 60,
  owned = 0,
  onClick,
  disabled = false,
  showCount = true,
  isActivating = false,
}: PendantProps) => {
  const data = pendantData[type];

  return (
    <motion.div
      className={`relative cursor-pointer ${disabled ? "opacity-50 grayscale" : ""}`}
      style={{ width: size, height: size }}
      whileHover={disabled ? {} : { scale: 1.18, rotate: 10, y: -3 }}
      whileTap={disabled ? {} : { scale: 0.88 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Outer glow effect - ENHANCED with multiple layers */}
      <motion.div
        className="absolute -inset-3 rounded-full blur-xl"
        style={{ backgroundColor: data.glowColor }}
        animate={{ 
          opacity: isActivating ? [0.7, 1, 0.7] : [0.3, 0.6, 0.3],
          scale: isActivating ? [1, 1.4, 1] : [1, 1.15, 1],
        }}
        transition={{ duration: isActivating ? 0.3 : 2, repeat: Infinity }}
      />
      
      {/* Middle aura ring - NEW */}
      <motion.div
        className="absolute -inset-2 rounded-full blur-lg"
        style={{ 
          background: `radial-gradient(circle, ${data.glowColor} 0%, transparent 60%)`,
        }}
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          rotate: [0, 360],
        }}
        transition={{ 
          opacity: { duration: 2, repeat: Infinity },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      />
      
      {/* Inner magical glow - ENHANCED */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ 
          background: `radial-gradient(circle, ${data.glowColor} 0%, ${data.color}40 40%, transparent 70%)`,
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      
      {/* Rotating sparkle ring - NEW */}
      {!disabled && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={angle}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: data.color,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${size/2 + 4}px)`,
              }}
              animate={{ 
                scale: [0.8, 1.5, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: angle / 360 }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Pendant background with gradient */}
      <div
        className="absolute inset-1 rounded-full border-3 shadow-xl"
        style={{ 
          borderColor: data.color,
          background: `linear-gradient(135deg, ${data.color}15 0%, #FFFFFF 50%, ${data.color}15 100%)`,
        }}
      />
      
      {/* Shimmer effect - ENHANCED */}
      <motion.div
        className="absolute inset-2 rounded-full overflow-hidden"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent"
          style={{ transform: 'rotate(45deg)' }}
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
      
      {/* Icon with glow */}
      <div className="absolute inset-3 filter drop-shadow-lg">
        {data.icon}
      </div>
      
      {/* Magic particles when owned > 0 - MORE particles */}
      {owned > 0 && !disabled && (
        <div className="absolute inset-0">
          {[0, 0.3, 0.6, 0.9, 1.2].map((delay) => (
            <MagicParticle key={delay} delay={delay} color={data.color} />
          ))}
        </div>
      )}
      
      {/* Activation burst effect - ENHANCED */}
      {isActivating && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{ 
                backgroundColor: data.color,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 10px ${data.color}`,
              }}
              initial={{ x: '-50%', y: '-50%', scale: 0 }}
              animate={{
                x: `calc(-50% + ${Math.cos(i * Math.PI / 6) * 50}px)`,
                y: `calc(-50% + ${Math.sin(i * Math.PI / 6) * 50}px)`,
                scale: [0, 1.3, 0],
                opacity: [1, 0.9, 0],
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          ))}
        </>
      )}
      
      {/* Count badge with glow */}
      {showCount && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center
            text-[10px] font-pixel text-primary-foreground bg-game-brown border-2 border-cloud shadow-lg"
          style={{ 
            boxShadow: owned > 0 ? `0 0 15px ${data.color}80` : undefined 
          }}
          animate={owned > 0 ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {owned}
        </motion.div>
      )}
    </motion.div>
  );
};

export const PendantCard = ({
  type,
  owned = 0,
  price,
  onBuy,
  canAfford = true,
}: {
  type: PendantType;
  owned?: number;
  price: number;
  onBuy?: () => void;
  canAfford?: boolean;
}) => {
  const data = pendantData[type];

  return (
    <motion.div
      className="bg-gradient-to-br from-pastel-cream to-cloud rounded-2xl p-4 border-3 border-game-brown-light
        shadow-md flex flex-col items-center gap-2 relative overflow-hidden group cursor-pointer"
      whileHover={{ y: -6, boxShadow: `0 12px 30px ${data.glowColor}`, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Background glow */}
      <motion.div 
        className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity"
        style={{ background: `radial-gradient(circle at center, ${data.color} 0%, transparent 70%)` }}
      />
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
        style={{ transform: 'translateX(-100%)' }}
        animate={{ translateX: ['-100%', '100%'] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      />
      
      <Pendant type={type} size={50} owned={owned} showCount={false} />
      <h3 className="font-pixel text-[10px] text-foreground text-center group-hover:text-primary transition-colors">{data.name}</h3>
      <p className="text-xs text-muted-foreground text-center leading-tight">{data.description}</p>
      <motion.div 
        className="flex items-center gap-1"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">🪙</span>
        <span className="font-pixel text-[10px] text-game-orange">{price}</span>
      </motion.div>
      <motion.button
        className={`px-4 py-1.5 rounded-full font-pixel text-[8px] relative overflow-hidden ${
          canAfford
            ? "bg-secondary text-secondary-foreground shadow-[0_3px_0_0_hsl(160,45%,50%)] hover:shadow-[0_4px_0_0_hsl(160,45%,50%)] hover:-translate-y-[1px]"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
        whileTap={canAfford ? { y: 2, scale: 0.95 } : {}}
        whileHover={canAfford ? { scale: 1.05 } : {}}
        onClick={canAfford ? onBuy : undefined}
        disabled={!canAfford}
      >
        BUY
      </motion.button>
      <div className="text-[10px] text-muted-foreground">Owned: <span className="text-primary font-semibold">{owned}</span></div>
    </motion.div>
  );
};

export { pendantData };
