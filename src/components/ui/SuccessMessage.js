import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

const SuccessMessage = ({
  message,
  onDismiss,
  showDismiss = true,
  autoHide = true,
  duration = 5000,
  className = "",
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) {
          setTimeout(onDismiss, 300); // انتظار انتهاء animation
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-green-500/10 border border-green-500/20 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-green-300 font-semibold mb-1">تم بنجاح</h4>
            <p className="text-green-200 text-sm leading-relaxed">
              {message || "تم تنفيذ العملية بنجاح"}
            </p>
          </div>

          {showDismiss && onDismiss && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsVisible(false);
                setTimeout(onDismiss, 300);
              }}
              className="p-1.5 bg-green-500/20 rounded-lg hover:bg-green-500/30 transition-colors"
              title="إغلاق"
            >
              <X className="w-4 h-4 text-green-400" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessMessage;
