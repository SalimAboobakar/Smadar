import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Star, TrendingUp, Zap } from 'lucide-react';

const UltimateCard = ({ 
  children, 
  variant = 'elevated', 
  interactive = false,
  glow = false,
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    elevated: `
      bg-white border border-gray-200 shadow-card
      hover:shadow-card-hover hover:-translate-y-2 hover:scale-[1.02]
      hover:border-emerald-300 transition-all duration-300 ease-out-expo
      relative overflow-hidden
    `,
    glass: `
      card-glass backdrop-blur-xl
      hover:bg-white/20 hover:-translate-y-1
      transition-all duration-300 ease-out-expo
    `,
    gradient: `
      gradient-forest text-white shadow-forest
      hover:shadow-2xl hover:-translate-y-2
      transition-all duration-300 ease-out-expo
    `,
    outline: `
      bg-transparent border-2 border-emerald-200
      hover:border-emerald-400 hover:bg-emerald-50 hover:-translate-y-1
      transition-all duration-300 ease-out-expo
    `,
  };

  const baseClasses = `
    rounded-2xl p-6 relative
    ${interactive ? 'cursor-pointer' : ''}
    ${glow ? 'hover:shadow-glow-lg' : ''}
    ${variants[variant]}
    ${className}
  `;

  const cardContent = (
    <div className="relative z-10">
      {/* Shimmer effect for elevated cards */}
      {variant === 'elevated' && (
        <motion.div
          className="absolute inset-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={isHovered ? { left: '100%' } : { left: '-100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      
      {children}
    </div>
  );

  if (interactive) {
    return (
      <motion.div
        className={baseClasses}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div 
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {cardContent}
    </div>
  );
};

// Specialized card variants
export const MetricCard = ({ title, value, icon: Icon, trend, change, className = '' }) => (
  <UltimateCard variant="elevated" glow interactive className={`${className}`}>
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-forest-100">
        <Icon className="w-6 h-6 text-forest-600" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          <TrendingUp className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
          {change}
        </div>
      )}
    </div>
    
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1 font-display">{value}</h3>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
    </div>
  </UltimateCard>
);

export const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  action, 
  badge,
  className = '' 
}) => (
  <UltimateCard variant="elevated" interactive glow className={`group ${className}`}>
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-forest-600 text-white">
          <Icon className="w-8 h-8" />
        </div>
        {badge && (
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
            {badge}
          </span>
        )}
      </div>
      
      <div className="flex-1 mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
      
      {action && (
        <div className="flex items-center gap-2 text-forest-600 font-medium group-hover:text-forest-700 transition-colors">
          <span>{action}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  </UltimateCard>
);

export const StatusCard = ({ 
  status, 
  title, 
  message, 
  action,
  className = '' 
}) => {
  const statusConfig = {
    success: {
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-600',
      icon: Star,
    },
    warning: {
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-600',
      icon: Zap,
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      iconColor: 'text-red-600',
      icon: Zap,
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      icon: TrendingUp,
    },
  };

  const config = statusConfig[status] || statusConfig.info;
  const Icon = config.icon;

  return (
    <UltimateCard 
      variant="outline" 
      className={`${config.bgColor} ${config.borderColor} ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${config.iconColor} bg-white/50`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-700 text-sm mb-3">{message}</p>
          {action && (
            <button className={`text-sm font-medium ${config.iconColor} hover:underline`}>
              {action}
            </button>
          )}
        </div>
      </div>
    </UltimateCard>
  );
};

export default UltimateCard;
