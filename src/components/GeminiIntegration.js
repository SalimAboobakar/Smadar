import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import {
  analyzeProjectWithGemini,
  generateSmartRecommendations,
  analyzeRisksWithGemini,
  analyzeMarketCompetition,
  generateActionPlan,
} from "../services/geminiService";

const GeminiIntegration = ({ projectData, results }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);
  const [detailedMode, setDetailedMode] = useState(false);

  const handleGeminiAnalysis = async (analysisType) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      let result;

      switch (analysisType) {
        case "overview":
          result = await analyzeProjectWithGemini(projectData, detailedMode);
          break;
        case "recommendations":
          result = await generateSmartRecommendations(
            results.iai,
            results.ss,
            projectData.projectType,
            projectData.region,
            detailedMode
          );
          break;
        case "risks":
          result = await analyzeRisksWithGemini(
            projectData,
            results.risks,
            detailedMode
          );
          break;
        case "market":
          result = await analyzeMarketCompetition(
            projectData.projectType,
            projectData.region,
            detailedMode
          );
          break;
        case "actionPlan":
          result = await generateActionPlan(
            projectData,
            results.recommendations,
            detailedMode
          );
          break;
        default:
          result = await analyzeProjectWithGemini(projectData, detailedMode);
      }

      setAnalysisResult({
        type: analysisType,
        content: result,
        timestamp: new Date().toLocaleString("ar-SA"),
        detailed: detailedMode,
      });
    } catch (err) {
      setError("حدث خطأ في التحليل. يرجى المحاولة لاحقاً.");
      console.error("AI Analysis Error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const tabs = [
    { id: "overview", label: "نظرة عامة", icon: Brain },
    { id: "recommendations", label: "توصيات ذكية", icon: Sparkles },
    { id: "risks", label: "تحليل المخاطر", icon: AlertCircle },
    { id: "market", label: "السوق التنافسي", icon: CheckCircle },
    { id: "actionPlan", label: "خطة العمل", icon: CheckCircle },
  ];

  return (
    <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white">
          التحليل الذكي بالذكاء الاصطناعي
        </h3>
      </div>

      {/* Response Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/70">وضع الرد:</span>
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setDetailedMode(false)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                !detailedMode
                  ? "bg-accent-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              موجز
            </button>
            <button
              onClick={() => setDetailedMode(true)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                detailedMode
                  ? "bg-accent-500 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              مفصل
            </button>
          </div>
        </div>
        <div className="text-xs text-white/50">
          {detailedMode ? "تحليل شامل ومفصل" : "تحليل سريع وموجز"}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveTab(tab.id);
                handleGeminiAnalysis(tab.id);
              }}
              disabled={isAnalyzing}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-accent-500/30 text-light-400 border border-accent-400"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
              } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-accent-500/30 border-t-accent-500 rounded-full mx-auto mb-4"
            />
            <h4 className="text-lg font-semibold text-white mb-2">
              جاري التحليل الذكي...
            </h4>
            <p className="text-white/70">
              الذكاء الاصطناعي يحلل بيانات المشروع
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Result */}
      <AnimatePresence>
        {analysisResult && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-semibold text-white">
                  {tabs.find((tab) => tab.id === analysisResult.type)?.label}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    analysisResult.detailed
                      ? "bg-accent-500/20 text-accent-300 border border-accent-400/30"
                      : "bg-green-500/20 text-green-300 border border-green-400/30"
                  }`}
                >
                  {analysisResult.detailed ? "مفصل" : "موجز"}
                </span>
              </div>
              <span className="text-xs text-white/50">
                {analysisResult.timestamp}
              </span>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-white/90 leading-relaxed whitespace-pre-wrap">
                {analysisResult.content}
              </div>
            </div>

            {/* Re-analyze Button */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => handleGeminiAnalysis(analysisResult.type)}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-accent-500/20 hover:bg-accent-500/30 text-accent-300 rounded-lg text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                إعادة التحليل مع الوضع {detailedMode ? "المفصل" : "الموجز"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!analysisResult && !isAnalyzing && (
        <div className="text-center py-8">
          <Brain className="w-16 h-16 text-accent-400 mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-semibold text-white mb-2">
            التحليل الذكي متاح
          </h4>
          <p className="text-white/70 mb-4">
            اختر نوع التحليل المطلوب للحصول على تحليل متقدم من الذكاء الاصطناعي
          </p>
          <div className="text-sm text-white/50 space-y-1">
            <div>💡 سيتم تحليل بيانات المشروع وتقديم توصيات ذكية مخصصة</div>
            <div>⚡ الوضع الموجز: تحليل سريع ومركز على النقاط الرئيسية</div>
            <div>📊 الوضع المفصل: تحليل شامل مع تفاصيل وأمثلة عملية</div>
          </div>
        </div>
      )}
    </AnimatedCard>
  );
};

export default GeminiIntegration;
