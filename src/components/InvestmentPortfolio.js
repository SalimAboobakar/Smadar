import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Edit3,
  Trash2,
  BarChart3,
  DollarSign,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  PieChart,
} from "lucide-react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AnimatedCard from "./ui/AnimatedCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import {
  getDemoPortfolio,
  calculatePortfolioStats,
  addInvestmentToPortfolio,
  updateInvestment,
  removeInvestment,
} from "../services/portfolioService";
import { getAllInvestmentOpportunities } from "../data/investmentOpportunities";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const InvestmentPortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [availableOpportunities, setAvailableOpportunities] = useState([]);

  // حالة النموذج الجديد
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    sector: "",
    initialAmount: "",
    expectedROI: { min: 0, max: 0 },
    riskLevel: "متوسط",
    timeline: "",
    region: "صلالة",
  });

  useEffect(() => {
    loadPortfolio();
    loadAvailableOpportunities();
  }, []);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      // استخدام البيانات التجريبية لأغراض العرض
      const demoData = getDemoPortfolio();
      setPortfolio(demoData);

      const portfolioStats = calculatePortfolioStats(demoData);
      setStats(portfolioStats);
    } catch (error) {
      console.error("خطأ في تحميل المحفظة:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableOpportunities = () => {
    const opportunities = getAllInvestmentOpportunities();
    setAvailableOpportunities(opportunities);
  };

  const handleAddInvestment = async (e) => {
    e.preventDefault();

    const investment = {
      ...newInvestment,
      initialAmount: parseFloat(newInvestment.initialAmount),
      totalValue: parseFloat(newInvestment.initialAmount),
      currentROI: 0,
      status: "active",
      dateAdded: new Date().toISOString(),
    };

    // إضافة للمحفظة المحلية
    const newPortfolio = [
      ...portfolio,
      { ...investment, id: Date.now().toString() },
    ];
    setPortfolio(newPortfolio);

    // إعادة حساب الإحصائيات
    const newStats = calculatePortfolioStats(newPortfolio);
    setStats(newStats);

    // إعادة تعيين النموذج
    setNewInvestment({
      name: "",
      sector: "",
      initialAmount: "",
      expectedROI: { min: 0, max: 0 },
      riskLevel: "متوسط",
      timeline: "",
      region: "صلالة",
    });

    setShowAddModal(false);
  };

  const handleDeleteInvestment = (investmentId) => {
    const newPortfolio = portfolio.filter((inv) => inv.id !== investmentId);
    setPortfolio(newPortfolio);

    const newStats = calculatePortfolioStats(newPortfolio);
    setStats(newStats);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-OM", {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
  };

  const getRiskColor = (riskLevel) => {
    if (riskLevel.includes("منخفض") || riskLevel.includes("low"))
      return "text-green-400";
    if (riskLevel.includes("عالي") || riskLevel.includes("high"))
      return "text-red-400";
    return "text-yellow-400";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "paused":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "completed":
        return <Target className="w-4 h-4 text-blue-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
    }
  };

  // بيانات الرسم البياني للتوزيع القطاعي
  const sectorChartData = {
    labels: Object.keys(stats?.sectorDistribution || {}),
    datasets: [
      {
        data: Object.values(stats?.sectorDistribution || {}),
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
          "#06B6D4",
        ],
        borderWidth: 0,
        hoverOffset: 10,
      },
    ],
  };

  // بيانات الرسم البياني للمخاطر
  const riskChartData = {
    labels: ["منخفض", "متوسط", "عالي"],
    datasets: [
      {
        data: [
          stats?.riskDistribution.low || 0,
          stats?.riskDistribution.medium || 0,
          stats?.riskDistribution.high || 0,
        ],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        borderWidth: 0,
        hoverOffset: 10,
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
          color: "white",
          font: { size: 12 },
          padding: 20,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات المحفظة */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <AnimatedCard className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">إجمالي الاستثمارات</p>
              <p className="text-2xl font-bold text-blue-400">
                {stats?.totalInvestments || 0}
              </p>
              <p className="text-xs text-white/60">استثمار نشط</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">القيمة الإجمالية</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(stats?.totalValue || 0)}
              </p>
              <p className="text-xs text-white/60">قيمة المحفظة</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">متوسط العائد</p>
              <p
                className={`text-2xl font-bold ${
                  stats?.averageROI >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {formatPercentage(stats?.averageROI || 0)}
              </p>
              <p className="text-xs text-white/60">عائد المحفظة</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              {stats?.averageROI >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-400" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-400" />
              )}
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80 mb-1">الاستثمارات النشطة</p>
              <p className="text-2xl font-bold text-orange-400">
                {stats?.activeInvestments || 0}
              </p>
              <p className="text-xs text-white/60">
                من أصل {stats?.totalInvestments || 0}
              </p>
            </div>
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* الرسوم البيانية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <PieChart className="w-6 h-6 text-blue-400" />
              توزيع القطاعات
            </h3>
            <div className="h-64">
              <Doughnut data={sectorChartData} options={chartOptions} />
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              توزيع المخاطر
            </h3>
            <div className="h-64">
              <Doughnut data={riskChartData} options={chartOptions} />
            </div>
          </div>
        </AnimatedCard>
      </motion.div>

      {/* قائمة الاستثمارات */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            استثماراتي
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            إضافة استثمار
          </motion.button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {portfolio.map((investment, index) => (
            <motion.div
              key={investment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(investment.status)}
                      <div>
                        <h4 className="text-lg font-semibold text-white">
                          {investment.name}
                        </h4>
                        <p className="text-sm text-white/70">
                          {investment.sector} • {investment.region}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedInvestment(investment);
                          setShowDetailsModal(true);
                        }}
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteInvestment(investment.id)}
                        className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-white/60 mb-1">
                        المبلغ المستثمر
                      </p>
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(investment.initialAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">
                        القيمة الحالية
                      </p>
                      <p className="text-sm font-medium text-white">
                        {formatCurrency(investment.totalValue)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">
                        العائد الحالي
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          investment.currentROI >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {formatPercentage(investment.currentROI)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-white/60 mb-1">
                        مستوى المخاطر
                      </p>
                      <p
                        className={`text-sm font-medium ${getRiskColor(
                          investment.riskLevel
                        )}`}
                      >
                        {investment.riskLevel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>
                        تاريخ الإضافة:{" "}
                        {new Date(investment.dateAdded).toLocaleDateString(
                          "ar"
                        )}
                      </span>
                      <span>المدة المتوقعة: {investment.timeline}</span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        {portfolio.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BarChart3 className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/60 mb-2">
              لا توجد استثمارات بعد
            </h3>
            <p className="text-white/40 mb-6">
              ابدأ بإضافة أول استثمار إلى محفظتك
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              إضافة استثمار جديد
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* نافذة إضافة استثمار */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-2xl border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                إضافة استثمار جديد
              </h3>

              <form onSubmit={handleAddInvestment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      اسم الاستثمار
                    </label>
                    <input
                      type="text"
                      value={newInvestment.name}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          name: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: مصنع تعبئة الأسماك"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      القطاع
                    </label>
                    <select
                      value={newInvestment.sector}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          sector: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر القطاع</option>
                      <option value="الثروة السمكية">الثروة السمكية</option>
                      <option value="الزراعة">الزراعة</option>
                      <option value="السياحة">السياحة</option>
                      <option value="النقل واللوجستيات">
                        النقل واللوجستيات
                      </option>
                      <option value="الصناعة التحويلية">
                        الصناعة التحويلية
                      </option>
                      <option value="التكنولوجيا">التكنولوجيا</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      المبلغ المستثمر (ريال عماني)
                    </label>
                    <input
                      type="number"
                      value={newInvestment.initialAmount}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          initialAmount: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      مستوى المخاطر
                    </label>
                    <select
                      value={newInvestment.riskLevel}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          riskLevel: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="منخفض">منخفض</option>
                      <option value="منخفض إلى متوسط">منخفض إلى متوسط</option>
                      <option value="متوسط">متوسط</option>
                      <option value="متوسط إلى عالي">متوسط إلى عالي</option>
                      <option value="عالي">عالي</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      المدة الزمنية المتوقعة
                    </label>
                    <input
                      type="text"
                      value={newInvestment.timeline}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          timeline: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="مثال: 3-5 سنوات"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      المنطقة
                    </label>
                    <select
                      value={newInvestment.region}
                      onChange={(e) =>
                        setNewInvestment({
                          ...newInvestment,
                          region: e.target.value,
                        })
                      }
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="صلالة">صلالة</option>
                      <option value="مرباط">مرباط</option>
                      <option value="طاقة">طاقة</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 p-3 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors"
                  >
                    إلغاء
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  >
                    إضافة الاستثمار
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة تفاصيل الاستثمار */}
      <AnimatePresence>
        {showDetailsModal && selectedInvestment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 w-full max-w-4xl border border-white/20 max-h-96 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {selectedInvestment.name}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      معلومات الاستثمار
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">القطاع:</span>
                        <span className="text-white">
                          {selectedInvestment.sector}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">المنطقة:</span>
                        <span className="text-white">
                          {selectedInvestment.region}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">المدة المتوقعة:</span>
                        <span className="text-white">
                          {selectedInvestment.timeline}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">مستوى المخاطر:</span>
                        <span
                          className={getRiskColor(selectedInvestment.riskLevel)}
                        >
                          {selectedInvestment.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">
                      الأداء المالي
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white/70">المبلغ المستثمر:</span>
                        <span className="text-white">
                          {formatCurrency(selectedInvestment.initialAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">القيمة الحالية:</span>
                        <span className="text-white">
                          {formatCurrency(selectedInvestment.totalValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">العائد الحالي:</span>
                        <span
                          className={
                            selectedInvestment.currentROI >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {formatPercentage(selectedInvestment.currentROI)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">العائد المتوقع:</span>
                        <span className="text-white">
                          {selectedInvestment.expectedROI
                            ? `${selectedInvestment.expectedROI.min}% - ${selectedInvestment.expectedROI.max}%`
                            : "غير محدد"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center text-sm text-white/60">
                  <span>
                    تاريخ الإضافة:{" "}
                    {new Date(selectedInvestment.dateAdded).toLocaleDateString(
                      "ar"
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    {getStatusIcon(selectedInvestment.status)}
                    حالة الاستثمار:{" "}
                    {selectedInvestment.status === "active"
                      ? "نشط"
                      : selectedInvestment.status}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestmentPortfolio;
