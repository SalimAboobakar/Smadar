import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedCard = ({
  children,
  className = "",
  variant = "elevated",
  interactive = false,
  glow = false,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    glass: `
      bg-white/10 backdrop-blur-xl border border-white/20 
      hover:bg-white/15 hover:border-white/30
    `,
    elevated: `
      bg-white border border-gray-200 shadow-card
      hover:shadow-card-hover hover:border-emerald-300
    `,
    gradient: `
      gradient-forest text-white shadow-forest
      hover:shadow-2xl
    `,
    outline: `
      bg-transparent border-2 border-emerald-200
      hover:border-emerald-400 hover:bg-emerald-50
    `,
  };

  return (
    <motion.div
      className={`
        relative group/card rounded-2xl p-6 w-auto h-auto
        transition-all duration-300 ease-out-expo
        ${variants[variant]}
        ${glow ? "hover:shadow-glow-lg" : ""}
        ${interactive ? "cursor-pointer" : ""}
        ${className}
      `}
      whileHover={{
        y: interactive ? -8 : -5,
        scale: interactive ? 1.02 : 1,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      {...props}
    >
      {/* Shimmer effect for elevated cards */}
      {variant === "elevated" && (
        <motion.div
          className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={isHovered ? { left: "100%" } : { left: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10">{children}</div>

      {/* Enhanced glow effect */}
      <div
        className={`
        absolute inset-0 w-full h-full rounded-2xl blur-3xl 
        bg-gradient-to-r from-emerald-500/20 to-forest-500/20
        opacity-0 group-hover/card:opacity-100 transition-opacity duration-500
        ${glow ? "group-hover/card:opacity-60" : ""}
      `}
      />
    </motion.div>
  );
};

export default AnimatedCard;
