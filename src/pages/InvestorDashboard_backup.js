import React, { useState, useEffect, useCallback } from "react";
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
  const [activeTab, setActiveTab] = useState("analysis");
  const [portfolioSubTab, setPortfolioSubTab] = useState("overview");
  const [selectedProjectType, setSelectedProjectType] = useState("tourism");
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [targetAudience, setTargetAudience] = useState("young_adults");
  const [selectedRegion, setSelectedRegion] = useState("salalah");
  const [results, setResults] = useState(null);
  const [showExpertModal, setShowExpertModal] = useState(false);

  const calculateResults = useCallback(() => {
    try {
      const iai = calculateIAI(selectedProjectType, investmentAmount, targetAudience);
      const ss = calculateSS(selectedProjectType, investmentAmount, selectedRegion);
      const confidence = calculateEnhancedConfidenceRate(selectedProjectType, investmentAmount, selectedRegion);
      const demand = calculateWeightedDemand(selectedProjectType, targetAudience);

      setResults({
        iai: iai || 0,
        ss: ss || 0,
        confidence: confidence || 0,
        demand: demand || 0,
        recommendations: getRecommendations(iai, ss) || [],
        risks: getTopRisks(selectedProjectType, selectedRegion) || [],
      });
    } catch (error) {
      console.error("Error calculating results:", error);
      setResults({
        iai: 0,
        ss: 0,
        confidence: 0,
        demand: 0,
        recommendations: ["حدث خطأ في حساب التوصيات"],
        risks: [{ name: "خطأ في النظام", description: "يرجى إعادة المحاولة", level: "high" }],
      });
    }
  }, [selectedProjectType, investmentAmount, targetAudience, selectedRegion]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const handleExportPDF = async () => {
    try {
      await exportToPDF({
        projectType: selectedProjectType,
        investmentAmount,
        targetAudience,
        region: selectedRegion,
        results,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const sectorData = {
    labels: ["السياحة", "التكنولوجيا", "الزراعة", "الصناعة", "التجارة"],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          "#1b4332",
          "#2d6d4f",
          "#40826d",
          "#52a085",
          "#6fc5a0",
        ],
        borderWidth: 0,
      },
    ],
  };

  const performanceData = {
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
    datasets: [
      {
        label: "العائد المتوقع (%)",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(45, 109, 79, 0.8)",
        borderColor: "#1b4332",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#fff",
          font: {
            size: 11,
          },
          padding: 15,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 visual-hierarchy">
      {/* Enhanced Header */}
      <div className="nav-layout-horizontal sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة للرئيسية</span>
          </motion.button>
          <div className="h-8 w-px bg-white/20" />
          <h1 className="text-2xl font-bold text-white">لوحة تحكم المستثمر</h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>تصدير التقرير</span>
          </motion.button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container-optimized section-standard">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
            {[
              { id: "analysis", label: "التحليل", icon: BarChart3 },
              { id: "portfolio", label: "المحفظة", icon: Brain },
              { id: "community", label: "المجتمع", icon: Users },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-500 to-accent-600 text-white shadow-xl"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Analysis Tab */}
          {activeTab === "analysis" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Project Selection Form */}
              <AnimatedCard className="p-8 bg-white/5 backdrop-blur-xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary-400" />
                  اختيار المشروع
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">المنطقة</label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      <option value="salalah">صلالة</option>
                      <option value="mirbat">مرباط</option>
                      <option value="taqah">طاقة</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">الجمهور المستهدف</label>
                    <select
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      {Object.entries(targetAudiences).map(([key, audience]) => (
                        <option key={key} value={key}>
                          {audience.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">نوع المشروع</label>
                    <select
                      value={selectedProjectType}
                      onChange={(e) => setSelectedProjectType(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    >
                      {Object.entries(projectTypes).map(([key, project]) => (
                        <option key={key} value={key}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-white/80 font-medium">مبلغ الاستثمار (ريال)</label>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      min="10000"
                      step="10000"
                    />
                  </div>
                </div>
              </AnimatedCard>

              {/* Enhanced Metrics Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid-metrics dashboard-section"
              >
                <div className="tooltip-wrapper">
                  <MathTooltip
                    equation={getEquationData("iai").equation}
                    title={getEquationData("iai").title}
                    description={getEquationData("iai").description}
                    variables={getEquationData("iai").variables}
                  >
                    <AnimatedCard className="metric-card widget-container">
                      <div className="metric-card-content">
                        <div className="p-3 bg-primary-500/20 rounded-full mb-4">
                          <TrendingUp className="w-8 h-8 text-primary-400" />
                        </div>
                        <div className="metric-value text-white">
                          {results?.iai ? `${Math.round(results.iai)}%` : "0%"}
                        </div>
                        <div className="metric-label text-white/80">
                          مؤشر الجاذبية الاستثمارية
                        </div>
                        <div className="metric-trend text-primary-400">
                          <span className="text-xs">IAI</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </MathTooltip>
                </div>

                <div className="tooltip-wrapper">
                  <MathTooltip
                    equation={getEquationData("ss").equation}
                    title={getEquationData("ss").title}
                    description={getEquationData("ss").description}
                    variables={getEquationData("ss").variables}
                  >
                    <AnimatedCard className="metric-card widget-container">
                      <div className="metric-card-content">
                        <div className="p-3 bg-green-500/20 rounded-full mb-4">
                          <Shield className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="metric-value text-white">
                          {results?.ss ? results.ss.toFixed(1) : "0.0"}
                        </div>
                        <div className="metric-label text-white/80">مؤشر الاستدامة</div>
                        <div className="metric-trend text-green-400">
                          <span className="text-xs">SS</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </MathTooltip>
                </div>

                <div className="tooltip-wrapper">
                  <MathTooltip
                    equation={getEquationData("confidence").equation}
                    title={getEquationData("confidence").title}
                    description={getEquationData("confidence").description}
                    variables={getEquationData("confidence").variables}
                  >
                    <AnimatedCard className="metric-card widget-container">
                      <div className="metric-card-content">
                        <div className="p-3 bg-blue-500/20 rounded-full mb-4">
                          <Target className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="metric-value text-white">
                          {results?.confidence ? `${Math.round(results.confidence)}%` : "0%"}
                        </div>
                        <div className="metric-label text-white/80">معدل الثقة</div>
                        <div className="metric-trend text-blue-400">
                          <span className="text-xs">Confidence</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </MathTooltip>
                </div>

                <AnimatedCard className="metric-card widget-container">
                  <div className="metric-card-content">
                    <div className="p-3 bg-yellow-500/20 rounded-full mb-4">
                      <Users className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div className="metric-value text-white">
                      {results?.demand ? Math.round(results.demand) : "0"}
                    </div>
                    <div className="metric-label text-white/80">الطلب المتوقع</div>
                    <div className="metric-trend text-yellow-400">
                      <span className="text-xs">يومياً</span>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>

              {/* Charts Section */}
              <div className="grid-content rhythm-sections">
                <div className="space-y-8">
                  {/* Sector Distribution Chart */}
                  <AnimatedCard className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <BarChart3 className="w-6 h-6 text-primary-400" />
                        توزيع القطاعات
                      </h3>
                    </div>
                    <div className="chart-wrapper h-80">
                      <Doughnut data={sectorData} options={doughnutOptions} />
                    </div>
                  </AnimatedCard>

                  {/* Performance Chart */}
                  <AnimatedCard className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        الأداء المالي المتوقع
                      </h3>
                    </div>
                    <div className="chart-wrapper h-80">
                      <Bar data={performanceData} options={chartOptions} />
                    </div>
                  </AnimatedCard>
                </div>

                {/* Side Panel */}
                <div className="space-y-8">
                  {/* Recommendations */}
                  <AnimatedCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-400" />
                      التوصيات
                    </h3>
                    <div className="space-y-4">
                      {results?.recommendations?.map((rec, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                          <p className="text-white/80 text-sm leading-relaxed">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>

                  {/* Risk Analysis */}
                  <AnimatedCard className="p-6">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      تحليل المخاطر
                    </h3>
                    <div className="space-y-4">
                      {results?.risks?.map((risk, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                          <div>
                            <p className="text-white font-medium text-sm">{risk.name}</p>
                            <p className="text-white/60 text-xs">{risk.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                </div>
              </div>

              {/* Expert Advisory CTA */}
              <InvestorCTA analysisData={results} onExpertClick={() => setShowExpertModal(true)} />
            </motion.div>
          )}

          {/* Portfolio Tab */}
          {activeTab === "portfolio" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Portfolio Sub-navigation */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
                  {[
                    { id: "overview", label: "نظرة عامة" },
                    { id: "ai-advisor", label: "مستشار الذكاء الاصطناعي" },
                  ].map((subTab) => (
                    <motion.button
                      key={subTab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPortfolioSubTab(subTab.id)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        portfolioSubTab === subTab.id
                          ? "bg-gradient-to-r from-primary-500 to-accent-600 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {subTab.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Portfolio Content */}
              <AnimatePresence mode="wait">
                {portfolioSubTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <InvestmentPortfolio />
                  </motion.div>
                )}

                {portfolioSubTab === "ai-advisor" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AIInvestmentAdvisor />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Community Tab */}
          {activeTab === "community" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CommunityVoting />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expert Advisory Modal */}
      <ExpertAdvisoryTeam 
        isOpen={showExpertModal} 
        onClose={() => setShowExpertModal(false)} 
      />

      {/* Chatbot */}
      <ChatbotTrigger />
    </div>
  );
};

export default InvestorDashboard;
