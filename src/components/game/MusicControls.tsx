import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface MusicControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export const MusicControls = ({
  isPlaying,
  isMuted,
  volume,
  onToggleMusic,
  onToggleMute,
  onVolumeChange,
}: MusicControlsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Main music button */}
      <motion.button
        className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 shadow-md transition-all ${
          isPlaying && !isMuted
            ? "bg-gradient-to-r from-primary/20 to-accent/20 border-primary/40 text-primary"
            : "bg-card/95 backdrop-blur-sm border-border text-muted-foreground"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying && !isMuted ? (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Music size={18} />
          </motion.div>
        ) : (
          <VolumeX size={18} />
        )}
        <span className="font-pixel text-[8px] hidden sm:inline">
          {isPlaying && !isMuted ? "♪" : "OFF"}
        </span>
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </motion.button>

      {/* Expanded controls */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute top-full right-0 mt-2 p-3 bg-card/98 backdrop-blur-md rounded-2xl border-2 border-border shadow-lg z-50 min-w-[180px]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Play/Stop toggle */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-body">Background Music</span>
              <motion.button
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  isPlaying ? "bg-primary" : "bg-muted"
                }`}
                onClick={onToggleMusic}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ left: isPlaying ? "calc(100% - 20px)" : "4px" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Mute button */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground font-body">Mute</span>
              <motion.button
                className={`p-2 rounded-lg transition-colors ${
                  isMuted ? "bg-destructive/20 text-destructive" : "bg-muted text-foreground"
                }`}
                onClick={onToggleMute}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </motion.button>
            </div>

            {/* Volume slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-body">Volume</span>
                <span className="text-xs text-foreground font-pixel">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%)`,
                  }}
                />
              </div>
            </div>

            {/* Visual feedback */}
            {isPlaying && !isMuted && (
              <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-border/50">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: [8, 16, 8, 20, 8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <span className="ml-2 text-[10px] text-muted-foreground font-body">
                  Playing...
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
