import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ANIMALS } from "../animals/AnimalCollection";
import type { AnimalId } from "../animals/AnimalCollection";
import { GameBackground } from "./GameBackground";
import { MemoryCard } from "./MemoryCard";
import { WalkingAnimal } from "./WalkingAnimal";
import { CuteButton } from "../ui/CuteButton";
import { Pendant } from "./Pendant";
import type { PendantType } from "./Pendant";
import { Penguin } from "../animals/Penguin";
import { DIFFICULTY_CONFIGS } from "./DifficultySelect";
import type { Difficulty } from "./DifficultySelect";
import { useSoundEffects } from "../../hooks/useSoundEffects";
import {
  X,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Eye,
  Clock,
  Timer,
  Sparkles,
} from "lucide-react";

interface GamePlayProps {
  onExit: () => void;
  playerName: string;
  pendants: Record<PendantType, number>;
  onUsePendant: (type: PendantType) => void;
  onGameComplete: (
    score: number,
    correctAnswers: number,
    totalQuestions: number,
    timeSpent: number,
  ) => void;
  difficulty?: Difficulty;
}

type GamePhase =
  | "watching"
  | "memorizing"
  | "shuffling"
  | "guessing"
  | "result"
  | "complete";

// Custom icons
const StarIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16">
    <polygon
      points="8,1 10,6 15,6 11,9 13,14 8,11 3,14 5,9 1,6 6,6"
      fill="#FFD700"
      stroke="#E5A800"
      strokeWidth="0.5"
    />
  </svg>
);

export const GamePlay = ({
  onExit,
  pendants,
  onUsePendant,
  onGameComplete,
  difficulty = "normal",
}: GamePlayProps) => {
  const config = DIFFICULTY_CONFIGS[difficulty];

  const [phase, setPhase] = useState<GamePhase>("watching");
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.memorizationTime / 1000);
  const [guessTimeLeft, setGuessTimeLeft] = useState(config.guessTimeLimit);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Walking phase state
  const [walkingAnimals, setWalkingAnimals] = useState<AnimalId[]>([]);
  const [animalsShown, setAnimalsShown] = useState(0);
  const [rememberCount, setRememberCount] = useState(0);

  // Card state - cards always face UP
  const [sequenceToRemember, setSequenceToRemember] = useState<AnimalId[]>([]);
  const [shuffledCards, setShuffledCards] = useState<AnimalId[]>([]);
  const [playerGuesses, setPlayerGuesses] = useState<AnimalId[]>([]);
  const [cardStates, setCardStates] = useState<
    Record<number, "correct" | "wrong" | null>
  >({});
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [shuffleAnimating, setShuffleAnimating] = useState(false);
  const [cardPositions, setCardPositions] = useState<number[]>([]);

  // Wrong guess handling - allow retry
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showWrongFlash, setShowWrongFlash] = useState(false);

  // Round result
  const [roundCorrect, setRoundCorrect] = useState<boolean | null>(null);

  // Pendant effects
  const [hasShield, setHasShield] = useState(false);
  const [doublePoints, setDoublePoints] = useState(false);
  const [isTimeFrozen, setIsTimeFrozen] = useState(false);
  const [frozenTimeLeft, setFrozenTimeLeft] = useState(0);

  const timerRef = useRef<number | null>(null);
  const guessTimerRef = useRef<number | null>(null);
  const gameStartTime = useRef<number>(Date.now());
  const { playSound: playSfx } = useSoundEffects(!isMuted);

  // Generate animals for this round
  const generateRound = useCallback(() => {
    const availableAnimals = [...ANIMALS];
    const selected: AnimalId[] = [];

    for (let i = 0; i < config.animalsToWatch; i++) {
      const randomIndex = Math.floor(Math.random() * availableAnimals.length);
      selected.push(availableAnimals[randomIndex].id);
      availableAnimals.splice(randomIndex, 1);
    }

    setSequenceToRemember(selected);
    setWalkingAnimals(selected);
    setAnimalsShown(0);
    setRememberCount(0);
    setPlayerGuesses([]);
    setCardStates({});
    setSelectedCards([]);
    setRoundCorrect(null);
    setWrongAttempts(0);
    setGuessTimeLeft(config.guessTimeLimit);

    // Create cards (include the correct ones + extra)
    const allAnimals = ANIMALS.map((a) => a.id);
    const otherAnimals = allAnimals.filter((a) => !selected.includes(a));
    const numExtraCards = Math.min(
      8 - config.animalsToWatch,
      otherAnimals.length,
    );
    const extraAnimals = otherAnimals.slice(0, numExtraCards);
    const allCards = [...selected, ...extraAnimals];

    // Initial positions (0, 1, 2, 3...)
    setCardPositions(allCards.map((_, i) => i));
    setShuffledCards(allCards);
  }, [config.animalsToWatch, config.guessTimeLimit]);

  // Start the game
  useEffect(() => {
    gameStartTime.current = Date.now();
    generateRound();
  }, [generateRound]);

  // Walking phase - show animals one by one with count
  useEffect(() => {
    if (phase !== "watching" || isPaused) return;

    if (animalsShown < walkingAnimals.length) {
      const timer = setTimeout(() => {
        setAnimalsShown((prev) => prev + 1);
        setRememberCount((prev) => prev + 1);
        playSfx("pop");
      }, 1800);

      return () => clearTimeout(timer);
    } else if (
      animalsShown === walkingAnimals.length &&
      walkingAnimals.length > 0
    ) {
      const timer = setTimeout(() => {
        setPhase("memorizing");
        setTimeLeft(config.memorizationTime / 1000);
        playSfx("whoosh");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [
    phase,
    animalsShown,
    walkingAnimals,
    isPaused,
    config.memorizationTime,
    playSfx,
  ]);

  // Memorization timer
  useEffect(() => {
    if (phase !== "memorizing" || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Start shuffle animation
          setPhase("shuffling");
          playSfx("shuffle");
          return 0;
        }
        if (prev <= 3) playSfx("countdown");
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, playSfx]);

  // Enhanced smooth shuffle animation - professional spring physics
  useEffect(() => {
    if (phase !== "shuffling") return;

    setShuffleAnimating(true);
    playSfx("shuffle");

    // Phase 1: Brief gather effect
    const gatherTimeout = setTimeout(() => {
      // Phase 2: Smooth flowing shuffle with graceful movements
      let shuffleStep = 0;
      const totalSteps = 12; // Balanced for smooth yet quick shuffle

      const shuffleInterval = setInterval(() => {
        shuffleStep++;
        if (shuffleStep % 4 === 0) playSfx("click");

        // Smooth position swapping
        setCardPositions((prev) => {
          const newPositions = [...prev];
          // Swap 2 pairs each step for visible movement
          for (let swap = 0; swap < 2; swap++) {
            const i = Math.floor(Math.random() * newPositions.length);
            const j = Math.floor(Math.random() * newPositions.length);
            if (i !== j) {
              [newPositions[i], newPositions[j]] = [
                newPositions[j],
                newPositions[i],
              ];
            }
          }
          return newPositions;
        });

        if (shuffleStep >= totalSteps) {
          clearInterval(shuffleInterval);

          // Phase 3: Final shuffle and settle with spring bounce
          setTimeout(() => {
            // Fisher-Yates shuffle for actual randomization
            setShuffledCards((prev) => {
              const cards = [...prev];
              for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
              }
              return cards;
            });

            // Reset positions with settling animation
            setCardPositions((prev) => prev.map((_, i) => i));

            setTimeout(() => {
              setShuffleAnimating(false);
              setPhase("guessing");
              setGuessTimeLeft(config.guessTimeLimit);
              playSfx("pop");
            }, 400);
          }, 200);
        }
      }, 90);

      return () => clearInterval(shuffleInterval);
    }, 150);

    return () => clearTimeout(gatherTimeout);
  }, [phase, config.guessTimeLimit, playSfx, shuffledCards]);

  // Guess timer
  useEffect(() => {
    if (phase !== "guessing" || isPaused || isTimeFrozen) return;

    guessTimerRef.current = setInterval(() => {
      setGuessTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(guessTimerRef.current!);
          // Time's up - end round as failed
          setRoundCorrect(false);
          setPhase("result");
          playSfx("lose");
          return 0;
        }
        if (prev <= 3) playSfx("countdown");
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (guessTimerRef.current) clearInterval(guessTimerRef.current);
    };
  }, [phase, isPaused, isTimeFrozen, playSfx]);

  // Track total time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && phase !== "result" && phase !== "complete") {
        setTotalTimeSpent(
          Math.floor((Date.now() - gameStartTime.current) / 1000),
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, phase]);

  // Handle card click during guessing - cards stay face up
  const handleCardClick = (index: number, animalId: AnimalId) => {
    if (phase !== "guessing" || playerGuesses.length >= config.animalsToWatch)
      return;
    if (selectedCards.includes(index)) return; // Already selected this card

    playSfx("click");

    const currentGuessIndex = playerGuesses.length;
    const isCorrect = sequenceToRemember[currentGuessIndex] === animalId;

    if (isCorrect) {
      playSfx("correct");
      setCardStates((prev) => ({ ...prev, [index]: "correct" }));
      setSelectedCards((prev) => [...prev, index]);
      setPlayerGuesses((prev) => [...prev, animalId]);

      if (playerGuesses.length + 1 === config.animalsToWatch) {
        const pointsEarned = doublePoints ? 200 : 100;
        setScore((prev) => prev + pointsEarned);
        setCorrectAnswers((prev) => prev + 1);
        setRoundCorrect(true);
        setPhase("result");
        setDoublePoints(false);
        playSfx("win");
      }
    } else {
      // Wrong answer - flash card but allow retry
      playSfx("wrong");
      setCardStates((prev) => ({ ...prev, [index]: "wrong" }));
      setShowWrongFlash(true);
      setWrongAttempts((prev) => prev + 1);

      if (hasShield) {
        // Shield protects from penalty
        setHasShield(false);
        setTimeout(() => {
          setCardStates((prev) => ({ ...prev, [index]: null }));
          setShowWrongFlash(false);
        }, 800);
      } else {
        // Add 5.5 seconds extra time to keep trying
        setGuessTimeLeft((prev) =>
          Math.min(prev + 5.5, config.guessTimeLimit + 10),
        );

        // Clear wrong state after animation
        setTimeout(() => {
          setCardStates((prev) => ({ ...prev, [index]: null }));
          setShowWrongFlash(false);
        }, 800);

        // Only fail after 3 wrong attempts
        if (wrongAttempts >= 2) {
          setTimeout(() => {
            setRoundCorrect(false);
            setPhase("result");
            playSfx("lose");
          }, 1000);
        }
      }
    }
  };

  // Move to next round or complete game
  const handleNextRound = () => {
    if (currentRound >= config.totalRounds) {
      setPhase("complete");
      onGameComplete(score, correctAnswers, config.totalRounds, totalTimeSpent);
    } else {
      setCurrentRound((prev) => prev + 1);
      setPhase("watching");
      generateRound();
    }
  };

  // Use pendant with actual effects
  const handleUsePendant = (type: PendantType) => {
    if (pendants[type] <= 0) return;

    playSfx("powerup");
    onUsePendant(type);

    switch (type) {
      case "freeze": {
        // Freeze timer 5s
        setIsTimeFrozen(true);
        setFrozenTimeLeft(5);

        const freezeInterval = setInterval(() => {
          setFrozenTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(freezeInterval);
              setIsTimeFrozen(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        break;
      }

      case "double": {
        setDoublePoints(true);
        break;
      }

      case "shield": {
        setHasShield(true);
        break;
      }

      case "reveal": {
        if (phase === "guessing") {
          // Highlight all correct animals briefly
          sequenceToRemember.forEach((animalId, idx) => {
            const cardIdx = shuffledCards.indexOf(animalId);
            setTimeout(() => {
              setCardStates((prev) => ({ ...prev, [cardIdx]: "correct" }));
            }, idx * 200);
          });

          setTimeout(() => {
            setCardStates({});

            // Re-apply selected states
            selectedCards.forEach((idx) => {
              setCardStates((prev) => ({ ...prev, [idx]: "correct" }));
            });
          }, 2500);
        }
        break;
      }

      default: {
        // fallback yang aman untuk eslint
        break;
      }
    }
  };

  // Handle exit with play count increment
  const handleExit = async () => {
    try {
      const apiUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const endpoint =
        import.meta.env.VITE_API_PLAY_COUNT_ENDPOINT || "/api/games/play-count";
      await fetch(`${apiUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameSlug: "watch-and-memorize" }),
      });
    } catch (error) {
      console.log("Failed to increment play count:", error);
    }
    onExit();
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <GameBackground />

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        {/* Exit button */}
        <CuteButton
          variant="danger"
          size="sm"
          onClick={handleExit}
          icon={<X size={16} />}
        >
          EXIT
        </CuteButton>

        {/* Score & Round */}
        <div className="flex items-center gap-3">
          <div className="bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-border shadow-md">
            <span className="font-pixel text-[10px] text-foreground">
              Round {currentRound}/{config.totalRounds}
            </span>
          </div>
          <div className="bg-card/95 backdrop-blur-sm rounded-full px-4 py-2 border-2 border-warning/50 shadow-md flex items-center gap-2">
            <StarIcon size={14} />
            <span className="font-pixel text-[10px] text-warning">{score}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <CuteButton
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            icon={isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          />
          <CuteButton
            variant="accent"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            icon={isPaused ? <Play size={16} /> : <Pause size={16} />}
          />
        </div>
      </div>

      {/* Timer during memorization */}
      {phase === "memorizing" && (
        <motion.div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full px-8 py-3 shadow-lg border-4 border-primary-foreground/20 flex items-center gap-3">
            <Clock size={20} />
            <span className="font-pixel text-xl">{timeLeft}s</span>
          </div>
        </motion.div>
      )}

      {/* Timer during guessing */}
      {phase === "guessing" && (
        <motion.div
          className="absolute top-20 right-4 z-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div
            className={`rounded-full px-4 py-2 shadow-lg border-2 flex items-center gap-2 ${
              isTimeFrozen
                ? "bg-pastel-blue border-info"
                : guessTimeLeft <= 5
                  ? "bg-destructive/90 border-destructive-foreground/20"
                  : "bg-card/95 border-border"
            }`}
          >
            <Timer
              size={16}
              className={
                isTimeFrozen
                  ? "text-info"
                  : guessTimeLeft <= 5
                    ? "text-destructive-foreground"
                    : "text-muted-foreground"
              }
            />
            <span
              className={`font-pixel text-sm ${
                isTimeFrozen
                  ? "text-info"
                  : guessTimeLeft <= 5
                    ? "text-destructive-foreground"
                    : "text-foreground"
              }`}
            >
              {isTimeFrozen ? `❄️ ${frozenTimeLeft}s` : `${guessTimeLeft}s`}
            </span>
          </div>
        </motion.div>
      )}

      {/* Phase indicator */}
      <motion.div
        className="absolute top-20 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        key={phase}
      >
        {phase === "watching" && (
          <div className="bg-card/95 backdrop-blur-sm text-foreground rounded-2xl px-8 py-4 font-pixel text-sm shadow-lg border-2 border-secondary/40 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Eye size={18} className="text-secondary" />
              <span>Watch carefully!</span>
            </div>
            <div className="text-muted-foreground font-body text-xs">
              Remember {rememberCount}/{config.animalsToWatch} animals
            </div>
          </div>
        )}
        {phase === "shuffling" && (
          <motion.div
            className="bg-gradient-to-r from-warning/90 to-accent/90 text-foreground rounded-2xl px-8 py-3 font-pixel text-sm shadow-lg border-2 border-warning/40"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-warning-foreground" />
              <span>Shuffling...</span>
            </div>
          </motion.div>
        )}
        {phase === "guessing" && (
          <div className="bg-card/95 backdrop-blur-sm text-foreground rounded-2xl px-8 py-3 font-pixel text-sm shadow-lg border-2 border-accent/40">
            <div className="flex items-center gap-2">
              Pick them in order! ({playerGuesses.length}/
              {config.animalsToWatch})
              {wrongAttempts > 0 && (
                <span className="text-destructive text-[10px]">
                  ({3 - wrongAttempts} tries left)
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Walking animals phase - LARGER */}
      <AnimatePresence>
        {phase === "watching" &&
          walkingAnimals
            .slice(0, animalsShown)
            .map((animalId, index) => (
              <WalkingAnimal
                key={`${animalId}-${index}`}
                animalId={animalId}
                delay={0}
                size={180}
              />
            ))}
      </AnimatePresence>

      {/* Memory cards - ALWAYS FACE UP with shuffle animation */}
      {(phase === "memorizing" ||
        phase === "shuffling" ||
        phase === "guessing") && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-6 border-4 border-border shadow-2xl relative">
            {/* Wrong flash overlay */}
            <AnimatePresence>
              {showWrongFlash && (
                <motion.div
                  className="absolute inset-0 bg-destructive/20 rounded-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>

            <div className="grid grid-cols-4 gap-3 relative">
              {shuffledCards.map((animalId, index) => {
                // Smooth shuffle with curved spring physics
                const targetPos = cardPositions[index] ?? index;
                const gridCol = targetPos % 4;
                const gridRow = Math.floor(targetPos / 4);

                // Natural curved motion offset
                const curveX = shuffleAnimating
                  ? Math.sin((index + targetPos) * 0.6) * 12
                  : 0;
                const curveY = shuffleAnimating
                  ? Math.cos((index - targetPos) * 0.5) * 8
                  : 0;

                return (
                  <motion.div
                    key={`${animalId}-${index}`}
                    layout="position"
                    layoutId={`card-${animalId}-${index}`}
                    animate={
                      shuffleAnimating
                        ? {
                            x: (gridCol - (index % 4)) * 110 + curveX,
                            y: (gridRow - Math.floor(index / 4)) * 130 + curveY,
                            rotate: Math.sin(index * 0.4) * 8,
                            scale: 0.92,
                          }
                        : {
                            x: 0,
                            y: 0,
                            rotate: 0,
                            scale: 1,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                      mass: 0.5,
                    }}
                    whileHover={
                      !shuffleAnimating && phase === "guessing"
                        ? {
                            scale: 1.06,
                            y: -4,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            },
                          }
                        : {}
                    }
                    style={{
                      position: "relative",
                      zIndex: shuffleAnimating ? 8 - (index % 4) : 1,
                    }}
                  >
                    <MemoryCard
                      animalId={animalId}
                      isFlipped={true}
                      isSelected={selectedCards.includes(index)}
                      isCorrect={cardStates[index] === "correct"}
                      isWrong={cardStates[index] === "wrong"}
                      onClick={() => handleCardClick(index, animalId)}
                      disabled={
                        phase !== "guessing" || selectedCards.includes(index)
                      }
                      size="md"
                      orderNumber={
                        selectedCards.includes(index)
                          ? selectedCards.indexOf(index) + 1
                          : undefined
                      }
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Hint during guessing */}
            {phase === "guessing" && (
              <motion.p
                className="text-center text-muted-foreground text-xs mt-4 font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Tap the animals in the order they walked by!
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      {/* Round result */}
      <AnimatePresence>
        {phase === "result" && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-30 bg-foreground/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card rounded-3xl p-8 border-4 border-border shadow-2xl text-center max-w-md relative overflow-hidden"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Centered penguin */}
              <motion.div
                className="flex justify-center mb-4"
                animate={
                  roundCorrect
                    ? { rotate: [0, -10, 10, 0], y: [-5, 0, -5] }
                    : { x: [-5, 5, -5, 5, 0] }
                }
                transition={{ duration: 0.5 }}
              >
                <Penguin
                  size={110}
                  isHappy={roundCorrect ?? false}
                  isSad={!roundCorrect}
                />
              </motion.div>

              <h2
                className={`font-pixel text-xl mb-2 ${roundCorrect ? "text-success" : "text-destructive"}`}
              >
                {roundCorrect ? "PERFECT!" : "NICE TRY!"}
              </h2>

              <p className="text-muted-foreground mb-6 font-body">
                {roundCorrect
                  ? `Amazing! You earned ${doublePoints ? 200 : 100} points!`
                  : "Keep going, you're doing great!"}
              </p>

              {/* Elegant celebration for correct answer */}
              {roundCorrect && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: -20,
                      }}
                      initial={{ y: 0, opacity: 1, scale: 0 }}
                      animate={{
                        y: 400,
                        opacity: [1, 1, 0],
                        scale: [0, 1, 1],
                        rotate: Math.random() * 360,
                      }}
                      transition={{ duration: 2, delay: i * 0.06 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16">
                        {i % 3 === 0 ? (
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            fill={
                              ["#FFD700", "#FF6B9D", "#4CAF50", "#87CEEB"][
                                i % 4
                              ]
                            }
                          />
                        ) : i % 3 === 1 ? (
                          <polygon
                            points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6"
                            fill={
                              ["#FFD700", "#FF6B9D", "#4CAF50", "#87CEEB"][
                                i % 4
                              ]
                            }
                          />
                        ) : (
                          <rect
                            x="2"
                            y="2"
                            width="12"
                            height="12"
                            rx="2"
                            fill={
                              ["#FFD700", "#FF6B9D", "#4CAF50", "#87CEEB"][
                                i % 4
                              ]
                            }
                          />
                        )}
                      </svg>
                    </motion.div>
                  ))}
                </div>
              )}

              <CuteButton variant="primary" size="lg" onClick={handleNextRound}>
                {currentRound >= config.totalRounds
                  ? "SEE RESULTS"
                  : "NEXT ROUND"}
              </CuteButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pendants bar - functional */}
      <motion.div
        className="absolute bottom-4 left-4 right-4 z-20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-3 border-2 border-border shadow-lg max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="font-pixel text-[8px] text-muted-foreground">
              PENDANTS:
            </span>
            {(
              ["hint", "freeze", "double", "shield", "reveal"] as PendantType[]
            ).map((type) => (
              <Pendant
                key={type}
                type={type}
                size={36}
                owned={pendants[type]}
                onClick={() => handleUsePendant(type)}
                disabled={pendants[type] <= 0 || phase !== "guessing"}
              />
            ))}

            {/* Active effects indicators */}
            <div className="ml-2 flex items-center gap-2">
              {hasShield && (
                <motion.div
                  className="px-2 py-1 bg-pastel-pink/80 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <span className="font-pixel text-[8px]">SHIELD</span>
                </motion.div>
              )}
              {doublePoints && (
                <motion.div
                  className="px-2 py-1 bg-pastel-mint/80 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <span className="font-pixel text-[8px]">2x</span>
                </motion.div>
              )}
              {isTimeFrozen && (
                <motion.div
                  className="px-2 py-1 bg-pastel-blue/80 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <span className="font-pixel text-[8px]">FROZEN</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pause overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40 bg-foreground/50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                className="flex justify-center"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Penguin size={140} />
              </motion.div>
              <h2 className="font-pixel text-2xl text-primary-foreground mt-4 drop-shadow-lg">
                PAUSED
              </h2>
              <p className="text-primary-foreground/80 font-body mb-4">
                Take a little break!
              </p>
              <CuteButton
                variant="primary"
                size="lg"
                onClick={() => setIsPaused(false)}
                icon={<Play size={20} />}
              >
                RESUME
              </CuteButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
