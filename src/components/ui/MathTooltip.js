import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MathTooltip = ({
  children,
  equation,
  title,
  description,
  variables = [],
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleClick = () => {
    setIsPinned(!isPinned);
    if (!isPinned) {
      setIsVisible(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isPinned) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsVisible(false);
    }
  };

  const handleCloseTooltip = (e) => {
    e.stopPropagation();
    setIsPinned(false);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div
        className={`cursor-help transition-all duration-200 hover:scale-105 ${
          isPinned ? "ring-2 ring-primary-400/50 rounded-xl" : ""
        }`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isPinned ? 0.9 : 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-50 left-1/2 transform -translate-x-1/2 ${
              isPinned ? "top-1/2 -translate-y-1/2" : "-top-4 -translate-y-full"
            }`}
            style={{
              minWidth: isPinned ? "280px" : "320px",
              maxWidth: "360px",
            }}
          >
            <div className="bg-gradient-to-br from-slate-800/98 via-slate-700/98 to-slate-800/98 border border-primary-400/40 rounded-xl shadow-2xl backdrop-blur-md relative">
              {/* Close button for pinned state */}
              {isPinned && (
                <button
                  onClick={handleCloseTooltip}
                  className="absolute top-2 left-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors z-10"
                >
                  ×
                </button>
              )}

              {/* Arrow for hover state */}
              {!isPinned && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-slate-700"></div>
              )}

              <div className={`p-${isPinned ? "3" : "4"}`}>
                {/* Title */}
                <h3
                  className={`font-bold text-white text-center border-b border-white/20 pb-2 mb-2 ${
                    isPinned ? "text-xs" : "text-sm"
                  }`}
                >
                  {title || "Loading..."}
                </h3>

                {/* Mathematical Equation */}
                <div className="bg-gray-900/70 rounded-lg p-2 mb-2 border border-primary-400/30">
                  <div
                    className={`text-white font-mono text-center leading-relaxed ${
                      isPinned ? "text-xs" : "text-sm"
                    }`}
                    style={{ fontFamily: "Consolas, Monaco, monospace" }}
                    dangerouslySetInnerHTML={{ __html: equation || "" }}
                  />
                </div>

                {/* Variables Legend */}
                {variables.length > 0 && (
                  <div className="mb-2">
                    <h4
                      className={`font-semibold text-primary-400 mb-1 ${
                        isPinned ? "text-xs" : "text-xs"
                      }`}
                    >
                      المتغيرات:
                    </h4>
                    <div className="grid grid-cols-1 gap-1">
                      {variables.map((variable, index) => (
                        <VariableTooltip
                          key={index}
                          variable={variable.symbol}
                          description={variable.description}
                        >
                          <div
                            className={`flex items-center space-x-2 rtl:space-x-reverse p-1.5 bg-gray-900/30 rounded border border-white/10 hover:bg-gray-900/50 transition-colors ${
                              isPinned ? "text-xs" : "text-xs"
                            }`}
                          >
                            <span className="font-bold text-accent-400">
                              {variable.symbol}
                            </span>
                            <span className="text-white/80">=</span>
                            <span className="text-white/70 leading-tight">
                              {variable.description}
                            </span>
                          </div>
                        </VariableTooltip>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <p
                  className={`text-white/80 leading-relaxed text-center ${
                    isPinned ? "text-xs" : "text-xs"
                  }`}
                >
                  {description}
                </p>

                {/* Footer */}
                <div className="mt-3 p-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-lg border border-primary-400/20">
                  <p
                    className={`text-white/60 text-center ${
                      isPinned ? "text-xs" : "text-xs"
                    }`}
                  >
                    {isPinned
                      ? "اضغط مرة أخرى لإخفاء المعادلة"
                      : "اضغط لتثبيت المعادلة • حرك الماوس فوق المتغيرات لمعرفة التفاصيل"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Greek Letters Tooltip Component
export const VariableTooltip = ({ variable, description, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-60 top-full left-1/2 transform -translate-x-1/2 mt-2"
          >
            <div className="bg-gray-900 border border-accent-400/50 rounded-lg px-3 py-2 shadow-xl">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-slate-800"></div>
              <p className="text-white text-xs whitespace-nowrap">
                <span className="font-bold text-accent-400">{variable}</span>:{" "}
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MathTooltip;
