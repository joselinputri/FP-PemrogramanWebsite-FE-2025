import { motion } from "framer-motion";
import { X, ShoppingBag, Sparkles } from "lucide-react";
import { PendantCard, PendantType } from "./Pendant";
import { CuteButton } from "../ui/CuteButton";

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  pendants: Record<PendantType, number>;
  onBuyPendant: (type: PendantType, price: number) => void;
}

const PENDANT_PRICES: Record<PendantType, number> = {
  hint: 50,
  freeze: 75,
  double: 100,
  shield: 80,
  reveal: 120,
};

// Custom coin icon
const CoinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#FFD700" stroke="#E5A800" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill="#FFEC8B" />
    <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#B8860B">$</text>
  </svg>
);

export const Shop = ({
  isOpen,
  onClose,
  coins,
  pendants,
  onBuyPendant,
}: ShopProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-pastel-cream via-card to-pastel-mint/30 rounded-3xl p-5 border-4 border-primary/20 shadow-2xl max-w-lg w-full mx-4 max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ShoppingBag className="text-primary" size={28} />
            </motion.div>
            <h2 className="font-pixel text-lg text-foreground">MAGIC SHOP</h2>
          </div>
          
          <CuteButton variant="ghost" size="sm" onClick={onClose} icon={<X size={16} />} />
        </div>
        
        {/* Coins display */}
        <div className="flex justify-center mb-5">
          <motion.div
            className="bg-gradient-to-r from-warning/20 via-warning/30 to-warning/20 rounded-full px-6 py-2 border-2 border-warning/50 flex items-center gap-2 shadow-md"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <CoinIcon size={22} />
            <span className="font-pixel text-lg text-warning">{coins}</span>
          </motion.div>
        </div>

        {/* Decorative sparkles */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={14} className="text-warning" />
          <span className="text-xs text-muted-foreground font-body">Magical pendants to help you win!</span>
          <Sparkles size={14} className="text-warning" />
        </div>
        
        {/* Pendants grid - 2x3 layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(Object.keys(PENDANT_PRICES) as PendantType[]).map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PendantCard
                type={type}
                owned={pendants[type]}
                price={PENDANT_PRICES[type]}
                canAfford={coins >= PENDANT_PRICES[type]}
                onBuy={() => onBuyPendant(type, PENDANT_PRICES[type])}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Info */}
        <motion.div 
          className="mt-5 p-3 bg-muted/40 rounded-xl border border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-muted-foreground text-center font-body">
            Complete games to earn more coins!
            <br />
            <span className="text-primary">Each correct round = 10 coins + bonus!</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
