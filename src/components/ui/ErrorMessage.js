import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, RefreshCw } from "lucide-react";

const ErrorMessage = ({
  error,
  onRetry,
  onDismiss,
  showRetry = true,
  showDismiss = true,
  className = "",
}) => {
  if (!error) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-red-500/10 border border-red-500/20 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-red-300 font-semibold mb-1">حدث خطأ</h4>
            <p className="text-red-200 text-sm leading-relaxed">
              {error.message || "حدث خطأ غير متوقع"}
            </p>

            {process.env.NODE_ENV === "development" && error.stack && (
              <details className="mt-2">
                <summary className="text-red-300 text-xs cursor-pointer">
                  تفاصيل الخطأ (وضع التطوير)
                </summary>
                <pre className="text-red-200 text-xs mt-1 whitespace-pre-wrap overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showRetry && onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                title="إعادة المحاولة"
              >
                <RefreshCw className="w-4 h-4 text-red-400" />
              </motion.button>
            )}

            {showDismiss && onDismiss && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDismiss}
                className="p-1.5 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                title="إغلاق"
              >
                <X className="w-4 h-4 text-red-400" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;
