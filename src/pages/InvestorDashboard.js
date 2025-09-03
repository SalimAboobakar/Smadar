import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  AlertTriangle,
  Download,
  ArrowLeft,
  Target,
  Star,
  Video,
  CheckCircle,
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
import AnimatedCard from "../components/ui/AnimatedCard";
import MathTooltip from "../components/ui/MathTooltip";
import CommunityVoting from "../components/CommunityVoting";
import GeminiIntegration from "../components/GeminiIntegration";
import InvestmentPortfolio from "../components/InvestmentPortfolio";
import AIInvestmentAdvisor from "../components/AIInvestmentAdvisor";
import { getEquationData } from "../utils/mathEquations";
import {
  calculateIAI,
  calculateSS,
  calculateEnhancedConfidenceRate,
  calculateWeightedDemand,
  getRecommendations,
  getTopRisks,
} from "../utils/calculations";
import { projectTypes, targetAudiences } from "../data/dhofarData";
import { exportToPDF } from "../services/pdfService";
import { getDemoPortfolio } from "../services/portfolioService";
import ChatbotTrigger from "../components/ChatbotTrigger";
import ExpertAdvisoryTeam from "../components/ExpertAdvisoryTeam";
import InvestorCTA from "../components/InvestorCTA";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const InvestorDashboard = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("salalah");
  const [selectedProjectType, setSelectedProjectType] = useState("hotels");
  const [selectedAudience, setSelectedAudience] = useState("tourists");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [results, setResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [portfolioView, setPortfolioView] = useState("overview");
  const [portfolioData, setPortfolioData] = useState([]);

  useEffect(() => {
    calculateResults();
  }, [selectedRegion, selectedProjectType, selectedAudience, investmentAmount]);

  useEffect(() => {
    // Load demo portfolio data for AI analysis
    const demoData = getDemoPortfolio();
    setPortfolioData(demoData);
  }, []);

  const calculateResults = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const iai = calculateIAI(
      selectedRegion,
      selectedProjectType,
      selectedAudience,
      investmentAmount
    );
    const ss = calculateSS(
      selectedProjectType,
      investmentAmount,
      selectedRegion
    );
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
    const confidence = calculateEnhancedConfidenceRate(
      iai,
      ss,
      selectedProjectType,
      selectedRegion
    );

    setResults({
      iai,
      ss,
      demand,
      recommendations,
      risks,
      confidence,
    });

    setIsAnalyzing(false);
  };

  const generateProjectId = () => {
    return `${selectedRegion}_${selectedProjectType}_${selectedAudience}_${Date.now()}`;
  };

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
        up: 0,
        down: 0,
        total: 0,
      };

      await exportToPDF(projectData, results, votingData);
    } catch (error) {
      console.error("خطأ في تصدير PDF:", error);
      alert("حدث خطأ في تصدير التقرير. يرجى المحاولة لاحقاً.");
    }
  };

  const tabs = [
    { id: "analysis", name: "التحليل", icon: BarChart3 },
    { id: "portfolio", name: "المحفظة", icon: TrendingUp },
    { id: "market", name: "السوق", icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 visual-hierarchy">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="nav-layout-horizontal bg-white/10 backdrop-blur-sm border-b border-white/20"
      >
        <div className="container-optimized">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-accent-400" />
                  </div>
                  لوحة المستثمر
                </h1>
                <p className="text-white/70">أدوات التحليل والاستثمار الذكية</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/market")}
                className="flex items-center gap-2 bg-gradient-to-r from-accent-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-accent-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
              >
                <Target className="w-5 h-5" />
                السوق الاستثماري
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleExportPDF}
                className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-accent-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-accent-700 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                تصدير التقرير
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container-optimized section-standard">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-white/20"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-accent-500 to-primary-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === "analysis" && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Project Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 mb-8"
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
                      {Object.entries(targetAudiences).map(
                        ([key, audience]) => (
                          <option key={key} value={key}>
                            {audience.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/80">
                      مبلغ الاستثمار (ريال)
                    </label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) =>
                        setInvestmentAmount(Number(e.target.value))
                      }
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
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
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

              {/* Main Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid-metrics rhythm-sections"
              >
                <MathTooltip
                  equation={getEquationData("iai").equation}
                  title={getEquationData("iai").title}
                  description={getEquationData("iai").description}
                  variables={getEquationData("iai").variables}
                >
                  <AnimatedCard className="bg-gradient-to-br from-primary-500/20 to-primary-600/20 border-primary-500/30 hover:from-primary-500/30 hover:to-primary-600/30 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-primary-500/20 rounded-full">
                        <TrendingUp className="w-8 h-8 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-2">
                          مؤشر الجاذبية الاستثمارية
                        </p>
                        <motion.p
                          key={results?.iai}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-primary-400"
                        >
                          {isAnalyzing ? "..." : `${results?.iai || 0}%`}
                        </motion.p>
                      </div>
                    </div>
                  </AnimatedCard>
                </MathTooltip>

                <MathTooltip
                  equation={getEquationData("ss").equation}
                  title={getEquationData("ss").title}
                  description={getEquationData("ss").description}
                  variables={getEquationData("ss").variables}
                >
                  <AnimatedCard className="bg-gradient-to-br from-accent-500/20 to-accent-600/20 border-accent-500/30 hover:from-accent-500/30 hover:to-accent-600/30 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-accent-500/20 rounded-full">
                        <Shield className="w-8 h-8 text-accent-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-2">
                          مؤشر الاستدامة
                        </p>
                        <motion.p
                          key={results?.ss}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-accent-400"
                        >
                          {isAnalyzing ? "..." : results?.ss || 0}
                        </motion.p>
                      </div>
                    </div>
                  </AnimatedCard>
                </MathTooltip>

                <AnimatedCard className="bg-gradient-to-br from-accent-500/20 to-accent-600/20 border-accent-500/30 hover:from-accent-500/30 hover:to-accent-600/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-accent-500/20 rounded-full">
                      <Users className="w-8 h-8 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white/80 mb-2">
                        الطلب المتوقع
                      </p>
                      <motion.p
                        key={results?.demand}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-accent-400"
                      >
                        {isAnalyzing
                          ? "..."
                          : (results?.demand || 0).toLocaleString()}
                      </motion.p>
                    </div>
                  </div>
                </AnimatedCard>

                <MathTooltip
                  equation={getEquationData("confidence").equation}
                  title={getEquationData("confidence").title}
                  description={getEquationData("confidence").description}
                  variables={getEquationData("confidence").variables}
                >
                  <AnimatedCard className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 transition-all duration-300">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="p-3 bg-green-500/20 rounded-full">
                        <Target className="w-8 h-8 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-2">
                          معدل الثقة
                        </p>
                        <motion.p
                          key={results?.confidence}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-3xl font-bold text-green-400"
                        >
                          {isAnalyzing ? "..." : `${results?.confidence || 0}%`}
                        </motion.p>
                      </div>
                    </div>
                  </AnimatedCard>
                </MathTooltip>
              </motion.div>

              {/* Charts and Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid-content rhythm-sections"
              >
                <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-primary-500/20 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-accent-400" />
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

              {/* Recommendations and Community Voting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid-content rhythm-sections"
              >
                <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Star className="w-6 h-6 text-yellow-400" />
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
                                  : "bg-primary-500/20 text-accent-300 border-primary-500/30 border-l-primary-500"
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
                                      : "bg-accent-400"
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
                            <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
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
            </motion.div>
          )}

          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Portfolio Sub-tabs */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setPortfolioView("overview")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      portfolioView === "overview"
                        ? "bg-gradient-to-r from-accent-500 to-primary-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <TrendingUp className="w-5 h-5 inline-block ml-2" />
                    نظرة عامة
                  </button>
                  <button
                    onClick={() => setPortfolioView("ai-advisor")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      portfolioView === "ai-advisor"
                        ? "bg-gradient-to-r from-accent-500 to-primary-600 text-white shadow-lg"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Brain className="w-5 h-5 inline-block ml-2" />
                    المستشار الذكي
                  </button>
                </div>
              </div>

              {/* Portfolio Content */}
              <AnimatePresence mode="wait">
                {portfolioView === "overview" && (
                  <motion.div
                    key="portfolio-overview"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InvestmentPortfolio />
                  </motion.div>
                )}
                {portfolioView === "ai-advisor" && (
                  <motion.div
                    key="ai-advisor"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AIInvestmentAdvisor
                      portfolio={portfolioData}
                      marketData={{
                        region: selectedRegion,
                        projectType: selectedProjectType,
                        results: results,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "market" && (
            <motion.div
              key="market"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Market Overview Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-primary-500/20 to-accent-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:from-primary-500/30 hover:to-accent-600/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-500/20 rounded-xl">
                      <Target className="w-8 h-8 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        سوق ظفار الاستثماري
                      </h3>
                      <p className="text-white/70">
                        تحليل شامل للسوق والفرص الاستثمارية
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/market")}
                    className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Target className="w-5 h-5" />
                    استكشف السوق
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">
                        4.7
                      </div>
                      <div className="text-sm text-white/70">مليار ر.ع</div>
                      <div className="text-xs text-white/50 mt-1">
                        حجم السوق الإجمالي
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-400 mb-2">
                        285
                      </div>
                      <div className="text-sm text-white/70">مستثمر نشط</div>
                      <div className="text-xs text-white/50 mt-1">
                        في المنطقة الحرة
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent-400 mb-2">
                        9.8%
                      </div>
                      <div className="text-sm text-white/70">معدل النمو</div>
                      <div className="text-xs text-white/50 mt-1">
                        نمو مستدام
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quick Market Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-green-400" />
                  رؤى السوق السريعة
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-300 text-sm">
                        الصناعة والمنطقة الحرة تهيمن على 40% من السوق
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary-500/20 rounded-lg border border-primary-500/30">
                      <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                      <span className="text-accent-300 text-sm">
                        السياحة تسجل نمو 10.2% مع مليون زائر
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-300 text-sm">
                        الثروة السمكية: مشروع الصفيلح بـ10 مليون ر.ع
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/market")}
                      className="w-full bg-gradient-to-r from-accent-500 to-primary-600 text-white p-4 rounded-xl hover:from-accent-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <div className="flex flex-col items-center">
                        <Target className="w-8 h-8 mb-2" />
                        <span className="text-lg font-semibold">
                          عرض التحليل الكامل
                        </span>
                        <span className="text-sm text-white/80">
                          رسوم بيانية تفاعلية ومؤشرات متقدمة
                        </span>
                      </div>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Expert Consultation Section */}
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Video className="w-8 h-8 text-blue-600" />
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  🎯 هل تريد مناقشة هذه النتائج مع خبير؟
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  احصل على استشارة مرئية مخصصة لمشروعك مع أحد خبرائنا المتخصصين
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      استشارة مجانية 15 دقيقة
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Video className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      مكالمة فيديو مباشرة
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-600">
                    <Star className="w-5 h-5" />
                    <span className="text-sm font-medium">خبراء معتمدون</span>
                  </div>
                </div>
                <ExpertAdvisoryTeam
                  analysisData={results}
                  onConsultationBooked={(data) => {
                    console.log("Video consultation booked:", data);
                    // Could show success message or redirect
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Smart CTA that appears based on results */}
      <InvestorCTA analysisData={results} visible={!!results} />

      {/* AI Chatbot Trigger */}
      <ChatbotTrigger />
    </div>
  );
};

export default InvestorDashboard;
