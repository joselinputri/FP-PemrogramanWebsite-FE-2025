// src/pages/watch-and-memorize/PlayWatchAndMemorize.tsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "./components/game/Dashboard";

interface DifficultyConfig {
  animalsToWatch: number;
  memorizationTime: number;
  totalRounds: number;
  shuffleSpeed: number;
  guessTimeLimit: number;
}

interface ShopConfig {
  hint: { price: number; available: boolean };
  freeze: { price: number; available: boolean };
  double: { price: number; available: boolean };
  shield: { price: number; available: boolean };
  reveal: { price: number; available: boolean };
}

interface GameConfig {
  id: string;
  name: string;
  description: string;
  thumbnail_image: string;
  background_music?: string;
  difficulty_configs: {
    easy: DifficultyConfig; // ✅ Fix
    medium: DifficultyConfig; // ✅ Fix
    hard: DifficultyConfig; // ✅ Fix
  };
  available_animals: string[];
  shop_config: ShopConfig; // ✅ Fix
}

const PlayWatchAndMemorize = () => {
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  const [stage, setStage] = useState<"loading" | "intro" | "playing">(
    "loading",
  );
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load game config dari backend
  useEffect(() => {
    const loadGameConfig = async () => {
      if (!gameId) {
        setError("Game ID not found");
        setStage("intro");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/game/game-type/watch-and-memorize/${gameId}/play/public`,
        );

        if (!response.ok) {
          throw new Error("Failed to load game");
        }

        const result = await response.json();
        setGameConfig(result.data);

        // Update play count
        await fetch(`${import.meta.env.VITE_API_URL}/api/game/play-count`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ game_id: gameId }),
        });

        console.log("✅ Game config loaded:", result.data);
        setStage("intro");
      } catch (err) {
        console.error("❌ Failed to load game:", err);
        setError("Failed to load game. Please try again.");
        setStage("intro");
      }
    };

    loadGameConfig();
  }, [gameId]);

  const handleExit = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleStartGame = () => {
    setStage("playing");
  };

  // Loading Screen
  if (stage === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-blue to-pastel-pink flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-8 border-white border-t-transparent mx-auto mb-6"></div>
          <p className="text-white font-pixel text-2xl animate-pulse">
            Loading Game...
          </p>
        </div>
      </div>
    );
  }

  // Intro/Start Screen
  if (stage === "intro") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-pastel-purple via-pastel-blue to-pastel-pink flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: gameConfig?.thumbnail_image
            ? `url(${import.meta.env.VITE_API_URL}/${gameConfig.thumbnail_image})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl px-6">
          {error ? (
            <div className="bg-red-500/90 backdrop-blur-md rounded-3xl p-8 mb-6">
              <h1 className="text-4xl font-black text-white mb-4">⚠️ Error</h1>
              <p className="text-white text-xl">{error}</p>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 mb-6 shadow-2xl">
              <h1 className="text-5xl font-black text-slate-900 mb-4 drop-shadow-lg">
                {gameConfig?.name || "Watch & Memorize"}
              </h1>
              <p className="text-slate-700 text-lg mb-6">
                {gameConfig?.description ||
                  "Test your memory with cute animals!"}
              </p>

              {/* Game Info */}
              <div className="flex justify-center gap-4 mb-6 flex-wrap">
                <div className="bg-green-100 px-4 py-2 rounded-full">
                  <span className="text-green-700 font-bold">🟢 Easy</span>
                </div>
                <div className="bg-yellow-100 px-4 py-2 rounded-full">
                  <span className="text-yellow-700 font-bold">🟡 Medium</span>
                </div>
                <div className="bg-red-100 px-4 py-2 rounded-full">
                  <span className="text-red-700 font-bold">🔴 Hard</span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!error && (
              <button
                onClick={handleStartGame}
                className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)]"
              >
                <span className="text-white font-black text-2xl tracking-wider">
                  START GAME
                </span>
              </button>
            )}

            <button
              onClick={handleExit}
              className="px-12 py-5 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-white transition-all duration-300 shadow-xl"
            >
              <span className="text-slate-700 font-bold text-xl">
                Back to Menu
              </span>
            </button>
          </div>

          {/* Instructions */}
          {!error && (
            <div className="mt-8 bg-black/60 backdrop-blur-md rounded-2xl p-6 text-white">
              <h3 className="font-bold text-xl mb-3">📖 How to Play:</h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li>👀 Watch the animals carefully</li>
                <li>🧠 Memorize their positions</li>
                <li>🎯 Click the correct animals in order</li>
                <li>💰 Earn coins to buy power-ups in the shop</li>
                <li>🏆 Complete all rounds to win!</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Playing Stage - Render Dashboard dengan game config
  if (stage === "playing" && gameConfig) {
    return <Dashboard onExit={handleExit} gameConfig={gameConfig} />;
  }

  // Fallback
  return null;
};

export default PlayWatchAndMemorize;
