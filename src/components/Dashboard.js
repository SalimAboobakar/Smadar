import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Users,
  AlertTriangle,
  MapPin,
  Download,
  BarChart3,
  Sparkles,
  ArrowRight,
  Brain,
  Target,
  Zap,
} from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AnimatedCard from "./ui/AnimatedCard";
import CommunityVoting from "./CommunityVoting";
import GeminiIntegration from "./GeminiIntegration";
import PlatformStats from "./PlatformStats";
import {
  calculateIAI,
  calculateSS,
  calculateWeightedDemand,
  getRecommendations,
  getTopRisks,
} from "../utils/calculations";
import {
  dhofarRegions,
  projectTypes,
  targetAudiences,
} from "../data/dhofarData";
import { exportToPDF } from "../services/pdfService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("salalah");
  const [selectedProjectType, setSelectedProjectType] = useState("hotels");
  const [selectedAudience, setSelectedAudience] = useState("tourists");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    calculateResults();
  }, [selectedRegion, selectedProjectType, selectedAudience, investmentAmount]);

  const calculateResults = async () => {
    setIsAnalyzing(true);

    // محاكاة وقت التحليل
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const iai = calculateIAI(
      selectedRegion,
      selectedProjectType,
      selectedAudience,
      investmentAmount
    );
    const ss = calculateSS(selectedProjectType, investmentAmount);
    const demand = calculateWeightedDemand(
      selectedRegion,
      selectedProjectType,
      selectedAudience
    );
    const recommendations = getRecommendations(
      iai,
      ss,
      selectedProjectType,
      selectedRegion
    );
    const risks = getTopRisks(selectedProjectType, selectedAudience);

    setResults({
      iai,
      ss,
      demand,
      recommendations,
      risks,
    });

    setIsAnalyzing(false);
  };

  const generateProjectId = () => {
    return `${selectedRegion}_${selectedProjectType}_${selectedAudience}_${Date.now()}`;
  };

  // بيانات الرسم البياني للطلب
  const demandChartData = {
    labels: ["الزوار", "السكان المحليون"],
    datasets: [
      {
        data: [
          Math.round(
            results?.demand * projectTypes[selectedProjectType].visitorWeight ||
              0
          ),
          Math.round(
            results?.demand * projectTypes[selectedProjectType].localWeight || 0
          ),
        ],
        backgroundColor: ["#3B82F6", "#10B981"],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // بيانات الرسم البياني للمخاطر
  const risksChartData = {
    labels: results?.risks.map((risk) => risk.name) || [],
    datasets: [
      {
        label: "مستوى المخاطر",
        data:
          results?.risks.map((risk) =>
            risk.level === "high" ? 3 : risk.level === "medium" ? 2 : 1
          ) || [],
        backgroundColor: ["#EF4444", "#F59E0B", "#10B981"],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const handleExportPDF = async () => {
    try {
      const projectData = {
        region: selectedRegion,
        projectType: selectedProjectType,
        audience: selectedAudience,
        investment: investmentAmount,
      };

      const votingData = {
        up: 0, // سيتم تحديثها من Firebase
        down: 0,
        total: 0,
      };

      await exportToPDF(projectData, results, votingData);
    } catch (error) {
      console.error("خطأ في تصدير PDF:", error);
      alert("حدث خطأ في تصدير التقرير. يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-right">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center justify-center lg:justify-start gap-3">
                <div className="p-2 bg-primary-500/20 rounded-xl">
                  <Brain className="w-8 h-8 lg:w-10 lg:h-10 text-primary-400" />
                </div>
                منصة تدوم
              </h1>
              <p className="text-white/70 text-base lg:text-lg">
                منصة ذكاء استثماري بلمسة المجتمع
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPDF}
              className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-accent-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">تصدير التقرير</span>
              <span className="sm:hidden">تصدير</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Filters - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <div className="p-2 bg-primary-500/20 rounded-lg">
              <Target className="w-5 h-5 lg:w-6 lg:h-6 text-primary-400" />
            </div>
            اختيار المشروع
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                المنطقة
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 lg:p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
              >
                <option value="salalah">صلالة</option>
                <option value="mirbat">مرباط</option>
                <option value="taqah">طاقة</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                نوع المشروع
              </label>
              <select
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
                className="w-full p-3 lg:p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
              >
                {Object.entries(projectTypes).map(([key, type]) => (
                  <option key={key} value={key}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                الجمهور المستهدف
              </label>
              <select
                value={selectedAudience}
                onChange={(e) => setSelectedAudience(e.target.value)}
                className="w-full p-3 lg:p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm hover:bg-white/15 transition-all duration-200"
              >
                {Object.entries(targetAudiences).map(([key, audience]) => (
                  <option key={key} value={key}>
                    {audience.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                مبلغ الاستثمار (ريال)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                className="w-full p-3 lg:p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent backdrop-blur-sm placeholder-white/50 hover:bg-white/15 transition-all duration-200"
                placeholder="100000"
              />
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8 border border-white/20 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">
                جاري التحليل...
              </h3>
              <p className="text-white/70">
                نقوم بتحليل البيانات وتقييم الجدوى الاستثمارية
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Metrics - Unified Design System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* مؤشر الجاذبية الاستثمارية */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-primary-500/50 transition-all duration-500 shadow-2xl hover:shadow-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1 ml-4">
                  <p className="text-xs font-medium text-slate-400 mb-1">
                    Investment Attractiveness
                  </p>
                  <p className="text-sm font-bold text-white">
                    مؤشر الجاذبية الاستثمارية
                  </p>
                </div>
              </div>
              <motion.div
                key={results?.iai}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-black text-primary-400 mb-3">
                  {isAnalyzing ? "..." : `${results?.iai || 0}%`}
                </p>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${results?.iai || 0}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* مؤشر الاستدامة */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1 ml-4">
                  <p className="text-xs font-medium text-slate-400 mb-1">
                    Sustainability Index
                  </p>
                  <p className="text-sm font-bold text-white">مؤشر الاستدامة</p>
                </div>
              </div>
              <motion.div
                key={results?.ss}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-black text-emerald-400 mb-3">
                  {isAnalyzing ? "..." : results?.ss || 0}
                </p>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${(results?.ss || 0) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* الطلب المتوقع */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-violet-500/50 transition-all duration-500 shadow-2xl hover:shadow-violet-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1 ml-4">
                  <p className="text-xs font-medium text-slate-400 mb-1">
                    Expected Demand
                  </p>
                  <p className="text-sm font-bold text-white">الطلب المتوقع</p>
                </div>
              </div>
              <motion.div
                key={results?.demand}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-black text-violet-400 mb-3">
                  {isAnalyzing
                    ? "..."
                    : (results?.demand || 0).toLocaleString()}
                </p>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-violet-500 to-violet-400 h-2 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        ((results?.demand || 0) / 100000) * 100,
                        100
                      )}%`,
                    }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* عدد المخاطر */}
          <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-rose-500/50 transition-all duration-500 shadow-2xl hover:shadow-rose-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl shadow-lg group-hover:shadow-rose-500/30 transition-all duration-300">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div className="text-right flex-1 ml-4">
                  <p className="text-xs font-medium text-slate-400 mb-1">
                    Risk Count
                  </p>
                  <p className="text-sm font-bold text-white">عدد المخاطر</p>
                </div>
              </div>
              <motion.div
                key={results?.risks?.length}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl lg:text-4xl font-black text-rose-400 mb-3">
                  {isAnalyzing ? "..." : results?.risks?.length || 0}
                </p>
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-rose-500 to-rose-400 h-2 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        (results?.risks?.length || 0) * 25,
                        100
                      )}%`,
                    }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Charts and Analysis - Improved Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8"
        >
          <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-primary-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-primary-400" />
                </div>
                توزيع الطلب
              </h3>
              <div className="h-64 relative">
                <Doughnut data={demandChartData} options={chartOptions} />
                {results?.demand && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm text-white/80">إجمالي الطلب</p>
                    <p className="text-lg font-bold text-white">
                      {results.demand.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                تحليل المخاطر
              </h3>
              <div className="h-64 relative">
                <Bar data={risksChartData} options={chartOptions} />
                {results?.risks && results.risks.length > 0 && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-sm text-white/80">أعلى مخاطر</p>
                    <p className="text-lg font-bold text-red-400">
                      {results.risks[0]?.name || "غير محدد"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Recommendations and Community Voting - Enhanced Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8"
        >
          <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                التوصيات الذكية
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                <AnimatePresence>
                  {results?.recommendations?.length > 0 ? (
                    results.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-l-4 ${
                          rec.type === "success"
                            ? "bg-green-500/20 text-green-300 border-green-500/30 border-l-green-500"
                            : rec.type === "warning"
                            ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30 border-l-yellow-500"
                            : rec.type === "error"
                            ? "bg-red-500/20 text-red-300 border-red-500/30 border-l-red-500"
                            : "bg-primary-500/20 text-blue-300 border-primary-500/30 border-l-blue-500"
                        } hover:scale-105 transition-transform duration-200`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              rec.type === "success"
                                ? "bg-green-400"
                                : rec.type === "warning"
                                ? "bg-yellow-400"
                                : rec.type === "error"
                                ? "bg-red-400"
                                : "bg-blue-400"
                            }`}
                          />
                          <p className="text-sm leading-relaxed">
                            {rec.message}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-white/60">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد توصيات متاحة حالياً</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex flex-col">
            <CommunityVoting
              projectId={generateProjectId()}
              projectData={{
                region: selectedRegion,
                projectType: selectedProjectType,
                audience: selectedAudience,
                investment: investmentAmount,
              }}
            />
          </div>
        </motion.div>

        {/* Gemini AI Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <GeminiIntegration
            projectData={{
              region: selectedRegion,
              projectType: selectedProjectType,
              audience: selectedAudience,
              investment: investmentAmount,
            }}
            results={results}
          />
        </motion.div>

        {/* Platform Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PlatformStats />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
