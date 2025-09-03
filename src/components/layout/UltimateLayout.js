import React from 'react';
import { motion } from 'framer-motion';

// Container component with responsive design
export const Container = ({ 
  children, 
  maxWidth = '7xl',
  padding = true,
  className = '' 
}) => {
  const maxWidths = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    'full': 'max-w-full',
  };

  return (
    <div className={`
      ${maxWidths[maxWidth]} mx-auto
      ${padding ? 'px-4 sm:px-6 lg:px-8' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Hero Section Component
export const HeroSection = ({ 
  children, 
  background = 'gradient',
  overlay = true,
  className = '' 
}) => {
  const backgrounds = {
    gradient: 'bg-gradient-to-br from-forest-900 via-forest-800 to-emerald-900',
    solid: 'bg-forest-900',
    light: 'bg-forest-50',
    transparent: 'bg-transparent',
  };

  return (
    <section className={`
      relative overflow-hidden
      ${backgrounds[background]}
      ${className}
    `}>
      {/* Animated background elements */}
      <motion.div
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-forest-400/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {overlay && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

// Section Component
export const Section = ({ 
  children, 
  background = 'white',
  padding = 'lg',
  className = '' 
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    forest: 'bg-forest-50',
    emerald: 'bg-emerald-50',
    transparent: 'bg-transparent',
  };

  const paddings = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
    '2xl': 'py-32',
  };

  return (
    <section className={`
      ${backgrounds[background]}
      ${paddings[padding]}
      ${className}
    `}>
      {children}
    </section>
  );
};

// Animated page wrapper
export const AnimatedPage = ({ children, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

export default {
  Container,
  HeroSection,
  Section,
  AnimatedPage,
};
