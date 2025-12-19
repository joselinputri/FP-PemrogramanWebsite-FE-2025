// src/pages/watch-and-memorize/PlayWatchAndMemorize.tsx
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Dashboard } from "@/pages/watch-and-memorize/components/game/Dashboard";
import { GameBackground } from "@/pages/watch-and-memorize/components/game/GameBackground";
import { Penguin } from "@/pages/watch-and-memorize/components/animals/Penguin";
import { useSubmitResult } from "../../api/watch-and-memorize/useSubmitResult";
import { useGetPlayWatchAndMemorize } from "../../api/watch-and-memorize/useGetPlayWatchAndMemorize";

const PlayWatchAndMemorize = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const [stage, setStage] = useState<"loading" | "intro" | "dashboard">("dashboard");

  // ⭐ Fetch game config from backend
  const { data: gameConfig, isLoading, error } = useGetPlayWatchAndMemorize(gameId || '');

  // ⭐ Submit result hook
  const { submitResult } = useSubmitResult(gameId || '');

  // ⭐ Trigger intro animation setelah data loaded
  useEffect(() => {
    if (!isLoading && gameConfig && stage === "loading") {
      // Data loaded, mulai intro animation
      setStage("intro");
      
      // Auto transition ke dashboard setelah 2.5 detik
      const timer = setTimeout(() => {
        setStage("dashboard");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isLoading, gameConfig, stage]);

  const handleExit = useCallback(() => {
    navigate("/");
  }, [navigate]);

  // ⭐ Handle game complete
  const handleGameComplete = useCallback(
    async (
      score: number,
      correctAnswers: number,
      totalQuestions: number,
      timeSpent: number,
      coinsEarned: number,
    ) => {
      console.log("🎮 Game Complete:", { 
        score, 
        correctAnswers, 
        totalQuestions, 
        timeSpent, 
        coinsEarned 
      });

      try {
        const result = await submitResult({
          score,
          correctAnswers,
          totalQuestions,
          timeSpent,
          coinsEarned,
        });

        console.log("✅ Result submitted:", result);
      } catch (error) {
        console.error("❌ Failed to submit result:", error);
      }
    },
    [submitResult],
  );

  // ========== LOADING STAGE ==========
  if (stage === "loading" || isLoading) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="flex gap-2 justify-center mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 rounded-full bg-primary"
                  animate={{ y: [-12, 12, -12] }}
                  transition={{ 
                    duration: 0.6, 
                    repeat: Infinity, 
                    delay: i * 0.15 
                  }}
                />
              ))}
            </motion.div>
            <motion.p
              className="text-foreground font-pixel text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ========== ERROR STAGE ==========
  if (error) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-card/95 backdrop-blur-md rounded-3xl p-8 border-4 border-destructive/30 shadow-2xl max-w-md text-center"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Penguin size={80} isSad />
            </motion.div>
            
            <h1 className="text-2xl font-pixel text-destructive mb-3 mt-4">
              Oops! Error
            </h1>
            <p className="text-muted-foreground text-sm mb-6 font-body">
              {error.message || "Failed to load game. Please try again."}
            </p>
            
            <button
              onClick={handleExit}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg font-pixel"
            >
              Back to Home
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ========== INTRO ANIMATION (Penguin Terbang) ==========
  if (stage === "intro" && gameConfig) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Penguin Terbang */}
          <motion.div
            initial={{ y: 200, rotate: 10, scale: 0.5 }}
            animate={{ 
              y: 0, 
              rotate: 0, 
              scale: 1 
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              bounce: 0.4 
            }}
          >
            <motion.div
              animate={{ 
                y: [-15, 15, -15],
                rotate: [-3, 3, -3]
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

          {/* Sparkles around penguin */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `calc(50% + ${Math.cos((i * Math.PI) / 6) * 130}px)`,
                top: `calc(50% + ${Math.sin((i * Math.PI) / 6) * 110}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.3, 1.3, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            >
              <Sparkles 
                size={22} 
                className="text-warning drop-shadow-lg" 
              />
            </motion.div>
          ))}

          {/* Game Title */}
          <motion.h1
            className="font-pixel text-3xl md:text-4xl text-foreground mt-10 drop-shadow-lg text-center px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {gameConfig?.name || "WATCH & MEMORIZE"}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-muted-foreground mt-3 font-body text-base md:text-lg text-center px-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {gameConfig?.description || "A cute memory game with adorable animals!"}
          </motion.p>

          {/* Floating hearts/decorations */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute pointer-events-none"
              style={{
                left: `${15 + i * 14}%`,
                bottom: 0,
              }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ 
                y: -500,
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut"
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path 
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                  fill={["#FFB6C1", "#FFD1DC", "#E1BEE7", "#FFCDD2", "#F8BBD9", "#FCE4EC"][i]}
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  // ========== DASHBOARD (Main Menu) ==========
  if (stage === "dashboard" && gameConfig) {
    return (
      <Dashboard 
        onExit={handleExit} 
        gameConfig={gameConfig} 
        onGameComplete={handleGameComplete} 
      />
    );
  }

  // Fallback
  return null;
};

export default PlayWatchAndMemorize;