import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const UltimateButton = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const variants = {
    primary: `
      gradient-forest text-white shadow-forest
      hover:shadow-glow-lg hover:-translate-y-1
      active:translate-y-0 active:shadow-forest
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    secondary: `
      bg-white text-forest-600 border-2 border-forest-300 shadow-sm
      hover:bg-forest-50 hover:border-forest-400 hover:-translate-y-1
      active:translate-y-0 active:bg-forest-100
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    outline: `
      bg-transparent text-forest-600 border-2 border-forest-600
      hover:bg-forest-600 hover:text-white hover:-translate-y-1
      active:translate-y-0 active:bg-forest-700
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    ghost: `
      bg-transparent text-forest-600 
      hover:bg-forest-100 hover:-translate-y-0.5
      active:translate-y-0 active:bg-forest-200
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    glass: `
      btn-glass text-white
      hover:bg-white/20 hover:-translate-y-1
      active:translate-y-0 active:bg-white/30
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    gradient: `
      gradient-emerald text-white shadow-emerald
      hover:shadow-glow hover:-translate-y-1
      active:translate-y-0 active:shadow-emerald
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
    danger: `
      bg-red-600 text-white shadow-lg
      hover:bg-red-700 hover:shadow-xl hover:-translate-y-1
      active:translate-y-0 active:bg-red-800
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `,
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-lg min-h-[28px]',
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[36px]',
    md: 'px-6 py-3 text-base rounded-xl min-h-[44px]',
    lg: 'px-8 py-4 text-lg rounded-xl min-h-[52px]',
    xl: 'px-10 py-5 text-xl rounded-2xl min-h-[60px]',
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold
    transition-all duration-300 ease-out-expo
    focus:outline-none focus:ring-4 focus:ring-emerald-500/20
    relative overflow-hidden
    ${fullWidth ? 'w-full' : ''}
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  const handleClick = (e) => {
    if (disabled || loading) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick && onClick(e);
  };

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    if (Icon) {
      return <Icon className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <motion.button
      className={baseClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full scale-0"
        animate={isPressed ? { scale: 4, opacity: 0 } : { scale: 0, opacity: 0.3 }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Shimmer effect */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ left: ['−100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {iconPosition === 'left' && renderIcon()}
        {children}
        {iconPosition === 'right' && renderIcon()}
      </div>
    </motion.button>
  );
};

// Specialized button variants
export const ActionButton = ({ action, ...props }) => (
  <UltimateButton variant="primary" {...props}>
    {action}
  </UltimateButton>
);

export const CtaButton = ({ children, ...props }) => (
  <UltimateButton 
    variant="gradient" 
    size="lg" 
    className="animate-pulse-glow" 
    {...props}
  >
    {children}
  </UltimateButton>
);

export const FloatingActionButton = ({ icon: Icon, onClick, className = '' }) => (
  <motion.button
    className={`
      fixed bottom-6 left-6 w-14 h-14 
      gradient-forest text-white rounded-full shadow-2xl
      flex items-center justify-center
      hover:shadow-glow-lg hover:scale-110
      active:scale-95 transition-all duration-300
      z-50 ${className}
    `}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-6 h-6" />
  </motion.button>
);

export const ButtonGroup = ({ children, className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {children}
  </div>
);

export default UltimateButton;
