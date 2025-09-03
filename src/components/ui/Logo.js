import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ 
  size = 'medium', 
  variant = 'full', 
  className = '',
  showText = true,
  animated = true 
}) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl',
    xl: 'text-4xl'
  };

  const LogoIcon = () => (
    <div className={`${sizeClasses[size]} relative group`}>
      {/* الخلفية المتدرجة الرئيسية */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-accent-500 to-primary-600 rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300" />
      
      {/* الطبقة الداخلية */}
      <div className="absolute inset-1 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center overflow-hidden">
        {/* النص الرئيسي - يدوم */}
        <div className="relative w-full h-full flex items-center justify-center">
          <span className="text-white font-bold text-xs md:text-sm leading-none transform group-hover:scale-110 transition-transform duration-300">
            يدوم
          </span>
          
          {/* نقاط تزيينية متحركة */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse delay-700" />
        </div>
      </div>
      
      {/* لمعة خارجية متحركة */}
      <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary-400/30 rounded-full blur-sm animate-pulse" />
      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent-400/20 rounded-full blur-sm animate-pulse delay-500" />
    </div>
  );

  const AnimatedLogo = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className={`flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group ${className}`}
    >
      <LogoIcon />
      
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col"
        >
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300`}>
            منصة يدوم
          </h1>
          {(size === 'large' || size === 'xl') && (
            <p className="text-xs text-gray-600 leading-tight mt-1 group-hover:text-gray-700 transition-colors">
              ذكاء استثماري بلمسة المجتمع
            </p>
          )}
          {(size === 'medium') && (
            <p className="text-xs text-gray-500 leading-tight mt-0.5 hidden sm:block">
              ذكاء استثماري
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  const StaticLogo = () => (
    <div className={`flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group ${className}`}>
      <LogoIcon />
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent leading-tight group-hover:from-primary-500 group-hover:to-accent-500 transition-all duration-300`}>
            منصة يدوم
          </h1>
          {(size === 'large' || size === 'xl') && (
            <p className="text-xs text-gray-600 leading-tight mt-1 group-hover:text-gray-700 transition-colors">
              ذكاء استثماري بلمسة المجتمع
            </p>
          )}
          {(size === 'medium') && (
            <p className="text-xs text-gray-500 leading-tight mt-0.5 hidden sm:block">
              ذكاء استثماري
            </p>
          )}
        </div>
      )}
    </div>
  );

  return animated ? <AnimatedLogo /> : <StaticLogo />;
};

export default Logo;
