import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building,
  MapPin,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const AdvancedAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // بيانات وهمية للتحليلات المتقدمة
  const mockAnalyticsData = {
    investmentTrends: [
      { month: "يناير", investments: 1200000, projects: 15, roi: 18.5 },
      { month: "فبراير", investments: 1350000, projects: 18, roi: 19.2 },
      { month: "مارس", investments: 1100000, projects: 12, roi: 17.8 },
      { month: "أبريل", investments: 1450000, projects: 22, roi: 20.1 },
      { month: "مايو", investments: 1600000, projects: 25, roi: 21.3 },
      { month: "يونيو", investments: 1800000, projects: 28, roi: 22.5 },
    ],
    sectorPerformance: [
      { name: "السياحة", value: 35, amount: 1800000, color: "#8884d8" },
      { name: "الثروة السمكية", value: 25, amount: 1200000, color: "#82ca9d" },
      { name: "الزراعة", value: 20, amount: 900000, color: "#ffc658" },
      { name: "النقل", value: 12, amount: 600000, color: "#ff7300" },
      { name: "الصناعة", value: 8, amount: 400000, color: "#00ff00" },
    ],
    regionalDistribution: [
      { region: "صلالة", investments: 2500000, projects: 45, growth: 15.2 },
      { region: "مرباط", investments: 800000, projects: 12, growth: 8.7 },
      { region: "طاقة", investments: 600000, projects: 8, growth: 12.3 },
    ],
    riskAnalysis: [
      { category: "مخاطر منخفضة", count: 25, percentage: 45 },
      { category: "مخاطر متوسطة", count: 20, percentage: 36 },
      { category: "مخاطر عالية", count: 10, percentage: 19 },
    ],
    kpis: {
      totalInvestments: 3900000,
      totalProjects: 65,
      averageROI: 20.1,
      successRate: 78,
      activeInvestors: 45,
      pendingApprovals: 12,
    },
  };

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setLoading(false);
    }, 1000);
  }, [selectedPeriod, selectedRegion]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-OM", {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("ar-OM").format(num);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* شريط التحكم */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            التحليلات المتقدمة
          </h2>

          <div className="flex gap-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="3months">آخر 3 أشهر</option>
              <option value="6months">آخر 6 أشهر</option>
              <option value="1year">آخر سنة</option>
              <option value="all">جميع الفترات</option>
            </select>

            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">جميع المناطق</option>
              <option value="salalah">صلالة</option>
              <option value="mirbat">مرباط</option>
              <option value="taqah">طاقة</option>
            </select>
          </div>
        </div>
      </div>

      {/* مؤشرات الأداء الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي الاستثمارات
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(analyticsData.kpis.totalInvestments)}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">
              +12.5% من الشهر الماضي
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                إجمالي المشاريع
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(analyticsData.kpis.totalProjects)}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Building className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8 مشاريع جديدة</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط العائد</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.kpis.averageROI}%
              </p>
            </div>
            <div className="p-3 bg-light-300 rounded-full">
              <Target className="w-6 h-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+2.1% من الهدف</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">معدل النجاح</p>
              <p className="text-2xl font-bold text-gray-900">
                {analyticsData.kpis.successRate}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+5% من العام الماضي</span>
          </div>
        </motion.div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* اتجاهات الاستثمار */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            اتجاهات الاستثمار الشهرية
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.investmentTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="investments"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* أداء القطاعات */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            توزيع الاستثمارات حسب القطاع
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.sectorPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analyticsData.sectorPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* التوزيع الجغرافي وتحليل المخاطر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* التوزيع الجغرافي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4">
            التوزيع الجغرافي للاستثمارات
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.regionalDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="investments" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* تحليل المخاطر */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4">تحليل المخاطر</h3>
          <div className="space-y-4">
            {analyticsData.riskAnalysis.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full mr-3 ${
                      risk.category === "مخاطر منخفضة"
                        ? "bg-green-500"
                        : risk.category === "مخاطر متوسطة"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm font-medium">{risk.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{risk.count}</div>
                  <div className="text-xs text-gray-500">
                    {risk.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary-50 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-primary-800">
                توصية: التركيز على المشاريع منخفضة المخاطر لضمان الاستقرار
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* إحصائيات إضافية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4">إحصائيات إضافية</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {analyticsData.kpis.activeInvestors}
            </div>
            <div className="text-sm text-gray-600">مستثمر نشط</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {analyticsData.kpis.pendingApprovals}
            </div>
            <div className="text-sm text-gray-600">موافقة معلقة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4.2</div>
            <div className="text-sm text-gray-600">متوسط تقييم المشاريع</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalytics;
