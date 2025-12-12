import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameBackground } from "./GameBackground";
import { Penguin } from "../animals/Penguin";
import { CuteButton } from "../ui/CuteButton";
import { Shop } from "./Shop";
import { GamePlay } from "./GamePlay";
import { Scoreboard } from "./Scoreboard";
import { Pendant, PendantType } from "./Pendant";
import { DifficultySelect, Difficulty } from "./DifficultySelect";
import { MusicControls } from "./MusicControls";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useBackgroundMusic } from "../../hooks/useBackgroundMusic";
import { Play, ShoppingBag, Trophy, HelpCircle, Sparkles, Crown, Medal, Clock, LogOut, RotateCcw } from "lucide-react";
import { ANIMALS } from "../animals/AnimalCollection";

type View = "dashboard" | "playing" | "scoreboard" | "intro" | "leaderboard";

interface GameState {
  playerName: string;
  coins: number;
  highScore: number;
  gamesPlayed: number;
  pendants: Record<PendantType, number>;
}

interface LeaderboardEntry {
  name: string;
  score: number;
  avatar: number;
  date: string;
  time?: number;
}

const initialGameState: GameState = {
  playerName: "",
  coins: 200,
  highScore: 0,
  gamesPlayed: 0,
  pendants: {
    hint: 2,
    freeze: 1,
    double: 1,
    shield: 2,
    reveal: 0,
  },
};

// Dynamic leaderboard - only shows real players who have actually played
const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

// Cute custom icons
const CoinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <circle cx="10" cy="10" r="9" fill="#FFD700" stroke="#E5A800" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="6" fill="#FFEC8B" />
    <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B8860B">$</text>
  </svg>
);

const TrophyIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32">
    <path d="M16 24 L16 28" stroke="#B8860B" strokeWidth="3" strokeLinecap="round" />
    <rect x="10" y="27" width="12" height="3" rx="1.5" fill="#B8860B" />
    <path d="M8 4 L24 4 L22 16 Q16 22 10 16 L8 4 Z" fill="#FFD700" stroke="#E5A800" strokeWidth="1.5" />
    <path d="M10 6 L22 6 L20.5 14 Q16 18 11.5 14 L10 6 Z" fill="#FFEC8B" />
    <path d="M8 4 Q2 6 4 12 Q6 16 10 14" fill="#FFD700" stroke="#E5A800" strokeWidth="1" />
    <path d="M24 4 Q30 6 28 12 Q26 16 22 14" fill="#FFD700" stroke="#E5A800" strokeWidth="1" />
    <circle cx="16" cy="10" r="3" fill="#FF6B6B" stroke="#E55555" strokeWidth="1" />
  </svg>
);

export const Dashboard = () => {
  const [view, setView] = useState<View>("dashboard");
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem("watchAndMemorize_gameState");
    return saved ? { ...initialGameState, ...JSON.parse(saved) } : initialGameState;
  });
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [showPlayPopup, setShowPlayPopup] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [tempName, setTempName] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("normal");
  const [countdown, setCountdown] = useState(3);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem("watchAndMemorize_leaderboard");
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });
  const [lastGameResult, setLastGameResult] = useState<{
    score: number;
    correct: number;
    total: number;
    timeSpent: number;
  } | null>(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { playSound } = useSoundEffects(true);
  const { isPlaying: isMusicPlaying, toggleMusic, volume, setVolume, isMuted, toggleMute } = useBackgroundMusic();

  // Save game state
  useEffect(() => {
    localStorage.setItem("watchAndMemorize_gameState", JSON.stringify(gameState));
  }, [gameState]);

  // Save leaderboard - filter out any entries without actual player names
  useEffect(() => {
    const validLeaderboard = leaderboard.filter(entry => entry.name && entry.name.trim() !== "");
    localStorage.setItem("watchAndMemorize_leaderboard", JSON.stringify(validLeaderboard));
  }, [leaderboard]);

  // Handle logout - reset all progress and show name input
  const handleLogout = () => {
    playSound("click");
    setGameState(initialGameState);
    // DO NOT clear leaderboard - it should persist across users
    // setLeaderboard([]); // REMOVED - leaderboard stays
    localStorage.removeItem("watchAndMemorize_gameState");
    // localStorage.removeItem("watchAndMemorize_leaderboard"); // REMOVED - keep leaderboard
    setShowLogoutConfirm(false);
    setTempName("");
    // Show name input so user can enter new name and pick difficulty before playing
    setShowNameInput(true);
  };

  const handleBuyPendant = (type: PendantType, price: number) => {
    if (gameState.coins >= price) {
      playSound("coin");
      setGameState((prev) => ({
        ...prev,
        coins: prev.coins - price,
        pendants: {
          ...prev.pendants,
          [type]: prev.pendants[type] + 1,
        },
      }));
    }
  };

  const handleUsePendant = (type: PendantType) => {
    setGameState((prev) => ({
      ...prev,
      pendants: {
        ...prev.pendants,
        [type]: Math.max(0, prev.pendants[type] - 1),
      },
    }));
  };

  const handleGameComplete = (score: number, correct: number, total: number, timeSpent: number) => {
    const coinsEarned = Math.floor(score / 10) + (correct * 10);
    
    setLastGameResult({ score, correct, total, timeSpent });
    setGameState((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      highScore: Math.max(prev.highScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
    }));

    // Add to leaderboard
    if (gameState.playerName) {
      const newEntry: LeaderboardEntry = {
        name: gameState.playerName,
        score,
        avatar: Math.floor(Math.random() * 5),
        date: "Just now",
        time: timeSpent,
      };
      setLeaderboard((prev) => {
        const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
        return updated;
      });
    }

    setView("scoreboard");
  };

  const handleStartGame = () => {
    if (!gameState.playerName) {
      setShowNameInput(true);
    } else {
      playSound("click");
      setShowPlayPopup(false);
      setView("intro");
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      playSound("pop");
      setGameState((prev) => ({ ...prev, playerName: tempName.trim() }));
      setShowNameInput(false);
      // Don't start playing immediately - just close the modal and go back to dashboard
      // User can then click "Play Now" when ready
    }
  };

  // Format time helper
  const formatTime = (seconds?: number) => {
    if (!seconds) return "--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Intro animation before game starts - 3 second countdown
  useEffect(() => {
    if (view === "intro") {
      setCountdown(3);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Play "GO!" sound effect
            playSound("go");
            setTimeout(() => setView("playing"), 300);
            return 0;
          }
          // Play countdown beep for 3, 2, 1
          playSound("countdown");
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [view, playSound]);

  if (view === "intro") {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="flex flex-col items-center justify-center text-center"
            initial={{ scale: 0.6, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
          >

            {/* Centered flying penguin - smooth professional animation */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ y: 40, scale: 0.6, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                type: "spring", 
                stiffness: 180, 
                damping: 15 
              }}
            >
              {/* Soft glow behind penguin */}
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-pastel-blue/40 via-pastel-mint/20 to-transparent rounded-full blur-2xl"
                style={{ width: 200, height: 200, left: -20, top: -20 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                animate={{ 
                  y: [-8, 4, -8],
                  rotate: [-2, 2, -2],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Penguin size={180} isFlying isHappy />
              </motion.div>
            </motion.div>

            {/* Sparkles arranged around penguin */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `calc(50% + ${Math.cos(i * Math.PI / 4) * 110}px)`,
                  top: `calc(45% + ${Math.sin(i * Math.PI / 4) * 90}px)`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0.4, 1.1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.12 }}
              >
                <Sparkles size={16} className="text-warning drop-shadow-sm" />
              </motion.div>
            ))}

            <motion.h1
              className="font-pixel text-2xl text-foreground mt-8 drop-shadow-lg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              GET READY!
            </motion.h1>

            <motion.p
              className="text-muted-foreground mt-3 font-body text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              Watch carefully, {gameState.playerName}!
            </motion.p>

            {/* Countdown number - centered and prominent */}
            <motion.div
              className="mt-8"
              key={countdown}
              initial={{ scale: 1.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                duration: 0.35, 
                type: "spring", 
                stiffness: 280, 
                damping: 20 
              }}
            >
              <span className="font-pixel text-6xl text-primary drop-shadow-lg">
                {countdown > 0 ? countdown : "GO!"}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (view === "playing") {
    return (
      <GamePlay
        onExit={() => setView("dashboard")}
        playerName={gameState.playerName}
        pendants={gameState.pendants}
        onUsePendant={handleUsePendant}
        onGameComplete={handleGameComplete}
        difficulty={selectedDifficulty}
      />
    );
  }

  if (view === "scoreboard" && lastGameResult) {
    return (
      <Scoreboard
        score={lastGameResult.score}
        correctAnswers={lastGameResult.correct}
        totalQuestions={lastGameResult.total}
        timeSpent={lastGameResult.timeSpent}
        playerName={gameState.playerName}
        onPlayAgain={() => setView("intro")}
        onGoHome={() => {
          setLastGameResult(null);
          setView("dashboard");
        }}
      />
    );
  }

  // Full leaderboard view
  if (view === "leaderboard") {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-card/98 backdrop-blur-md rounded-3xl p-6 border-4 border-primary/30 shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], y: [-2, 2, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrophyIcon size={36} />
                </motion.div>
                <h2 className="font-pixel text-lg text-foreground">LEADERBOARD</h2>
              </div>
              <CuteButton
                variant="ghost"
                size="sm"
                onClick={() => setView("dashboard")}
              >
                BACK
              </CuteButton>
            </div>
            
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={`${entry.name}-${index}`}
                  className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${
                    index === 0 
                      ? "bg-gradient-to-r from-amber-100 to-yellow-50 border-warning/50" 
                      : index === 1 
                      ? "bg-gradient-to-r from-gray-100 to-slate-50 border-gray-300" 
                      : index === 2 
                      ? "bg-gradient-to-r from-orange-100 to-amber-50 border-amber-400/50"
                      : "bg-muted/30 border-border/50 hover:bg-muted/50"
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    {index === 0 ? (
                      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                        <Crown size={24} className="text-warning" />
                      </motion.div>
                    ) : index === 1 ? (
                      <Medal size={22} className="text-gray-400" />
                    ) : index === 2 ? (
                      <Medal size={22} className="text-amber-600" />
                    ) : (
                      <span className="font-pixel text-sm text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-pastel-mint border-2 border-primary/30 flex items-center justify-center">
                    {ANIMALS[entry.avatar % ANIMALS.length].component({ size: 32 })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm text-foreground font-medium truncate">{entry.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{entry.date}</span>
                      {entry.time && (
                        <>
                          <Clock size={10} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{formatTime(entry.time)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-pixel text-lg text-warning">{entry.score}</span>
                    <p className="text-xs text-muted-foreground">pts</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-4 pt-4 border-t border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-center text-sm text-muted-foreground font-body">
                Play more to climb the ranks!
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameBackground />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <motion.div
          className="absolute top-4 left-4 right-4 flex items-center justify-between"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {/* Player info */}
          <motion.div 
            className="bg-card/95 backdrop-blur-sm rounded-2xl p-3 border-2 border-primary/30 shadow-cute flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowNameInput(true)}
            whileHover={{ y: -3, scale: 1.02, boxShadow: "0 8px 25px -5px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center border-2 border-primary/50 overflow-hidden"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              {/* Mini penguin avatar */}
              <Penguin size={32} />
            </motion.div>
            <div>
              <p className="font-pixel text-[10px] text-foreground group-hover:text-primary transition-colors">
                {gameState.playerName || "Enter name..."}
              </p>
              <div className="flex items-center gap-1">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Trophy size={10} className="text-warning" />
                </motion.div>
                <p className="text-[10px] text-muted-foreground">{gameState.gamesPlayed} games</p>
              </div>
            </div>
            {gameState.playerName && (
              <motion.button
                className="ml-1 p-1.5 rounded-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLogoutConfirm(true);
                }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut size={12} />
              </motion.button>
            )}
          </motion.div>
          
          {/* Music Controls & Coins */}
          <div className="flex items-center gap-2">
            <MusicControls
              isPlaying={isMusicPlaying}
              isMuted={isMuted}
              volume={volume}
              onToggleMusic={toggleMusic}
              onToggleMute={toggleMute}
              onVolumeChange={setVolume}
            />
            <motion.div
              className="bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-warning/50 shadow-cute flex items-center gap-2 cursor-pointer group"
              whileHover={{ scale: 1.08, y: -3, boxShadow: "0 6px 20px -3px rgba(255,215,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playSound("coin");
                setIsShopOpen(true);
              }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CoinIcon />
              </motion.div>
              <span className="font-pixel text-sm text-warning group-hover:text-amber-400 transition-colors">{gameState.coins}</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Title with decorations - gentle sparkles not stars */}
        <motion.div
          className="text-center mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="text-warning" size={24} />
            </motion.div>
            <h1 className="font-pixel text-xl md:text-2xl text-foreground drop-shadow-lg">
              WATCH & MEMORIZE
            </h1>
            <motion.div
              animate={{ rotate: [5, -5, 5], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="text-warning" size={24} />
            </motion.div>
          </div>
          <p className="text-muted-foreground text-sm font-body">
            Can you remember the cute animals?
          </p>
        </motion.div>
        
        {/* Mascot penguin - centered and larger */}
        <motion.div
          className="relative mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Penguin size={160} isFlying />
          </motion.div>
          
          {/* Speech bubble */}
          <motion.div
            className="absolute -top-2 -right-4 bg-cloud rounded-2xl px-4 py-2 border-2 border-border/50 shadow-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <p className="text-xs text-foreground font-body">Let's have fun!</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-cloud border-r-2 border-b-2 border-border/50 transform rotate-45" />
          </motion.div>
        </motion.div>
        
        {/* High score display - COMPACT & ELEGANT */}
        <motion.div
          className="relative bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 backdrop-blur-sm rounded-2xl px-6 py-4 border-3 border-warning/30 shadow-lg mb-5 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrophyIcon size={32} />
            </motion.div>
            <div className="text-center">
              <p className="font-pixel text-[10px] text-amber-600 mb-1 tracking-wider">BEST SCORE</p>
              <motion.span 
                className="font-pixel text-2xl text-amber-500 drop-shadow block"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {gameState.highScore}
              </motion.span>
            </div>
            <motion.div
              animate={{ y: [2, -2, 2], rotate: [3, -3, 3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              <TrophyIcon size={32} />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Main buttons */}
        <motion.div
          className="flex flex-col gap-3 items-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <CuteButton
            variant="primary"
            size="lg"
            onClick={() => {
              playSound("click");
              setShowPlayPopup(true);
            }}
            icon={<Play size={24} />}
          >
            PLAY NOW
          </CuteButton>
          
          <div className="flex gap-3 flex-wrap justify-center">
            <CuteButton
              variant="secondary"
              size="md"
              onClick={() => {
                playSound("click");
                setIsShopOpen(true);
              }}
              icon={<ShoppingBag size={18} />}
            >
              SHOP
            </CuteButton>
            
            <CuteButton
              variant="accent"
              size="md"
              onClick={() => {
                playSound("click");
                setShowHowToPlay(true);
              }}
              icon={<HelpCircle size={18} />}
            >
              HOW TO
            </CuteButton>
            
            {/* Scoreboard button - opens full leaderboard modal */}
            <CuteButton
              variant="accent"
              size="md"
              onClick={() => {
                playSound("click");
                setView("leaderboard");
              }}
              icon={<Trophy size={18} />}
            >
              SCORES
            </CuteButton>
          </div>
        </motion.div>

        {/* Leaderboard - Right side (visible on lg) and below on mobile */}
        <motion.div
          id="leaderboard-section"
          className="absolute top-20 right-4 w-64 hidden lg:block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-4 border-2 border-primary/30 shadow-lg">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="text-warning" size={20} />
              </motion.div>
              <h3 className="font-pixel text-xs text-foreground">SCOREBOARD</h3>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((entry, index) => (
                <motion.div
                  key={`${entry.name}-${index}`}
                  className="flex items-center gap-2 p-2 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {index === 0 ? (
                      <Crown size={16} className="text-warning" />
                    ) : index === 1 ? (
                      <Medal size={16} className="text-gray-400" />
                    ) : index === 2 ? (
                      <Medal size={16} className="text-amber-600" />
                    ) : (
                      <span className="font-pixel text-[10px] text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-pastel-mint flex items-center justify-center">
                    {ANIMALS[entry.avatar % ANIMALS.length].component({ size: 24 })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs text-foreground truncate">{entry.name}</p>
                    <div className="flex items-center gap-1">
                      <p className="text-[10px] text-muted-foreground">{entry.date}</p>
                      {entry.time && (
                        <>
                          <span className="text-[8px] text-muted-foreground">·</span>
                          <Clock size={8} className="text-muted-foreground" />
                          <span className="text-[8px] text-muted-foreground">{formatTime(entry.time)}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="font-pixel text-[10px] text-warning">{entry.score}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Owned pendants display - smaller */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-3 border-2 border-border shadow-cute max-w-md mx-auto">
            <p className="font-pixel text-[8px] text-muted-foreground mb-2 text-center">MY PENDANTS</p>
            <div className="flex justify-center gap-3">
              {(Object.keys(gameState.pendants) as PendantType[]).map((type) => (
                <Pendant
                  key={type}
                  type={type}
                  size={32}
                  owned={gameState.pendants[type]}
                />
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Decorative animals - animated */}
        <motion.div 
          className="absolute bottom-28 left-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {ANIMALS[0].component({ size: 45, isHappy: true })}
        </motion.div>
        <motion.div 
          className="absolute bottom-32 right-8"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          {ANIMALS[2].component({ size: 45, isHappy: true })}
        </motion.div>
      </div>
      
      {/* Shop modal */}
      <AnimatePresence>
        {isShopOpen && (
          <Shop
            isOpen={isShopOpen}
            onClose={() => setIsShopOpen(false)}
            coins={gameState.coins}
            pendants={gameState.pendants}
            onBuyPendant={handleBuyPendant}
          />
        )}
      </AnimatePresence>
      
{/* Name input modal */}
<AnimatePresence>
        {showNameInput && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNameInput(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 border-4 border-primary/30 shadow-2xl max-w-sm w-full mx-4 text-center"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="flex justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Penguin size={80} isHappy />
              </motion.div>
              
              <h2 className="font-pixel text-lg text-foreground mt-4 mb-2">WHAT'S YOUR NAME?</h2>
              <p className="text-muted-foreground text-sm mb-4 font-body">
                So we can remember your amazing scores!
              </p>
              
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Your cute name..."
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/30 bg-muted/30 text-foreground font-body text-center focus:outline-none focus:border-primary/60 mb-4"
                maxLength={15}
                autoFocus
              />
              
              <div className="flex gap-3">
                <CuteButton
                  variant="ghost"
                  size="md"
                  onClick={() => setShowNameInput(false)}
                  className="flex-1"
                >
                  LATER
                </CuteButton>
                <CuteButton
                  variant="primary"
                  size="md"
                  onClick={handleNameSubmit}
                  className="flex-1"
                  disabled={!tempName.trim()}
                >
                  SAVE
                </CuteButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Play popup with difficulty */}
      <AnimatePresence>
        {showPlayPopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPlayPopup(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 border-4 border-primary/30 shadow-2xl max-w-md w-full mx-4 text-center"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Centered penguin */}
              <motion.div
                className="flex justify-center"
                animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Penguin size={120} isHappy />
              </motion.div>
              
              <h2 className="font-pixel text-lg text-foreground mt-4 mb-2">READY TO PLAY?</h2>
              <p className="text-muted-foreground text-sm mb-4 font-body">
                Watch the adorable animals walk by, then pick them in the correct order!
              </p>
              
              {/* Difficulty selector */}
              <div className="mb-6">
                <p className="font-pixel text-[10px] text-muted-foreground mb-2">SELECT DIFFICULTY</p>
                <DifficultySelect 
                  selected={selectedDifficulty} 
                  onSelect={(d) => {
                    playSound("click");
                    setSelectedDifficulty(d);
                  }} 
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <CuteButton
                  variant="primary"
                  size="lg"
                  onClick={handleStartGame}
                  icon={<Play size={20} />}
                  className="w-full"
                >
                  START GAME
                </CuteButton>
                
                <CuteButton
                  variant="ghost"
                  size="md"
                  onClick={() => setShowPlayPopup(false)}
                >
                  NOT YET
                </CuteButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* How to play modal */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHowToPlay(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-6 border-4 border-primary/30 shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-pixel text-lg text-foreground text-center mb-6">HOW TO PLAY</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-pastel-cream/50 rounded-xl border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-pixel shrink-0">1</div>
                  <div>
                    <h3 className="font-pixel text-xs text-foreground mb-1">WATCH</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Cute animals will walk across the screen. Remember them!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-pastel-mint/50 rounded-xl border border-secondary/20">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-pixel shrink-0">2</div>
                  <div>
                    <h3 className="font-pixel text-xs text-foreground mb-1">MEMORIZE</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Cards will show which animals appeared. Quick, memorize the order!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-pastel-lavender/50 rounded-xl border border-accent/20">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-pixel shrink-0">3</div>
                  <div>
                    <h3 className="font-pixel text-xs text-foreground mb-1">GUESS</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Pick the animals in the correct order they walked by! You get 3 tries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-pastel-pink/50 rounded-xl border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center shrink-0">
                    <Sparkles size={18} className="text-warning-foreground" />
                  </div>
                  <div>
                    <h3 className="font-pixel text-xs text-foreground mb-1">USE PENDANTS</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Buy magical pendants from the shop to help you win! Each pendant has a special power.
                    </p>
                  </div>
                </div>
              </div>
              
              <CuteButton
                variant="primary"
                size="md"
                onClick={() => setShowHowToPlay(false)}
                className="w-full mt-6"
              >
                GOT IT!
              </CuteButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 border-4 border-destructive/30 shadow-2xl max-w-sm w-full mx-4 text-center"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={{ y: [-3, 3, -3], rotate: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Penguin size={80} isSad />
              </motion.div>
              
              <h2 className="font-pixel text-lg text-foreground mb-2">LOGOUT?</h2>
              <p className="text-muted-foreground text-sm mb-2 font-body">
                This will reset <span className="text-destructive font-semibold">ALL</span> your progress:
              </p>
              <div className="bg-destructive/10 rounded-xl p-3 mb-4">
                <ul className="text-sm text-muted-foreground font-body space-y-1">
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-warning">💰</span> {gameState.coins} coins will be lost
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-warning">🏆</span> High score: {gameState.highScore}
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <span className="text-warning">🎮</span> {gameState.gamesPlayed} games played
                  </li>
                </ul>
              </div>
              <p className="text-destructive text-xs mb-6 font-body">
                This cannot be undone!
              </p>
              
              <div className="flex gap-3">
                <CuteButton
                  variant="ghost"
                  size="md"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1"
                >
                  CANCEL
                </CuteButton>
                <CuteButton
                  variant="danger"
                  size="md"
                  onClick={handleLogout}
                  icon={<RotateCcw size={14} />}
                  className="flex-1"
                >
                  RESET ALL
                </CuteButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
