import { motion } from "framer-motion";

interface AnimalProps {
  size?: number;
  isWalking?: boolean;
  isSad?: boolean;
  isHappy?: boolean;
  className?: string;
}


// Cute Penguin - soft pastel colors with bigger eyes
export const CardPenguin = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -8, 0], rotate: [-3, 3, -3] } : { scale: [1, 1.05, 1] }}
    transition={{ duration: isWalking ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shadow */}
    <ellipse cx="40" cy="76" rx="18" ry="4" fill="#00000010" />
    
    {/* Body - softer blue-gray */}
    <ellipse cx="40" cy="52" rx="22" ry="20" fill="#8BA5B5" stroke="#4A4A4A" strokeWidth="2" />
    
    {/* White belly - cream tint */}
    <ellipse cx="40" cy="56" rx="14" ry="14" fill="#FFF8F0" />
    
    {/* Head - bigger for cuteness */}
    <circle cx="40" cy="32" r="24" fill="#8BA5B5" stroke="#4A4A4A" strokeWidth="2" />
    
    {/* White face */}
    <ellipse cx="40" cy="38" rx="17" ry="15" fill="#FFF8F0" />
    
    {/* Wings - more rounded */}
    <motion.ellipse 
      cx="18" cy="48" rx="7" ry="15" fill="#8BA5B5" stroke="#4A4A4A" strokeWidth="2"
      animate={isWalking ? { rotate: [-15, 15, -15] } : { rotate: [-3, 3, -3] }}
      transition={{ duration: isWalking ? 0.4 : 2, repeat: Infinity }}
      style={{ transformOrigin: "18px 40px" }}
    />
    <motion.ellipse 
      cx="62" cy="48" rx="7" ry="15" fill="#8BA5B5" stroke="#4A4A4A" strokeWidth="2"
      animate={isWalking ? { rotate: [15, -15, 15] } : { rotate: [3, -3, 3] }}
      transition={{ duration: isWalking ? 0.4 : 2, repeat: Infinity }}
      style={{ transformOrigin: "62px 40px" }}
    />
    
    {/* Bigger rosy cheeks */}
    <motion.ellipse 
      cx="24" cy="42" rx="6" ry="5" fill="#FFB6C1" 
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.ellipse 
      cx="56" cy="42" rx="6" ry="5" fill="#FFB6C1" 
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* BIGGER sparkly eyes */}
    {isSad ? (
      <>
        <ellipse cx="34" cy="34" rx="5" ry="6" fill="#4A4A4A" />
        <ellipse cx="46" cy="34" rx="5" ry="6" fill="#4A4A4A" />
        <circle cx="35" cy="32" r="2" fill="#FFF" />
        <circle cx="47" cy="32" r="2" fill="#FFF" />
        <path d="M28 28 Q34 32 40 28" stroke="#4A4A4A" strokeWidth="1.5" fill="none" />
        <path d="M40 28 Q46 32 52 28" stroke="#4A4A4A" strokeWidth="1.5" fill="none" />
        <motion.path
          d="M50 42 Q52 48 50 52"
          stroke="#87CEEB"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 6], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M30 35 Q34 28 38 35" stroke="#4A4A4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M42 35 Q46 28 50 35" stroke="#4A4A4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.g animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }}>
          <circle cx="24" cy="28" r="3" fill="#FFD700" />
          <circle cx="56" cy="28" r="3" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        {/* Normal - BIGGER sparkly eyes */}
        <ellipse cx="34" cy="34" rx="5" ry="6" fill="#4A4A4A" />
        <ellipse cx="46" cy="34" rx="5" ry="6" fill="#4A4A4A" />
        <circle cx="36" cy="32" r="2.5" fill="#FFF" />
        <circle cx="48" cy="32" r="2.5" fill="#FFF" />
        <circle cx="33" cy="35" r="1" fill="#FFF" opacity="0.6" />
        <circle cx="45" cy="35" r="1" fill="#FFF" opacity="0.6" />
      </>
    )}
    
    {/* Cute gradient beak */}
    <ellipse cx="40" cy="46" rx="5" ry="3" fill="url(#beakGradient)" stroke="#FF9800" strokeWidth="1" />
    <defs>
      <linearGradient id="beakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFB74D" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
    </defs>
    
    {/* Cute feet */}
    <ellipse cx="32" cy="72" rx="6" ry="3" fill="#FFB74D" stroke="#FF9800" strokeWidth="1" />
    <ellipse cx="48" cy="72" rx="6" ry="3" fill="#FFB74D" stroke="#FF9800" strokeWidth="1" />
    
    {/* Sparkle decoration */}
    {!isSad && (
      <motion.circle 
        cx="52" cy="26" r="1.5" fill="#FFD700"
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    )}
  </motion.svg>
);
// Cute Cow - soft pastel gray with lavender flowers
export const Cow = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -6, 0], rotate: [-2, 2, -2] } : { scale: [1, 1.05, 1] }}
    transition={{ duration: isWalking ? 0.5 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <ellipse cx="40" cy="76" rx="16" ry="4" fill="#00000010" />
    
    {/* Tail */}
    <motion.g
      animate={isWalking ? { rotate: [-20, 20, -20] } : { rotate: [-5, 5, -5] }}
      transition={{ duration: 0.4, repeat: Infinity }}
      style={{ transformOrigin: "62px 55px" }}
    >
      <path d="M58 52 Q68 50 66 42" stroke="#8A8A8A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="66" cy="40" rx="4" ry="5" fill="#6A6A6A" />
    </motion.g>
    
    {/* Body - softer white */}
    <ellipse cx="40" cy="54" rx="22" ry="18" fill="#FAFAFA" stroke="#4A4A4A" strokeWidth="2" />
    
    {/* Pastel spots - heart and circles */}
    <path d="M48 48 C52 44 56 48 52 54 C50 58 48 58 46 54 C42 48 44 44 48 48" fill="#D5C6E0" />
    <ellipse cx="32" cy="58" rx="6" ry="5" fill="#D5C6E0" />
    
    {/* Head - softer gray with gradient */}
    <defs>
      <radialGradient id="cowHeadGradient">
        <stop offset="30%" stopColor="#9A9A9A" />
        <stop offset="100%" stopColor="#7A7A7A" />
      </radialGradient>
    </defs>
    <circle cx="40" cy="32" r="24" fill="url(#cowHeadGradient)" stroke="#4A4A4A" strokeWidth="2" />
    
    {/* Face - cream colored muzzle */}
    <ellipse cx="40" cy="44" rx="15" ry="11" fill="#FFE4E1" stroke="#4A4A4A" strokeWidth="1.5" />
    
    {/* Ears - rounded */}
    <ellipse cx="16" cy="24" rx="8" ry="6" fill="#6A6A6A" stroke="#4A4A4A" strokeWidth="1" transform="rotate(-30 16 24)" />
    <ellipse cx="64" cy="24" rx="8" ry="6" fill="#6A6A6A" stroke="#4A4A4A" strokeWidth="1" transform="rotate(30 64 24)" />
    <ellipse cx="16" cy="24" rx="5" ry="3" fill="#FFB6C1" transform="rotate(-30 16 24)" />
    <ellipse cx="64" cy="24" rx="5" ry="3" fill="#FFB6C1" transform="rotate(30 64 24)" />
    
    {/* Cute horns */}
    <ellipse cx="22" cy="12" rx="3" ry="5" fill="#FFEFD5" stroke="#DEB887" strokeWidth="1" transform="rotate(-15 22 12)" />
    <ellipse cx="58" cy="12" rx="3" ry="5" fill="#FFEFD5" stroke="#DEB887" strokeWidth="1" transform="rotate(15 58 12)" />
    
    {/* Flower crown - prettier pastel flowers */}
    <g>
      {/* Pink flower */}
      <circle cx="30" cy="12" r="5" fill="#FFB6D9" />
      <circle cx="30" cy="12" r="2" fill="#FFF4B5" />
      {/* Purple flower */}
      <circle cx="40" cy="9" r="6" fill="#D8B4E2" />
      <circle cx="40" cy="9" r="2.5" fill="#FFF4B5" />
      {/* Lavender flower */}
      <circle cx="50" cy="12" r="5" fill="#E1BEE7" />
      <circle cx="50" cy="12" r="2" fill="#FFF4B5" />
      {/* Small daisies */}
      <circle cx="35" cy="14" r="4" fill="#FFFFFF" />
      <circle cx="35" cy="14" r="1.5" fill="#FFEB3B" />
      <circle cx="45" cy="14" r="4" fill="#FFFFFF" />
      <circle cx="45" cy="14" r="1.5" fill="#FFEB3B" />
    </g>
    
    {/* BIGGER rosy cheeks */}
    <motion.ellipse 
      cx="22" cy="38" rx="7" ry="6" fill="#FFB6C1" 
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.ellipse 
      cx="58" cy="38" rx="7" ry="6" fill="#FFB6C1" 
      animate={{ opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    
    {/* BIGGER sparkly eyes */}
    {isSad ? (
      <>
        <ellipse cx="32" cy="32" rx="5" ry="7" fill="#4A4A4A" />
        <ellipse cx="48" cy="32" rx="5" ry="7" fill="#4A4A4A" />
        <circle cx="34" cy="30" r="2.5" fill="#FFF" />
        <circle cx="50" cy="30" r="2.5" fill="#FFF" />
        <path d="M26 26 Q32 30 38 26" stroke="#4A4A4A" strokeWidth="1.5" fill="none" />
        <path d="M42 26 Q48 30 54 26" stroke="#4A4A4A" strokeWidth="1.5" fill="none" />
        <motion.path
          d="M52 38 Q54 44 52 48"
          stroke="#87CEEB"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 6], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M27 33 Q32 26 37 33" stroke="#4A4A4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M43 33 Q48 26 53 33" stroke="#4A4A4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.g animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 0.5, repeat: Infinity }}>
          <circle cx="20" cy="26" r="3" fill="#FFD700" />
          <circle cx="60" cy="26" r="3" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        <ellipse cx="32" cy="32" rx="5" ry="7" fill="#4A4A4A" />
        <ellipse cx="48" cy="32" rx="5" ry="7" fill="#4A4A4A" />
        <circle cx="34" cy="30" r="3" fill="#FFF" />
        <circle cx="50" cy="30" r="3" fill="#FFF" />
        <circle cx="31" cy="33" r="1.5" fill="#FFF" opacity="0.6" />
        <circle cx="47" cy="33" r="1.5" fill="#FFF" opacity="0.6" />
      </>
    )}
    
    {/* Cute nose with gradient */}
    <defs>
      <radialGradient id="noseGradient">
        <stop offset="0%" stopColor="#6A6A6A" />
        <stop offset="100%" stopColor="#4A4A4A" />
      </radialGradient>
    </defs>
    <ellipse cx="40" cy="46" rx="6" ry="4" fill="url(#noseGradient)" />
    <ellipse cx="38" cy="45" rx="2" ry="1.5" fill="#8A8A8A" />
    <ellipse cx="42" cy="45" rx="2" ry="1.5" fill="#8A8A8A" />
    
    {/* Nostrils */}
    <ellipse cx="36" cy="46" rx="2" ry="1.5" fill="#2A2A2A" />
    <ellipse cx="44" cy="46" rx="2" ry="1.5" fill="#2A2A2A" />
    
    {/* Smile */}
    <path d={isSad ? "M34 52 Q40 48 46 52" : "M34 50 Q40 55 46 50"} stroke="#4A4A4A" strokeWidth="2" fill="none" strokeLinecap="round" />
    
    {/* Paws */}
    <ellipse cx="30" cy="70" rx="6" ry="4" fill="#8A8A8A" stroke="#4A4A4A" strokeWidth="1.5" />
    <ellipse cx="50" cy="70" rx="6" ry="4" fill="#8A8A8A" stroke="#4A4A4A" strokeWidth="1.5" />
    
    {/* Sparkles */}
    {!isSad && (
      <>
        <motion.circle 
          cx="25" cy="18" r="1.5" fill="#FFD700"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle 
          cx="55" cy="18" r="1.5" fill="#FFD700"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </>
    )}
  </motion.svg>
);

// 🦊 ULTRA CUTE FOX - Pastel Orange with Flower Crown!
export const Fox = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 100 80"
    className={className}
    animate={isWalking ? { y: [0, -8, 0], rotate: [-3, 3, -3] } : { scale: [1, 1.02, 1] }}
    transition={{ duration: isWalking ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shadow */}
    <ellipse cx="50" cy="76" rx="18" ry="4" fill="#00000010" />
    
    {/* Fluffy tail - warna lebih natural, posisi lebih ke kiri agar tidak terpotong */}
    <motion.g
      animate={isWalking ? { rotate: [-15, 15, -15] } : { rotate: [-4, 4, -4] }}
      transition={{ duration: 0.45, repeat: Infinity }}
      style={{ transformOrigin: "68px 54px" }}
    >
      <ellipse cx="78" cy="48" rx="16" ry="13" fill="#D2745E" opacity="0.35" />
      <ellipse cx="76" cy="46" rx="14.5" ry="11.5" fill="#CC6549" />
      <ellipse cx="79" cy="48" rx="10" ry="9.5" fill="#D87B62" />
      <ellipse cx="82" cy="43" rx="8" ry="7.5" fill="#FFFAF5" />
      <ellipse cx="84" cy="44.5" rx="5.5" ry="5.5" fill="#FFF8F0" />
      
      {/* Sparkle on tail */}
      <motion.g
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        <circle cx="85" cy="42" r="1.8" fill="#FFF" opacity="0.85" />
        <circle cx="83.5" cy="44" r="1.3" fill="#FFE0B2" />
      </motion.g>
    </motion.g>
    
    {/* Body with gradient */}
    <ellipse cx="50" cy="58" rx="21" ry="17" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" />
    <ellipse cx="50" cy="58" rx="18" ry="14" fill="url(#foxBodyGrad)" />
    
    {/* White fluffy chest */}
    <ellipse cx="50" cy="62" rx="14" ry="12" fill="#FFFBF5" />
    <ellipse cx="50" cy="63.5" rx="10.5" ry="8.5" fill="#FFF" opacity="0.75" />
    
    {/* Head - perfectly round */}
    <circle cx="50" cy="36" r="22" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" />
    <circle cx="50" cy="36" r="19.5" fill="url(#foxHeadGrad)" />
    
    {/* Ears - symmetric pointy ears */}
    <g>
      {/* Left ear */}
      <path d="M33 27 L27 9 L39 22 Z" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34.5 24 L30 14 L38 21.5 Z" fill="#FFB6C1" opacity="0.7" />
      
      {/* Right ear */}
      <path d="M67 27 L73 9 L61 22 Z" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M65.5 24 L70 14 L62 21.5 Z" fill="#FFB6C1" opacity="0.7" />
    </g>
    
    {/* White face markings */}
    <path d="M50 30 L37 47 Q43 51 50 51 Q57 51 63 47 L50 30 Z" fill="#FFFBF5" />
    <ellipse cx="50" cy="42" rx="14.5" ry="10.5" fill="#FFF" opacity="0.85" />
    
    {/* Rosy cheeks - symmetric */}
    <motion.g
      animate={{ scale: [1, 1.07, 1], opacity: [0.55, 0.75, 0.55] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="34" cy="43.5" rx="6.5" ry="5.5" fill="#FF9AA2" />
      <ellipse cx="66" cy="43.5" rx="6.5" ry="5.5" fill="#FF9AA2" />
      <ellipse cx="32.5" cy="42" rx="2.8" ry="2" fill="#FFC1C8" opacity="0.7" />
      <ellipse cx="67.5" cy="42" rx="2.8" ry="2" fill="#FFC1C8" opacity="0.7" />
    </motion.g>
    
    {/* Eyes - symmetric */}
    {isSad ? (
      <>
        <ellipse cx="41" cy="36" rx="4.5" ry="6.5" fill="#2D2D2D" />
        <ellipse cx="59" cy="36" rx="4.5" ry="6.5" fill="#2D2D2D" />
        <circle cx="42" cy="34" r="2" fill="#FFF" />
        <circle cx="60" cy="34" r="2" fill="#FFF" />
        <circle cx="40.5" cy="37" r="1" fill="#FFF" opacity="0.5" />
        <circle cx="58.5" cy="37" r="1" fill="#FFF" opacity="0.5" />
        {/* Sad eyebrows */}
        <path d="M36 30 Q41 33 46 30" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M54 30 Q59 33 64 30" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Tear */}
        <motion.path
          d="M62 42 Q63.5 48 62 52"
          stroke="#87CEEB"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 8], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M36 37 Q41 30 46 37" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M54 37 Q59 30 64 37" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.g 
          animate={{ scale: [1, 1.25, 1], rotate: [0, 10, 0], opacity: [0.75, 1, 0.75] }} 
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <polygon points="30,29 32,32 35,31 32,34 30,37 28,34 25,31 28,32" fill="#FFD700" />
          <polygon points="70,29 72,32 75,31 72,34 70,37 68,34 65,31 68,32" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        <ellipse cx="41" cy="36" rx="4.5" ry="6.5" fill="#2D2D2D" />
        <ellipse cx="59" cy="36" rx="4.5" ry="6.5" fill="#2D2D2D" />
        {/* Triple sparkle */}
        <circle cx="43" cy="33.5" r="2.3" fill="#FFF" />
        <circle cx="61" cy="33.5" r="2.3" fill="#FFF" />
        <circle cx="39.5" cy="36.5" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="57.5" cy="36.5" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="42.5" cy="39" r="0.8" fill="#FFF" opacity="0.5" />
        <circle cx="60.5" cy="39" r="0.8" fill="#FFF" opacity="0.5" />
      </>
    )}
    
    {/* Hidung hitam kecil - lebih fox-like */}
    <ellipse cx="50" cy="45" rx="3.5" ry="3" fill="#2D2D2D" />
    <ellipse cx="49" cy="44" rx="1.5" ry="1.2" fill="#5A5A5A" />
    <circle cx="50.2" cy="43.8" r="1" fill="#FFF" opacity="0.6" />
    
    {/* Mulut fox - bentuk 3 kecil */}
    <path d="M50 47 Q47 48.5 45 50" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M50 47 Q53 48.5 55 50" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    
    {/* Paws - symmetric */}
    <g>
      {/* Left paw */}
      <ellipse cx="42" cy="72" rx="6" ry="4" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" />
      <ellipse cx="42" cy="72" rx="3.5" ry="2.2" fill="#2D2D2D" opacity="0.15" />
      <circle cx="40" cy="71" r="1" fill="#FF9AA2" />
      <circle cx="42" cy="70.5" r="1" fill="#FF9AA2" />
      <circle cx="44" cy="71" r="1" fill="#FF9AA2" />
      
      {/* Right paw */}
      <ellipse cx="58" cy="72" rx="6" ry="4" fill="#CC6549" stroke="#A8402E" strokeWidth="1.5" />
      <ellipse cx="58" cy="72" rx="3.5" ry="2.2" fill="#2D2D2D" opacity="0.15" />
      <circle cx="56" cy="71" r="1" fill="#FF9AA2" />
      <circle cx="58" cy="70.5" r="1" fill="#FF9AA2" />
      <circle cx="60" cy="71" r="1" fill="#FF9AA2" />
    </g>
    
    {/* Gradients */}
    <defs>
      <radialGradient id="foxBodyGrad" cx="42%" cy="40%">
        <stop offset="0%" stopColor="#D87B62" />
        <stop offset="100%" stopColor="#CC6549" />
      </radialGradient>
      <radialGradient id="foxHeadGrad" cx="38%" cy="35%">
        <stop offset="0%" stopColor="#D87B62" />
        <stop offset="100%" stopColor="#CC6549" />
      </radialGradient>
      <radialGradient id="foxArmGrad" cx="45%" cy="40%">
        <stop offset="0%" stopColor="#D87B62" />
        <stop offset="100%" stopColor="#CC6549" />
      </radialGradient>
    </defs>
    
    {/* Floating hearts when happy */}
    {isHappy && (
      <>
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -16, -26], scale: [0, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.42 }}
          >
            <path
              d="M50 20 C50 18.2 48.2 17.2 47.2 18 C46.2 18.8 46.2 20 47.2 21 L50 23 L52.8 21 C53.8 20 53.8 18.8 52.8 18 C51.8 17.2 50 18.2 50 20"
              fill="#FF9AA2"
              transform={`translate(${i * 8 - 8}, ${i * 3})`}
            />
          </motion.g>
        ))}
      </>
    )}
  </motion.svg>
);

// 🐻 ADORABLE TEDDY BEAR - Pastel Brown with Bow Tie!
export const Bear = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -8, 0], rotate: [-3, 3, -3] } : { scale: [1, 1.02, 1] }}
    transition={{ duration: isWalking ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shadow */}
    <ellipse cx="40" cy="76" rx="20" ry="4" fill="#00000010" />
    
    {/* Body with gradient */}
    <ellipse cx="40" cy="58" rx="21" ry="17" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
    <ellipse cx="40" cy="58" rx="18" ry="14" fill="url(#bearBodyGrad)" />
    
    {/* Belly patch */}
    <ellipse cx="40" cy="60" rx="14" ry="11" fill="#F5E6D3" />
    <ellipse cx="40" cy="60" rx="11" ry="8.5" fill="#FFF8DC" opacity="0.7" />
    
    {/* Head - perfectly round */}
    <circle cx="40" cy="34" r="22" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
    <circle cx="40" cy="34" r="19.5" fill="url(#bearHeadGrad)" />
    
    {/* Ears - symmetric */}
    <g>
      {/* Left ear */}
      <circle cx="21" cy="17" r="10" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
      <circle cx="21" cy="17" r="8.5" fill="url(#bearEarGrad)" />
      <circle cx="21" cy="17" r="5" fill="#8B6F47" opacity="0.15" />
      
      {/* Right ear */}
      <circle cx="59" cy="17" r="10" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
      <circle cx="59" cy="17" r="8.5" fill="url(#bearEarGrad)" />
      <circle cx="59" cy="17" r="5" fill="#8B6F47" opacity="0.15" />
    </g>
    
    {/* Muzzle patch */}
    <ellipse cx="40" cy="42" rx="12" ry="9.5" fill="#F5E6D3" />
    <ellipse cx="40" cy="42" rx="10" ry="7.5" fill="#FFF8DC" />
    
    {/* Rosy cheeks - symmetric */}
    <motion.g
      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="25" cy="39" rx="6.5" ry="5.5" fill="#FFB6C1" />
      <ellipse cx="55" cy="39" rx="6.5" ry="5.5" fill="#FFB6C1" />
      <ellipse cx="23.5" cy="37.5" rx="2.5" ry="2" fill="#FFC1CC" opacity="0.6" />
      <ellipse cx="56.5" cy="37.5" rx="2.5" ry="2" fill="#FFC1CC" opacity="0.6" />
    </motion.g>
    
    {/* Eyes - symmetric */}
    {isSad ? (
      <>
        <ellipse cx="31" cy="31" rx="4.5" ry="5.5" fill="#2D2D2D" />
        <ellipse cx="49" cy="31" rx="4.5" ry="5.5" fill="#2D2D2D" />
        <circle cx="32" cy="29.5" r="2" fill="#FFF" />
        <circle cx="50" cy="29.5" r="2" fill="#FFF" />
        <circle cx="30.5" cy="32" r="1" fill="#FFF" opacity="0.5" />
        <circle cx="48.5" cy="32" r="1" fill="#FFF" opacity="0.5" />
        {/* Sad eyebrows */}
        <path d="M26 26 Q31 29 36 26" stroke="#8B6F47" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M44 26 Q49 29 54 26" stroke="#8B6F47" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Tear */}
        <motion.path
          d="M53 37 Q54 43 53 47"
          stroke="#87CEEB"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 8], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M26 32 Q31 25 36 32" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M44 32 Q49 25 54 32" stroke="#2D2D2D" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.g 
          animate={{ scale: [1, 1.25, 1], rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }} 
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <polygon points="20,24 22,27 25,26 22,29 20,32 18,29 15,26 18,27" fill="#FFD700" />
          <polygon points="60,24 62,27 65,26 62,29 60,32 58,29 55,26 58,27" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        <ellipse cx="31" cy="31" rx="4.5" ry="5.5" fill="#2D2D2D" />
        <ellipse cx="49" cy="31" rx="4.5" ry="5.5" fill="#2D2D2D" />
        {/* Sparkles */}
        <circle cx="33" cy="29" r="2.3" fill="#FFF" />
        <circle cx="51" cy="29" r="2.3" fill="#FFF" />
        <circle cx="29.5" cy="32" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="47.5" cy="32" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="32.5" cy="34" r="0.8" fill="#FFF" opacity="0.5" />
        <circle cx="50.5" cy="34" r="0.8" fill="#FFF" opacity="0.5" />
      </>
    )}
    
    {/* Hidung bulat */}
    <circle cx="40" cy="43" r="5" fill="#2D2D2D" />
    <ellipse cx="38.5" cy="41.5" rx="2" ry="1.5" fill="#5A5A5A" />
    <circle cx="40.5" cy="41.2" r="1.3" fill="#FFF" opacity="0.6" />
    
    {/* Mulut - bentuk 3 kecil dan pendek */}
    <path d="M40 46 Q38 47 36.5 48" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M40 46 Q42 47 43.5 48" stroke="#2D2D2D" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    
    {/* Paws - symmetric */}
    <g>
      {/* Left paw */}
      <ellipse cx="30" cy="72" rx="7" ry="5" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
      <ellipse cx="30" cy="72" rx="4.5" ry="3" fill="#F5E6D3" opacity="0.6" />
      <circle cx="28" cy="71" r="1" fill="#8B6F47" opacity="0.3" />
      <circle cx="30" cy="70.5" r="1" fill="#8B6F47" opacity="0.3" />
      <circle cx="32" cy="71" r="1" fill="#8B6F47" opacity="0.3" />
      
      {/* Right paw */}
      <ellipse cx="50" cy="72" rx="7" ry="5" fill="#B8956A" stroke="#8B6F47" strokeWidth="1.5" />
      <ellipse cx="50" cy="72" rx="4.5" ry="3" fill="#F5E6D3" opacity="0.6" />
      <circle cx="48" cy="71" r="1" fill="#8B6F47" opacity="0.3" />
      <circle cx="50" cy="70.5" r="1" fill="#8B6F47" opacity="0.3" />
      <circle cx="52" cy="71" r="1" fill="#8B6F47" opacity="0.3" />
    </g>
    
    {/* Gradients */}
    <defs>
      <radialGradient id="bearBodyGrad" cx="42%" cy="38%">
        <stop offset="0%" stopColor="#C9AA7E" />
        <stop offset="100%" stopColor="#B8956A" />
      </radialGradient>
      <radialGradient id="bearHeadGrad" cx="38%" cy="32%">
        <stop offset="0%" stopColor="#C9AA7E" />
        <stop offset="100%" stopColor="#B8956A" />
      </radialGradient>
      <radialGradient id="bearEarGrad" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#C9AA7E" />
        <stop offset="100%" stopColor="#B8956A" />
      </radialGradient>
      <radialGradient id="bearArmGrad" cx="45%" cy="40%">
        <stop offset="0%" stopColor="#C9AA7E" />
        <stop offset="100%" stopColor="#B8956A" />
      </radialGradient>
    </defs>
    
    {/* Floating hearts when happy */}
    {isHappy && (
      <>
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -18, -28], scale: [0, 1.1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          >
            <path
              d="M40 16 C40 14.2 38.2 13.2 37.2 14 C36.2 14.8 36.2 16 37.2 17 L40 19 L42.8 17 C43.8 16 43.8 14.8 42.8 14 C41.8 13.2 40 14.2 40 16"
              fill="#FF69B4"
              transform={`translate(${i * 9 - 9}, ${i * 3.5})`}
            />
          </motion.g>
        ))}
      </>
    )}
  </motion.svg>
);

// SUPER CUTE SHIBA DOG - Gen Z & Kids Approved! 🐕✨
export const Dog = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -6, 0], rotate: [-2, 2, -2] } : { scale: [1, 1.02, 1] }}
    transition={{ duration: isWalking ? 0.5 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <ellipse cx="40" cy="76" rx="18" ry="4" fill="#00000010" />
    
    {/* Curly fluffy tail - shiba style */}
    <motion.g
      animate={isWalking ? { rotate: [-15, 15, -15] } : { rotate: [-5, 5, -5] }}
      transition={{ duration: 0.3, repeat: Infinity }}
      style={{ transformOrigin: "55px 56px" }}
    >
      <path d="M56 54 Q65 48 68 42 Q70 38 68 34" 
        stroke="#E8B87C" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M56 54 Q65 48 68 42 Q70 38 68 34" 
        stroke="#FFF8E7" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="68" cy="36" rx="5" ry="6" fill="#E8B87C" />
    </motion.g>
    
    {/* Round fluffy body */}
    <ellipse cx="40" cy="54" rx="23" ry="19" fill="#E8B87C" stroke="#D4A574" strokeWidth="2" />
    <ellipse cx="40" cy="54" rx="20" ry="16" fill="url(#shibaBodyGradient)" />
    
    {/* White fluffy chest marking */}
    <ellipse cx="40" cy="58" rx="15" ry="13" fill="#FFFBF0" />
    <ellipse cx="40" cy="58" rx="12" ry="10" fill="#FFF" opacity="0.8" />
    
    {/* BIG round head - shiba style */}
    <circle cx="40" cy="30" r="25" fill="#E8B87C" stroke="#D4A574" strokeWidth="2" />
    <circle cx="40" cy="30" r="22" fill="url(#shibaHeadGradient)" />
    
    {/* White face markings - signature shiba pattern */}
    <ellipse cx="40" cy="40" rx="17" ry="15" fill="#FFFBF0" />
    <ellipse cx="40" cy="40" rx="14" ry="12" fill="#FFF" opacity="0.9" />
    <ellipse cx="40" cy="34" rx="11" ry="9" fill="#FFFBF0" />
    
    {/* Cute pointy ears with fluffy inner */}
    <g>
      <path d="M16 22 Q12 6 24 14" fill="#E8B87C" stroke="#D4A574" strokeWidth="2" strokeLinejoin="round" />
      <path d="M18 20 Q16 10 23 16" fill="#FFE4C4" />
      <path d="M19 19 Q18 12 22 16" fill="#FFFBF0" opacity="0.6" />
      
      <path d="M64 22 Q68 6 56 14" fill="#E8B87C" stroke="#D4A574" strokeWidth="2" strokeLinejoin="round" />
      <path d="M62 20 Q64 10 57 16" fill="#FFE4C4" />
      <path d="M61 19 Q62 12 58 16" fill="#FFFBF0" opacity="0.6" />
    </g>
    
    {/* BIG rosy cheeks - extra pink! */}
    <motion.g
      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="22" cy="40" rx="8" ry="7" fill="#FF9AA2" />
      <ellipse cx="58" cy="40" rx="8" ry="7" fill="#FF9AA2" />
      <ellipse cx="20" cy="38" rx="4" ry="3" fill="#FFC1C8" opacity="0.7" />
      <ellipse cx="56" cy="38" rx="4" ry="3" fill="#FFC1C8" opacity="0.7" />
    </motion.g>
    
    {/* HUGE sparkling eyes - kawaii overload */}
    {isSad ? (
      <>
        <ellipse cx="32" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <ellipse cx="48" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <circle cx="33" cy="26" r="2" fill="#FFF" />
        <circle cx="49" cy="26" r="2" fill="#FFF" />
        <circle cx="31" cy="29" r="1" fill="#FFF" opacity="0.6" />
        <circle cx="47" cy="29" r="1" fill="#FFF" opacity="0.6" />
        <path d="M26 22 Q32 26 38 22" stroke="#D4A574" strokeWidth="2" fill="none" />
        <path d="M42 22 Q48 26 54 22" stroke="#D4A574" strokeWidth="2" fill="none" />
        <motion.path
          d="M52 36 Q54 42 52 46"
          stroke="#87CEEB"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 8], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M27 29 Q32 21 37 29" stroke="#2D2D2D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M43 29 Q48 21 53 29" stroke="#2D2D2D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <motion.g 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 12, 0], opacity: [0.7, 1, 0.7] }} 
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <polygon points="20,21 22,24 25,23 22,26 20,29 18,26 15,23 18,24" fill="#FFD700" />
          <polygon points="60,21 62,24 65,23 62,26 60,29 58,26 55,23 58,24" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        <ellipse cx="32" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <ellipse cx="48" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        {/* Triple sparkle effect */}
        <circle cx="34" cy="26" r="2.5" fill="#FFF" />
        <circle cx="50" cy="26" r="2.5" fill="#FFF" />
        <circle cx="30" cy="29" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="46" cy="29" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="33" cy="31" r="0.8" fill="#FFF" opacity="0.5" />
        <circle cx="49" cy="31" r="0.8" fill="#FFF" opacity="0.5" />
      </>
    )}
    
    {/* Shiny button nose */}
    <ellipse cx="40" cy="40" rx="5" ry="4" fill="#2D2D2D" />
    <ellipse cx="40" cy="39" rx="3" ry="2" fill="#4A4A4A" />
    <circle cx="41" cy="38" r="1.5" fill="#FFF" opacity="0.9" />
    
    {/* Happy doggy smile with tongue */}
    <path d="M40 43 L40 46" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
    <path d={isSad ? "M34 48 Q40 44 46 48" : "M34 46 Q40 53 46 46"} 
      stroke="#D4A574" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    
    {/* Cute tongue - always visible when happy or normal */}
    {!isSad && (
      <motion.g
        animate={{ y: [0, 1.5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      >
        <ellipse cx="40" cy="50" rx="5" ry="4" fill="#FF8A80" />
        <ellipse cx="40" cy="49" rx="3" ry="2" fill="#FFB6B6" opacity="0.6" />
      </motion.g>
    )}
    
    {/* Cute rounded paws with fluffy detail */}
    <g>
      <ellipse cx="30" cy="70" rx="8" ry="6" fill="#E8B87C" stroke="#D4A574" strokeWidth="1.5" />
      <ellipse cx="30" cy="70" rx="5" ry="4" fill="#FFE4C4" opacity="0.6" />
      <circle cx="28" cy="69" r="1.2" fill="#2D2D2D" opacity="0.3" />
      <circle cx="30" cy="68" r="1.2" fill="#2D2D2D" opacity="0.3" />
      <circle cx="32" cy="69" r="1.2" fill="#2D2D2D" opacity="0.3" />
      
      <ellipse cx="50" cy="70" rx="8" ry="6" fill="#E8B87C" stroke="#D4A574" strokeWidth="1.5" />
      <ellipse cx="50" cy="70" rx="5" ry="4" fill="#FFE4C4" opacity="0.6" />
      <circle cx="48" cy="69" r="1.2" fill="#2D2D2D" opacity="0.3" />
      <circle cx="50" cy="68" r="1.2" fill="#2D2D2D" opacity="0.3" />
      <circle cx="52" cy="69" r="1.2" fill="#2D2D2D" opacity="0.3" />
    </g>
    
    {/* Gradients */}
    <defs>
      <radialGradient id="shibaBodyGradient" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#F4D5A6" />
        <stop offset="100%" stopColor="#E8B87C" />
      </radialGradient>
      <radialGradient id="shibaHeadGradient" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#F4D5A6" />
        <stop offset="100%" stopColor="#E8B87C" />
      </radialGradient>
    </defs>
    
    {/* Floating hearts when happy */}
    {isHappy && (
      <>
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], y: [0, -18, -28], scale: [0, 1.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            <path
              d="M40 18 C40 16 38 15 37 16 C36 17 36 18 37 19 L40 21 L43 19 C44 18 44 17 43 16 C42 15 40 16 40 18"
              fill="#FF9AA2"
              transform={`translate(${i * 9 - 9}, ${i * 3})`}
            />
          </motion.g>
        ))}
      </>
    )}
  </motion.svg>
);

// SUPER CUTE BABY DUCK - Gen Z & Kids Approved! 🦆✨
export const Duck = ({ size = 80, isWalking = false, isSad = false, isHappy = false, className = "" }: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -8, 0], rotate: [-4, 4, -4] } : { scale: [1, 1.02, 1] }}
    transition={{ duration: isWalking ? 0.5 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    <ellipse cx="40" cy="76" rx="16" ry="4" fill="#00000010" />
    
    {/* Round fluffy body */}
    <ellipse cx="40" cy="54" rx="23" ry="19" fill="#FFE082" stroke="#FFD54F" strokeWidth="2" />
    <ellipse cx="40" cy="54" rx="20" ry="16" fill="url(#duckBodyGradient)" />
    
    {/* Fluffy texture circles on body */}
    <circle cx="35" cy="52" r="3" fill="#FFF" opacity="0.3" />
    <circle cx="45" cy="56" r="2.5" fill="#FFF" opacity="0.3" />
    <circle cx="38" cy="58" r="2" fill="#FFF" opacity="0.3" />
    
    {/* Cute wing with feather detail */}
    <motion.g
      animate={isWalking ? { rotate: [-12, 12, -12] } : { rotate: [-3, 3, -3] }}
      transition={{ duration: 0.3, repeat: Infinity }}
      style={{ transformOrigin: "56px 52px" }}
    >
      <ellipse cx="56" cy="52" rx="9" ry="15" fill="#FFCA28" stroke="#FFD54F" strokeWidth="1.5" />
      <ellipse cx="56" cy="52" rx="6" ry="12" fill="#FFE082" opacity="0.7" />
      <path d="M56 48 Q58 52 56 56" stroke="#FFD54F" strokeWidth="1" opacity="0.5" />
      <path d="M54 50 Q56 52 54 54" stroke="#FFD54F" strokeWidth="1" opacity="0.5" />
    </motion.g>
    
    {/* BIG round head */}
    <circle cx="40" cy="30" r="19" fill="#FFE082" stroke="#FFD54F" strokeWidth="2" />
    <circle cx="40" cy="30" r="16" fill="url(#duckHeadGradient)" />
    
    {/* Fluffy hair tuft - baby duck style! */}
    <g>
      <ellipse cx="40" cy="14" rx="6" ry="7" fill="#FFCA28" />
      <ellipse cx="36" cy="16" rx="4" ry="5" fill="#FFE082" />
      <ellipse cx="44" cy="16" rx="4" ry="5" fill="#FFE082" />
      <circle cx="40" cy="13" r="3" fill="#FFF" opacity="0.4" />
    </g>
    
    {/* BIG rosy cheeks */}
    <motion.g
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="26" cy="34" rx="7" ry="6" fill="#FFAB91" />
      <ellipse cx="54" cy="34" rx="7" ry="6" fill="#FFAB91" />
      <ellipse cx="24" cy="32" rx="3" ry="2" fill="#FFCCBC" opacity="0.7" />
      <ellipse cx="52" cy="32" rx="3" ry="2" fill="#FFCCBC" opacity="0.7" />
    </motion.g>
    
    {/* HUGE sparkling eyes */}
    {isSad ? (
      <>
        <ellipse cx="34" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <ellipse cx="46" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <circle cx="35" cy="26" r="2" fill="#FFF" />
        <circle cx="47" cy="26" r="2" fill="#FFF" />
        <circle cx="33" cy="29" r="1" fill="#FFF" opacity="0.6" />
        <circle cx="45" cy="29" r="1" fill="#FFF" opacity="0.6" />
        <path d="M28 22 Q34 26 40 22" stroke="#FFD54F" strokeWidth="2" fill="none" />
        <path d="M40 22 Q46 26 52 22" stroke="#FFD54F" strokeWidth="2" fill="none" />
        <motion.path
          d="M50 34 Q52 40 50 44"
          stroke="#87CEEB"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          animate={{ y: [0, 8], opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        <path d="M30 29 Q34 21 38 29" stroke="#2D2D2D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M42 29 Q46 21 50 29" stroke="#2D2D2D" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <motion.g 
          animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0], opacity: [0.7, 1, 0.7] }} 
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <polygon points="24,21 26,24 29,23 26,26 24,29 22,26 19,23 22,24" fill="#FFD700" />
          <polygon points="56,21 58,24 61,23 58,26 56,29 54,26 51,23 54,24" fill="#FFD700" />
        </motion.g>
      </>
    ) : (
      <>
        <ellipse cx="34" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        <ellipse cx="46" cy="28" rx="5" ry="6" fill="#2D2D2D" />
        {/* Triple sparkle effect */}
        <circle cx="36" cy="26" r="2.5" fill="#FFF" />
        <circle cx="48" cy="26" r="2.5" fill="#FFF" />
        <circle cx="32" cy="29" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="44" cy="29" r="1.2" fill="#FFF" opacity="0.7" />
        <circle cx="35" cy="31" r="0.8" fill="#FFF" opacity="0.5" />
        <circle cx="47" cy="31" r="0.8" fill="#FFF" opacity="0.5" />
      </>
    )}
    
    {/* Adorable round beak with gradient */}
    <ellipse cx="40" cy="40" rx="10" ry="6" fill="url(#beakGradient)" stroke="#FF9800" strokeWidth="1.5" />
    <ellipse cx="40" cy="39" rx="7" ry="4" fill="#FFAB91" />
    <ellipse cx="40" cy="38" rx="4" ry="2" fill="#FFCCBC" opacity="0.6" />
    
    {/* Cute smile line */}
    {!isSad && (
      <path d="M34 42 Q40 44 46 42" stroke="#FF9800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    )}
    
    {/* Little nostrils */}
    <circle cx="37" cy="39" r="1" fill="#FF9800" />
    <circle cx="43" cy="39" r="1" fill="#FF9800" />
    
    {/* Webbed feet - extra cute! */}
    <g>
      <ellipse cx="32" cy="74" rx="8" ry="4" fill="#FF8A65" stroke="#FF7043" strokeWidth="1" />
      <path d="M28 72 L28 76 M32 72 L32 76 M36 72 L36 76" 
        stroke="#FF7043" strokeWidth="1" />
      <path d="M28 76 Q32 78 36 76" stroke="#FF7043" strokeWidth="1" fill="none" />
      
      <ellipse cx="48" cy="74" rx="8" ry="4" fill="#FF8A65" stroke="#FF7043" strokeWidth="1" />
      <path d="M44 72 L44 76 M48 72 L48 76 M52 72 L52 76" 
        stroke="#FF7043" strokeWidth="1" />
      <path d="M44 76 Q48 78 52 76" stroke="#FF7043" strokeWidth="1" fill="none" />
    </g>
    
    {/* Gradients */}
    <defs>
      <radialGradient id="duckBodyGradient" cx="40%" cy="35%">
        <stop offset="0%" stopColor="#FFF9C4" />
        <stop offset="100%" stopColor="#FFE082" />
      </radialGradient>
      <radialGradient id="duckHeadGradient" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#FFF9C4" />
        <stop offset="100%" stopColor="#FFE082" />
      </radialGradient>
      <linearGradient id="beakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFAB91" />
        <stop offset="100%" stopColor="#FF8A65" />
      </linearGradient>
    </defs>
    
    {/* Floating bubbles when happy */}
    {isHappy && (
      <>
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx={35 + i * 4}
            cy={20}
            r={1.5 + i * 0.3}
            fill="#87CEEB"
            opacity="0.6"
            initial={{ y: 0, scale: 0 }}
            animate={{ y: [-5, -20], scale: [0, 1, 0.5], opacity: [0.6, 0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </>
    )}
  </motion.svg>
);

// Cute Lamb - fluffy white sheep
export const Lamb = ({ 
  size = 80, 
  isWalking = false, 
  isSad = false, 
  isHappy = false, 
  className = "" 
}: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -5, 0] } : { scale: [1, 1.01, 1] }}
    transition={{ duration: isWalking ? 0.6 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shadow */}
    <ellipse cx="40" cy="76" rx="18" ry="3" fill="#00000015" />
    
    {/* Legs - simple and cute */}
    <rect x="28" y="64" width="6" height="10" rx="3" fill="#2C2C2C" />
    <rect x="46" y="64" width="6" height="10" rx="3" fill="#2C2C2C" />
    
    {/* Hooves */}
    <ellipse cx="31" cy="73" rx="3" ry="2" fill="#1A1A1A" />
    <ellipse cx="49" cy="73" rx="3" ry="2" fill="#1A1A1A" />
    
    {/* SUPER FLUFFY Body - extra gemuk! */}
    <g>
      {/* Layer 1 - Base fluffy layer */}
      <circle cx="40" cy="54" r="16" fill="#FEFEFE" />
      <circle cx="28" cy="55" r="13" fill="#FEFEFE" />
      <circle cx="52" cy="55" r="13" fill="#FEFEFE" />
      <circle cx="34" cy="58" r="11" fill="#FEFEFE" />
      <circle cx="46" cy="58" r="11" fill="#FEFEFE" />
      <circle cx="40" cy="60" r="10" fill="#FEFEFE" />
      
      {/* Layer 2 - Extra fluff around edges */}
      <circle cx="24" cy="52" r="9" fill="#FFF" opacity="0.8" />
      <circle cx="56" cy="52" r="9" fill="#FFF" opacity="0.8" />
      <circle cx="22" cy="58" r="7" fill="#FFF" opacity="0.7" />
      <circle cx="58" cy="58" r="7" fill="#FFF" opacity="0.7" />
      <circle cx="32" cy="62" r="8" fill="#FFF" opacity="0.7" />
      <circle cx="48" cy="62" r="8" fill="#FFF" opacity="0.7" />
      
      {/* Layer 3 - Top fluff for extra volume */}
      <circle cx="40" cy="50" r="10" fill="#FFF" opacity="0.6" />
      <circle cx="34" cy="52" r="7" fill="#FFF" opacity="0.5" />
      <circle cx="46" cy="52" r="7" fill="#FFF" opacity="0.5" />
      
      {/* Soft highlights for depth */}
      <circle cx="38" cy="53" r="5" fill="#FFFEF8" opacity="0.4" />
      <circle cx="42" cy="56" r="4" fill="#FFFEF8" opacity="0.4" />
    </g>
    
    {/* Head - cream colored & chubby */}
    <ellipse cx="40" cy="36" rx="17" ry="16" fill="#FFEFD5" />
    <ellipse cx="40" cy="36" rx="15" ry="14" fill="#FFF8DC" />
    
    {/* EXTRA Fluffy wool on head - super lembut! */}
    <g>
      {/* Main wool puffs */}
      <circle cx="32" cy="20" r="8" fill="#FEFEFE" />
      <circle cx="40" cy="18" r="9" fill="#FEFEFE" />
      <circle cx="48" cy="20" r="8" fill="#FEFEFE" />
      <circle cx="36" cy="22" r="6" fill="#FEFEFE" />
      <circle cx="44" cy="22" r="6" fill="#FEFEFE" />
      
      {/* Extra soft layer */}
      <circle cx="28" cy="22" r="5" fill="#FFF" opacity="0.8" />
      <circle cx="52" cy="22" r="5" fill="#FFF" opacity="0.8" />
      <circle cx="40" cy="20" r="5" fill="#FFF" opacity="0.7" />
      
      {/* Tiny fluff details */}
      <circle cx="34" cy="18" r="3" fill="#FFFEF8" opacity="0.6" />
      <circle cx="46" cy="18" r="3" fill="#FFFEF8" opacity="0.6" />
      <circle cx="38" cy="24" r="2.5" fill="#FFFEF8" opacity="0.5" />
      <circle cx="42" cy="24" r="2.5" fill="#FFFEF8" opacity="0.5" />
    </g>
    
    {/* Ears - droopy and cute */}
    <ellipse cx="24" cy="34" rx="5" ry="8" fill="#FFEFD5" transform="rotate(-20 24 34)" />
    <ellipse cx="24" cy="34" rx="3" ry="5" fill="#FFE4B5" transform="rotate(-20 24 34)" />
    <ellipse cx="56" cy="34" rx="5" ry="8" fill="#FFEFD5" transform="rotate(20 56 34)" />
    <ellipse cx="56" cy="34" rx="3" ry="5" fill="#FFE4B5" transform="rotate(20 56 34)" />
    
    {/* Cheeks - soft pink chubby */}
    <motion.g
      animate={{ opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="28" cy="40" rx="6" ry="5" fill="#FFB6C1" />
      <ellipse cx="52" cy="40" rx="6" ry="5" fill="#FFB6C1" />
      <ellipse cx="27" cy="39" rx="3" ry="2" fill="#FFC1CC" opacity="0.6" />
      <ellipse cx="51" cy="39" rx="3" ry="2" fill="#FFC1CC" opacity="0.6" />
    </motion.g>
    
    {/* Eyes - symmetrical and cute */}
    {isSad ? (
      <>
        <ellipse cx="34" cy="34" rx="3" ry="4" fill="#2C2C2C" />
        <ellipse cx="46" cy="34" rx="3" ry="4" fill="#2C2C2C" />
        <circle cx="35" cy="33" r="1.2" fill="#FFF" />
        <circle cx="47" cy="33" r="1.2" fill="#FFF" />
        {/* Sad eyebrows */}
        <path d="M31 30 Q34 32 37 30" stroke="#CDB891" strokeWidth="1.5" fill="none" />
        <path d="M43 30 Q46 32 49 30" stroke="#CDB891" strokeWidth="1.5" fill="none" />
        {/* Tear */}
        <motion.ellipse
          cx="48"
          cy="38"
          rx="1.5"
          ry="2"
          fill="#87CEEB"
          animate={{ cy: [38, 42], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        {/* Happy closed eyes */}
        <path d="M31 34 Q34 31 37 34" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 34 Q46 31 49 34" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="34" cy="34" rx="3" ry="4" fill="#2C2C2C" />
        <ellipse cx="46" cy="34" rx="3" ry="4" fill="#2C2C2C" />
        <circle cx="35" cy="32.5" r="1.5" fill="#FFF" />
        <circle cx="47" cy="32.5" r="1.5" fill="#FFF" />
        <circle cx="33.5" cy="35" r="0.7" fill="#FFF" opacity="0.6" />
        <circle cx="45.5" cy="35" r="0.7" fill="#FFF" opacity="0.6" />
      </>
    )}
    
    {/* Nose - tiny and cute */}
    <ellipse cx="40" cy="42" rx="3" ry="2.5" fill="#2C2C2C" />
    <circle cx="40.5" cy="41.5" r="1" fill="#4A4A4A" />
    
    {/* Mouth - sweet smile */}
    <path 
      d={isSad ? "M36 45 Q40 43 44 45" : "M36 45 Q40 48 44 45"} 
      stroke="#2C2C2C" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinecap="round" 
    />
    
    {/* Happy hearts */}
    {isHappy && (
      <>
        {[0, 1].map((i) => (
          <motion.path
            key={i}
            d="M40 22 C40 20 38.5 19 37.5 20 C36.5 21 36.5 22 37.5 23 L40 25 L42.5 23 C43.5 22 43.5 21 42.5 20 C41.5 19 40 20 40 22"
            fill="#FFB6C1"
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: [0, -12, -20], 
              scale: [0, 1, 0.5] 
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            transform={`translate(${i * 8 - 4}, 0)`}
          />
        ))}
      </>
    )}
    
    {/* Floating fluff particles for extra softness */}
    <motion.g
      animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1, 0.8] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <circle cx="20" cy="48" r="1.5" fill="#FFF" />
      <circle cx="60" cy="50" r="1.5" fill="#FFF" />
      <circle cx="26" cy="46" r="1" fill="#FFF" />
      <circle cx="54" cy="48" r="1" fill="#FFF" />
    </motion.g>
  </motion.svg>
);
// Cute Hedgehog - brown with spikes
export const Hedgehog = ({ 
  size = 80, 
  isWalking = false, 
  isSad = false, 
  isHappy = false, 
  className = "" 
}: AnimalProps) => (
  <motion.svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    className={className}
    animate={isWalking ? { y: [0, -4, 0] } : { scale: [1, 1.01, 1] }}
    transition={{ duration: isWalking ? 0.5 : 3, repeat: Infinity, ease: "easeInOut" }}
  >
    {/* Shadow */}
    <ellipse cx="40" cy="76" rx="16" ry="3" fill="#00000015" />
    
    {/* Body - rounded back */}
    <ellipse cx="40" cy="48" rx="24" ry="20" fill="#8B7355" />
    
    {/* Spikes - cute rounded style */}
    <g>
      {/* Back row - bigger spikes */}
      <circle cx="40" cy="28" r="4.5" fill="#6B5D4F" />
      <circle cx="32" cy="30" r="4" fill="#6B5D4F" />
      <circle cx="48" cy="30" r="4" fill="#6B5D4F" />
      <circle cx="24" cy="34" r="3.5" fill="#6B5D4F" />
      <circle cx="56" cy="34" r="3.5" fill="#6B5D4F" />
      
      {/* Middle row */}
      <circle cx="18" cy="40" r="3.5" fill="#6B5D4F" />
      <circle cx="62" cy="40" r="3.5" fill="#6B5D4F" />
      <circle cx="28" cy="36" r="3" fill="#6B5D4F" />
      <circle cx="52" cy="36" r="3" fill="#6B5D4F" />
      
      {/* Side spikes */}
      <circle cx="16" cy="48" r="3" fill="#6B5D4F" />
      <circle cx="64" cy="48" r="3" fill="#6B5D4F" />
      <circle cx="18" cy="54" r="2.5" fill="#6B5D4F" />
      <circle cx="62" cy="54" r="2.5" fill="#6B5D4F" />
      
      {/* Highlights - cute shine effect */}
      <circle cx="40" cy="27" r="2" fill="#A89580" opacity="0.7" />
      <circle cx="32" cy="29" r="1.8" fill="#A89580" opacity="0.7" />
      <circle cx="48" cy="29" r="1.8" fill="#A89580" opacity="0.7" />
      <circle cx="24" cy="33" r="1.5" fill="#A89580" opacity="0.7" />
      <circle cx="56" cy="33" r="1.5" fill="#A89580" opacity="0.7" />
    </g>
    
    {/* Face - cream colored */}
    <ellipse cx="40" cy="56" rx="18" ry="16" fill="#FFEFD5" />
    <ellipse cx="40" cy="56" rx="16" ry="14" fill="#FFF8DC" />
    
    {/* Ears - small and rounded */}
    <ellipse cx="30" cy="48" rx="4" ry="5" fill="#FFEFD5" />
    <ellipse cx="30" cy="48" rx="2" ry="3" fill="#FFE4B5" />
    <ellipse cx="50" cy="48" rx="4" ry="5" fill="#FFEFD5" />
    <ellipse cx="50" cy="48" rx="2" ry="3" fill="#FFE4B5" />
    
    {/* Eyes - symmetrical and cute */}
    {isSad ? (
      <>
        <ellipse cx="34" cy="54" rx="3" ry="4" fill="#2C2C2C" />
        <ellipse cx="46" cy="54" rx="3" ry="4" fill="#2C2C2C" />
        <circle cx="35" cy="53" r="1.2" fill="#FFF" />
        <circle cx="47" cy="53" r="1.2" fill="#FFF" />
        {/* Sad eyebrows */}
        <path d="M31 50 Q34 52 37 50" stroke="#8B7355" strokeWidth="1.5" fill="none" />
        <path d="M43 50 Q46 52 49 50" stroke="#8B7355" strokeWidth="1.5" fill="none" />
        {/* Tear */}
        <motion.ellipse
          cx="48"
          cy="58"
          rx="1.5"
          ry="2"
          fill="#87CEEB"
          animate={{ cy: [58, 62], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </>
    ) : isHappy ? (
      <>
        {/* Happy closed eyes */}
        <path d="M31 54 Q34 51 37 54" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M43 54 Q46 51 49 54" stroke="#2C2C2C" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="34" cy="54" rx="3" ry="4" fill="#2C2C2C" />
        <ellipse cx="46" cy="54" rx="3" ry="4" fill="#2C2C2C" />
        <circle cx="35" cy="52.5" r="1.5" fill="#FFF" />
        <circle cx="47" cy="52.5" r="1.5" fill="#FFF" />
        <circle cx="33.5" cy="55" r="0.7" fill="#FFF" opacity="0.6" />
        <circle cx="45.5" cy="55" r="0.7" fill="#FFF" opacity="0.6" />
      </>
    )}
    
    {/* Nose - small and cute */}
    <ellipse cx="40" cy="60" rx="3" ry="2.5" fill="#2C2C2C" />
    <circle cx="40.5" cy="59.5" r="1" fill="#4A4A4A" />
    
    {/* Mouth - sweet smile */}
    <path 
      d={isSad ? "M36 63 Q40 61 44 63" : "M36 63 Q40 66 44 63"} 
      stroke="#2C2C2C" 
      strokeWidth="1.5" 
      fill="none" 
      strokeLinecap="round" 
    />
    
    {/* Cheeks - soft pink */}
    <motion.g
      animate={{ opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <ellipse cx="30" cy="58" rx="4" ry="3" fill="#FFB6C1" />
      <ellipse cx="50" cy="58" rx="4" ry="3" fill="#FFB6C1" />
    </motion.g>
    
    {/* Feet - tiny and symmetrical */}
    <ellipse cx="32" cy="71" rx="5" ry="3" fill="#FFEFD5" />
    <ellipse cx="48" cy="71" rx="5" ry="3" fill="#FFEFD5" />
    <ellipse cx="32" cy="71" rx="2.5" ry="1.5" fill="#FFE4B5" />
    <ellipse cx="48" cy="71" rx="2.5" ry="1.5" fill="#FFE4B5" />
    
    {/* Tiny toe details */}
    <circle cx="30" cy="71" r="0.5" fill="#2C2C2C" opacity="0.3" />
    <circle cx="32" cy="70.5" r="0.5" fill="#2C2C2C" opacity="0.3" />
    <circle cx="34" cy="71" r="0.5" fill="#2C2C2C" opacity="0.3" />
    <circle cx="46" cy="71" r="0.5" fill="#2C2C2C" opacity="0.3" />
    <circle cx="48" cy="70.5" r="0.5" fill="#2C2C2C" opacity="0.3" />
    <circle cx="50" cy="71" r="0.5" fill="#2C2C2C" opacity="0.3" />
    
    {/* Happy hearts */}
    {isHappy && (
      <>
        {[0, 1].map((i) => (
          <motion.path
            key={i}
            d="M40 42 C40 40 38.5 39 37.5 40 C36.5 41 36.5 42 37.5 43 L40 45 L42.5 43 C43.5 42 43.5 41 42.5 40 C41.5 39 40 40 40 42"
            fill="#FFB6C1"
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: [0, -12, -20], 
              scale: [0, 1, 0.5] 
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
            transform={`translate(${i * 8 - 4}, 0)`}
          />
        ))}
      </>
    )}
  </motion.svg>
);

export type AnimalId = "penguin" | "cow" | "fox" | "bear" | "dog" | "duck" | "lamb" | "hedgehog";

export const ANIMALS: { id: AnimalId; name: string; component: React.FC<AnimalProps> }[] = [
  { id: "penguin", name: "Penguin", component: CardPenguin },
  { id: "cow", name: "Cow", component: Cow },
  { id: "fox", name: "Fox", component: Fox },
  { id: "bear", name: "Bear", component: Bear },
  { id: "dog", name: "Shiba", component: Dog },
  { id: "duck", name: "Ducky", component: Duck },
  { id: "lamb", name: "Lamb", component: Lamb },
  { id: "hedgehog", name: "Hedgie", component: Hedgehog },
];
