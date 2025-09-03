import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle, Search } from 'lucide-react';

const EnhancedFormInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  success,
  icon: Icon,
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hasValue = value && value.length > 0;

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`relative group ${className}`}>
      {/* Label */}
      <motion.label
        className={`
          absolute right-4 bg-white px-2 text-sm font-medium pointer-events-none
          transition-all duration-300 ease-out-expo z-10
          ${isFocused || hasValue 
            ? 'top-0 transform -translate-y-1/2 text-forest-600 scale-90' 
            : 'top-1/2 transform -translate-y-1/2 text-gray-500'
          }
          ${error ? 'text-red-500' : ''}
          ${success ? 'text-emerald-500' : ''}
        `}
        animate={{
          top: isFocused || hasValue ? '0px' : '50%',
          scale: isFocused || hasValue ? 0.9 : 1,
          color: error ? '#ef4444' : success ? '#10b981' : isFocused ? '#1b4332' : '#6b7280'
        }}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <Icon className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? 'text-forest-600' : 'text-gray-400'
            }`} />
          </div>
        )}

        {/* Input field */}
        <motion.input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={isFocused ? placeholder : ''}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full h-14 px-4 text-base font-medium bg-white border-2 rounded-xl
            transition-all duration-300 ease-out-expo
            focus:outline-none focus:ring-4 focus:ring-forest-500/20
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${Icon ? 'pl-12' : ''}
            ${type === 'password' ? 'pr-12' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500' 
              : success 
              ? 'border-emerald-300 focus:border-emerald-500'
              : 'border-gray-300 focus:border-forest-500'
            }
            ${isFocused ? 'shadow-lg' : 'shadow-sm'}
          `}
          whileFocus={{ scale: 1.02 }}
          {...props}
        />

        {/* Password visibility toggle */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Status icons */}
        {(error || success) && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            {success && <CheckCircle className="w-5 h-5 text-emerald-500" />}
          </div>
        )}
      </div>

      {/* Error/Success messages */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 flex items-center gap-2"
          >
            {error && (
              <>
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span className="text-sm text-red-600">{error}</span>
              </>
            )}
            {success && (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-emerald-600">{success}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Specialized input variants
export const SearchInput = ({ onSearch, ...props }) => (
  <EnhancedFormInput
    type="search"
    icon={Search}
    placeholder="ابحث..."
    {...props}
  />
);

export const FormGroup = ({ children, className = '' }) => (
  <div className={`space-y-6 ${className}`}>
    {children}
  </div>
);

export default EnhancedFormInput;
