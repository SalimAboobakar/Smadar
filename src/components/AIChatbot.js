import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  X,
  RotateCcw,
} from "lucide-react";
import { aiChatbot } from "../services/aiChatbotService";
import AnimatedCard from "./ui/AnimatedCard";

const AIChatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize with welcome message
      setMessages([
        {
          id: 1,
          role: "assistant",
          content: `مرحباً! 🤖 أنا مستشارك الاستثماري الذكي في محافظة ظفار.

💡 يمكنني مساعدتك في:
• تحليل جدوى مشاريعك الاستثمارية
• تقييم المخاطر والفرص
• تقديم توصيات ذكية
• الإجابة على أسئلتك

🚀 ابدأ بوصف فكرتك الاستثمارية، مثل:
"أريد فتح فندق في صلالة للسياح بمبلغ 200,000 ريال"`,
          timestamp: new Date(),
          metadata: { type: "welcome" },
        },
      ]);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await aiChatbot.processUserInput(inputMessage);

      // Simulate typing delay
      setTimeout(() => {
        const assistantMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: response.content,
          timestamp: response.timestamp,
          metadata: response.metadata,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Chatbot Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "أعتذر، حدث خطأ في المعالجة. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
        metadata: { type: "error" },
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    aiChatbot.clearConversation();
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "تم مسح المحادثة. كيف يمكنني مساعدتك اليوم؟",
        timestamp: new Date(),
        metadata: { type: "welcome" },
      },
    ]);
  };

  const formatMessage = (content) => {
    return content.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </span>
    ));
  };

  const getMessageIcon = (role, metadata) => {
    if (role === "user") return <User className="w-4 h-4" />;

    if (metadata?.type === "analysis")
      return <TrendingUp className="w-4 h-4" />;
    if (metadata?.type === "error") return <AlertCircle className="w-4 h-4" />;
    if (metadata?.type === "welcome") return <Sparkles className="w-4 h-4" />;

    return <Bot className="w-4 h-4" />;
  };

  const getMessageColor = (role, metadata) => {
    if (role === "user") return "bg-primary-500";
    if (metadata?.type === "analysis") return "bg-green-500";
    if (metadata?.type === "error") return "bg-red-500";
    return "bg-accent-500";
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-full max-w-4xl h-[80vh] bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                المستشار الاستثماري الذكي
              </h3>
              <p className="text-sm text-white/70">
                تحليل ذكي لمشاريعك في ظفار
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearConversation}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              title="مسح المحادثة"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${getMessageColor(
                      message.role,
                      message.metadata
                    )}`}
                  >
                    {getMessageIcon(message.role, message.metadata)}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary-500 text-white"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                  >
                    <div className="text-sm leading-relaxed">
                      {formatMessage(message.content)}
                    </div>
                    <div
                      className={`text-xs mt-2 opacity-70 ${
                        message.role === "user"
                          ? "text-primary-100"
                          : "text-white/50"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("ar-SA", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white/10 text-white border border-white/20 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">جاري التحليل...</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب فكرتك الاستثمارية أو سؤالك..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:from-accent-600 hover:to-accent-700 transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIChatbot;
