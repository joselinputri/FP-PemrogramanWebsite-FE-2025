import { motion } from "framer-motion";
import { Penguin } from "../animals/Penguin";
import { CuteButton } from "../ui/CuteButton";
import { GameBackground } from "./GameBackground";
import { Home, RotateCcw, Share2, Clock, Star, Trophy, Sparkles, Heart } from "lucide-react";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useEffect } from "react";

interface ScoreboardProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  playerName: string;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

// Custom star icon
const StarIcon = ({ size = 24, color = "#FFD700" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <polygon 
      points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" 
      fill={color}
      stroke="#E5A800"
      strokeWidth="1"
    />
    <polygon 
      points="12,5 13.5,9 17,9 14,12 15,16 12,14 9,16 10,12 7,9 10.5,9" 
      fill="#FFEC8B"
    />
  </svg>
);

// Floating heart component
const FloatingHeart = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, bottom: 0 }}
    initial={{ y: 0, opacity: 0, scale: 0 }}
    animate={{ 
      y: -200 - Math.random() * 100,
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.5],
      x: (Math.random() - 0.5) * 50
    }}
    transition={{ 
      duration: 3,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 2
    }}
  >
    <Heart size={16} fill="#FF6B9D" color="#FF6B9D" />
  </motion.div>
);

export const Scoreboard = ({
  score,
  correctAnswers,
  totalQuestions,
  timeSpent,
  playerName,
  onPlayAgain,
  onGoHome,
}: ScoreboardProps) => {
  const { playSound } = useSoundEffects(true);
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const coinsEarned = Math.floor(score / 10) + (correctAnswers * 10);
  
  useEffect(() => {
    // Play win/lose sound
    if (percentage >= 60) {
      playSound("win");
    } else {
      playSound("lose");
    }
  }, [percentage, playSound]);
  
  const getGrade = () => {
    if (percentage === 100) return { grade: "S", color: "#FFD700", bgColor: "from-yellow-100 to-yellow-200", message: "PERFECT MEMORY!" };
    if (percentage >= 80) return { grade: "A", color: "#4CAF50", bgColor: "from-green-100 to-green-200", message: "AMAZING JOB!" };
    if (percentage >= 60) return { grade: "B", color: "#2196F3", bgColor: "from-blue-100 to-blue-200", message: "GREAT EFFORT!" };
    if (percentage >= 40) return { grade: "C", color: "#FF9800", bgColor: "from-orange-100 to-orange-200", message: "KEEP TRYING!" };
    return { grade: "D", color: "#F44336", bgColor: "from-red-100 to-red-200", message: "PRACTICE MORE!" };
  };

  const gradeInfo = getGrade();
  
  // Format time nicely
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${seconds} seconds`;
  };
  const timeString = formatTime(timeSpent);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Beautiful background */}
      <GameBackground />
      
      {/* Floating hearts - elegant celebration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {percentage >= 60 && [...Array(12)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.3} x={10 + (i * 7)} />
        ))}
      </div>

      {/* Elegant sparkle effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <Sparkles size={16} className="text-warning" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-card rounded-3xl p-8 border-4 border-border shadow-2xl max-w-lg w-full mx-4 relative overflow-hidden z-10"
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
      >
        {/* Decorative sparkles */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-warning" size={24} />
        </motion.div>
        <motion.div
          className="absolute top-4 left-4"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="text-primary" size={24} />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-4">
          <motion.h1
            className="font-pixel text-xl text-foreground mb-1"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            GAME COMPLETE!
          </motion.h1>
          <motion.p
            className="text-muted-foreground font-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Great effort, <span className="text-primary font-semibold">{playerName || "Player"}</span>!
          </motion.p>
          <motion.p
            className="text-sm text-muted-foreground font-body mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You finished in <span className="text-warning font-semibold">{timeString}</span>
          </motion.p>
        </div>

        {/* Penguin mascot - centered */}
        <motion.div
          className="flex justify-center mb-4"
          animate={{ y: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Penguin size={90} isHappy={percentage >= 60} isSad={percentage < 40} />
        </motion.div>

        {/* Grade circle */}
        <div className="flex justify-center mb-4">
          <motion.div
            className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${gradeInfo.bgColor} flex items-center justify-center shadow-lg border-4`}
            style={{ borderColor: gradeInfo.color }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            {/* Animated ring */}
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="6"
                opacity="0.3"
              />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none"
                stroke={gradeInfo.color}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
                transform="rotate(-90 50 50)"
                initial={{ strokeDasharray: "0 264" }}
                animate={{ strokeDasharray: `${percentage * 2.64} ${264 - percentage * 2.64}` }}
                transition={{ duration: 1.2, delay: 0.6 }}
              />
            </svg>
            <motion.span
              className="font-pixel text-4xl relative z-10"
              style={{ color: gradeInfo.color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
            >
              {gradeInfo.grade}
            </motion.span>
          </motion.div>
        </div>

        {/* Message */}
        <motion.p
          className="text-center font-pixel text-sm mb-2"
          style={{ color: gradeInfo.color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {gradeInfo.message}
        </motion.p>
        
        {/* Coins earned display */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <motion.div
            className="bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-full px-6 py-2 border-2 border-warning/50 flex items-center gap-3 shadow-md"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💰
            </motion.span>
            <span className="font-pixel text-sm text-warning">+{coinsEarned} COINS!</span>
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            >
              ✨
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <motion.div
            className="bg-pastel-cream/80 rounded-xl p-3 text-center border-2 border-warning/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex justify-center mb-1">
              <StarIcon size={20} />
            </div>
            <div className="font-pixel text-sm text-warning">{score}</div>
            <div className="text-[10px] text-muted-foreground font-body">SCORE</div>
          </motion.div>
          
          <motion.div
            className="bg-pastel-mint/80 rounded-xl p-3 text-center border-2 border-success/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex justify-center mb-1">
              <Trophy size={20} className="text-success" />
            </div>
            <div className="font-pixel text-sm text-success">{correctAnswers}/{totalQuestions}</div>
            <div className="text-[10px] text-muted-foreground font-body">CORRECT</div>
          </motion.div>
          
          <motion.div
            className="bg-pastel-lavender/80 rounded-xl p-3 text-center border-2 border-accent/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <div className="flex justify-center mb-1">
              <Star size={20} className="text-accent" />
            </div>
            <div className="font-pixel text-sm text-accent">{percentage}%</div>
            <div className="text-[10px] text-muted-foreground font-body">ACCURACY</div>
          </motion.div>

          <motion.div
            className="bg-pastel-pink/80 rounded-xl p-3 text-center border-2 border-primary/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex justify-center mb-1">
              <Clock size={20} className="text-primary" />
            </div>
            <div className="font-pixel text-[10px] text-primary">{timeString}</div>
            <div className="text-[10px] text-muted-foreground font-body">TIME</div>
          </motion.div>
        </div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <CuteButton
            variant="primary"
            size="lg"
            onClick={onPlayAgain}
            icon={<RotateCcw size={18} />}
            className="w-full"
          >
            PLAY AGAIN
          </CuteButton>
          
          <div className="flex gap-3">
            <CuteButton
              variant="secondary"
              size="md"
              onClick={onGoHome}
              icon={<Home size={16} />}
              className="flex-1"
            >
              HOME
            </CuteButton>
            
            <CuteButton
              variant="accent"
              size="md"
              onClick={() => {
                navigator.share?.({
                  title: "Watch & Memorize - WordIT",
                  text: `I scored ${score} points with ${percentage}% accuracy in Watch & Memorize! Can you beat me?`,
                  url: window.location.href,
                }).catch(() => {});
              }}
              icon={<Share2 size={16} />}
              className="flex-1"
            >
              SHARE
            </CuteButton>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
