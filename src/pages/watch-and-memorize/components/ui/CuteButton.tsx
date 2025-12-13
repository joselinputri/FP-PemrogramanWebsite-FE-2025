import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CuteButtonProps {
  variant?: "primary" | "secondary" | "accent" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const CuteButton = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  disabled,
  onClick,
}: CuteButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-pixel rounded-full
    transition-all duration-150 ease-out
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
  `;

  const variantClasses = {
    primary: `bg-primary text-primary-foreground shadow-[0_4px_0_0_hsl(350,70%,45%)] hover:shadow-[0_6px_0_0_hsl(350,70%,45%)] hover:-translate-y-[3px] active:shadow-[0_2px_0_0_hsl(350,70%,45%)] active:translate-y-[2px] hover:brightness-110`,
    secondary: `bg-secondary text-secondary-foreground shadow-[0_4px_0_0_hsl(160,45%,50%)] hover:shadow-[0_6px_0_0_hsl(160,45%,50%)] hover:-translate-y-[3px] active:shadow-[0_2px_0_0_hsl(160,45%,50%)] active:translate-y-[2px] hover:brightness-110`,
    accent: `bg-accent text-accent-foreground shadow-[0_4px_0_0_hsl(270,50%,60%)] hover:shadow-[0_6px_0_0_hsl(270,50%,60%)] hover:-translate-y-[3px] active:shadow-[0_2px_0_0_hsl(270,50%,60%)] active:translate-y-[2px] hover:brightness-110`,
    success: `bg-success text-success-foreground shadow-[0_4px_0_0_hsl(120,50%,35%)] hover:shadow-[0_6px_0_0_hsl(120,50%,35%)] hover:-translate-y-[3px] active:shadow-[0_2px_0_0_hsl(120,50%,35%)] active:translate-y-[2px] hover:brightness-110`,
    danger: `bg-destructive text-destructive-foreground shadow-[0_4px_0_0_hsl(0,70%,40%)] hover:shadow-[0_6px_0_0_hsl(0,70%,40%)] hover:-translate-y-[3px] active:shadow-[0_2px_0_0_hsl(0,70%,40%)] active:translate-y-[2px] hover:brightness-110`,
    ghost: `bg-transparent text-foreground border-2 border-foreground/20 hover:bg-foreground/10 hover:border-foreground/40 shadow-none hover:-translate-y-[2px]`,
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-[8px]",
    md: "px-6 py-3 text-[10px]",
    lg: "px-8 py-4 text-xs",
  };

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.5 }}
      />
      {icon && iconPosition === "left" && (
        <motion.span 
          className="flex-shrink-0 relative z-10"
          whileHover={{ rotate: [-5, 5, 0], scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
      )}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === "right" && (
        <motion.span 
          className="flex-shrink-0 relative z-10"
          whileHover={{ rotate: [5, -5, 0], scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
};
