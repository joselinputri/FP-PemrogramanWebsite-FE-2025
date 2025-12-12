import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dashboard } from "@/components/game/Dashboard";
import { GameBackground } from "@/components/game/GameBackground";
import { Penguin } from "@/components/animals/Penguin";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<"loading" | "welcome" | "ready">("loading");

  useEffect(() => {
    /** Prevent hydration mismatch on SSR */
    if (typeof window === "undefined") return;

    const lastIntro = localStorage.getItem("watchAndMemorize_lastIntro");
    const oneHour = 60 * 60 * 1000;
    const now = Date.now();

    // Jika intro terakhir < 1 jam → skip intro
    if (lastIntro && now - parseInt(lastIntro) < oneHour) {
      setShowIntro(false);
      return;
    }

    // Jika intro harus ditampilkan → jalankan animasi
    const timer1 = setTimeout(() => setIntroPhase("welcome"), 400);
    const timer2 = setTimeout(() => setIntroPhase("ready"), 1800);
    const timer3 = setTimeout(() => {
      setShowIntro(false);
      localStorage.setItem("watchAndMemorize_lastIntro", Date.now().toString());
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (showIntro) {
    return (
      <div className="fixed inset-0 overflow-hidden">
        <GameBackground />
        
        <AnimatePresence mode="wait">
          {introPhase === "loading" && (
            <motion.div
              key="loading"
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex gap-2"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-4 h-4 rounded-full bg-primary"
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}

          {introPhase === "welcome" && (
            <motion.div
              key="welcome"
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {/* Flying penguin from bottom */}
              <motion.div
                initial={{ y: 200, rotate: 10, scale: 0.5 }}
                animate={{ y: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              >
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Penguin size={180} isFlying isHappy />
                </motion.div>
              </motion.div>

              {/* Floating sparkles around penguin */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${Math.cos(i * Math.PI / 6) * 120}px)`,
                    top: `calc(50% + ${Math.sin(i * Math.PI / 6) * 100}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                >
                  <Sparkles size={20} className="text-warning" />
                </motion.div>
              ))}

              <motion.h1
                className="font-pixel text-3xl text-foreground mt-8 drop-shadow-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                WATCH & MEMORIZE
              </motion.h1>

              <motion.p
                className="text-muted-foreground mt-3 font-body text-lg text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                A cute memory game with adorable animals!
              </motion.p>
            </motion.div>
          )}

          {introPhase === "ready" && (
            <motion.div
              key="ready"
              className="absolute inset-0 flex flex-col items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.4 }}
            >
              {/* Penguin bouncing */}
              <motion.div
                animate={{ 
                  y: [-20, 0, -20],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                <Penguin size={150} isHappy />
              </motion.div>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.p
                  className="font-pixel text-xl text-primary"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  GET READY!
                </motion.p>
              </motion.div>

              {/* Elegant floating hearts */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + i * 12}%`,
                    bottom: 0,
                  }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ 
                    y: -400,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeOut"
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path 
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
                      fill={["#FFB6C1", "#FFD1DC", "#E1BEE7", "#FFCDD2", "#F8BBD9", "#FCE4EC"][i]}
                    />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return <Dashboard />;
};

export default Index;
