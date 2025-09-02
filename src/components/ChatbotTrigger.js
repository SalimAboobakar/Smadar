import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Bot, Sparkles } from "lucide-react";
import AIChatbot from "./AIChatbot";

const ChatbotTrigger = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-accent-500 to-accent-600 text-white p-4 rounded-full shadow-2xl hover:shadow-accent-500/25 transition-all duration-300 group"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
          />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/80 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>المستشار الذكي</span>
            </div>
            <div className="text-xs text-white/70 mt-1">
              اسأل عن مشروعك الاستثماري
            </div>
          </div>
        </div>
      </motion.button>

      <AIChatbot
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
};

export default ChatbotTrigger;
