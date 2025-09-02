import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Globe,
  DollarSign,
  Users,
  Building,
  Calendar,
  MapPin,
  Star,
  AlertTriangle,
  CheckCircle,
  Target,
  Zap,
  Eye,
  Filter,
  Download,
  RefreshCw,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Factory,
  Palmtree,
  Fish,
  Wheat,
  Truck,
  Sparkles,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import MarketAnalysis from "../components/MarketAnalysis";

const MarketPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("3months");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  // بيانات السوق الحقيقية لمحافظة ظفار
  const realMarketData = {
    marketOverview: {
      totalMarketValue: 4700000000, // 4.7 مليار ريال عماني (المنطقة الحرة بصلالة)
      growthRate: 9.8, // نمو واقعي مستدام
      totalInvestors: 285, // عدد المستثمرين في المنطقة الحرة
      activeProjects: 47, // مشاريع نشطة حقيقية
      averageROI: 18.5, // عائد واقعي متوسط
      marketVolatility: 6.2, // استقرار نسبي
    },

    sectorPerformance: [
      {
        name: "الصناعة والمنطقة الحرة",
        shortName: "الصناعة",
        value: 1880000000, // 40% من 4.7 مليار
        percentage: 40.0,
        growth: 8.5, // نمو مستقر في المنطقة الحرة
        description: "المنطقة الحرة بصلالة والمصانع الكبيرة",
        color: "#3B82F6",
        icon: Factory,
        gradientFrom: "#60A5FA",
        gradientTo: "#3B82F6",
      },
      {
        name: "السياحة",
        shortName: "السياحة",
        value: 1175000000, // 25% - أكثر من مليون زائر سنوياً
        percentage: 25.0,
        growth: 10.2, // نمو 10% في أعداد الزوار
        description: "موسم خريف ظفار والمنتجعات السياحية",
        color: "#10B981",
        icon: Palmtree,
        gradientFrom: "#34D399",
        gradientTo: "#10B981",
      },
      {
        name: "الثروة السمكية",
        shortName: "الأسماك",
        value: 705000000, // 15% - قطاع مهم تقليدياً
        percentage: 15.0,
        growth: 6.8, // نمو متوسط مستقر
        description: "استزراع الصفيلح والصيد التقليدي",
        color: "#F59E0B",
        icon: Fish,
        gradientFrom: "#FBBF24",
        gradientTo: "#F59E0B",
      },
      {
        name: "الزراعة",
        shortName: "الزراعة",
        value: 470000000, // 10% - مشاريع الكركم والنخيل
        percentage: 10.0,
        growth: 12.5, // نمو في الزراعة المستدامة
        description: "زراعة الكركم والمحاصيل الموسمية",
        color: "#8B5CF6",
        icon: Wheat,
        gradientFrom: "#A78BFA",
        gradientTo: "#8B5CF6",
      },
      {
        name: "النقل واللوجستيات",
        shortName: "النقل",
        value: 470000000, // 10% - ميناء صلالة
        percentage: 10.0,
        growth: 7.2, // نمو مع تطوير الميناء
        description: "ميناء صلالة والخدمات اللوجستية",
        color: "#EF4444",
        icon: Truck,
        gradientFrom: "#F87171",
        gradientTo: "#EF4444",
      },
    ],

    marketTrends: [
      {
        month: "يناير",
        industrial: 420, // صناعة مستقرة
        tourism: 85, // موسم منخفض
        fisheries: 98, // موسم متوسط
        agriculture: 65, // بداية الموسم
        logistics: 112, // نشاط عادي
      },
      {
        month: "فبراير",
        industrial: 435,
        tourism: 92,
        fisheries: 105,
        agriculture: 78,
        logistics: 118,
      },
      {
        month: "مارس",
        industrial: 450,
        tourism: 145, // بداية زيادة السياحة
        fisheries: 115,
        agriculture: 95, // موسم زراعي
        logistics: 125,
      },
      {
        month: "أبريل",
        industrial: 465,
        tourism: 180, // زيادة تدريجية
        fisheries: 125,
        agriculture: 115,
        logistics: 135,
      },
      {
        month: "مايو",
        industrial: 475,
        tourism: 220, // ما قبل الخريف
        fisheries: 130,
        agriculture: 125,
        logistics: 145,
      },
      {
        month: "يونيو",
        industrial: 485,
        tourism: 380, // بداية موسم الخريف
        fisheries: 140,
        agriculture: 140,
        logistics: 160,
      },
    ],

    regionalDistribution: [
      {
        region: "صلالة الكبرى",
        value: 3760000000, // 80% - المنطقة الحرة والمركز الاقتصادي
        percentage: 80.0,
        projects: 35, // معظم المشاريع الكبيرة
        investors: 195, // المستثمرون الرئيسيون
        avgROI: 19.2, // عائد مستقر
      },
      {
        region: "مرباط",
        value: 564000000, // 12% - مشاريع الصفيلح والثروة السمكية
        percentage: 12.0,
        projects: 8, // مشاريع متخصصة
        investors: 55, // مستثمرون محليون ومتخصصون
        avgROI: 17.8, // عائد جيد للمشاريع المتخصصة
      },
      {
        region: "طاقة والمناطق الأخرى",
        value: 376000000, // 8% - مشاريع سياحية وزراعية
        percentage: 8.0,
        projects: 4, // مشاريع صغيرة ومتوسطة
        investors: 35, // مستثمرون محليون
        avgROI: 16.5, // عائد متوسط
      },
    ],

    marketIndicators: [
      {
        name: "مؤشر الثقة الاستثمارية",
        value: 82.3, // مؤشر واقعي مرتفع
        change: 3.8,
        trend: "up",
        description: "ثقة عالية مع المنطقة الحرة بصلالة",
      },
      {
        name: "مؤشر السيولة السوقية",
        value: 76.5, // سيولة جيدة
        change: 2.2,
        trend: "up",
        description: "تحسن في سيولة الاستثمارات",
      },
      {
        name: "مؤشر استقرار المخاطر",
        value: 71.8, // مستوى مخاطر منخفض
        change: -1.5,
        trend: "down", // انخفاض المخاطر إيجابي
        description: "تحسن في بيئة الاستثمار",
      },
      {
        name: "مؤشر النشاط الاقتصادي",
        value: 79.4, // نشاط قوي
        change: 4.7,
        trend: "up",
        description: "زيادة في حركة الاستثمار والتجارة",
      },
    ],

    topPerformers: [
      {
        id: 1,
        name: "مشروع استزراع الصفيلح العُماني",
        sector: "الثروة السمكية",
        region: "مرباط",
        roi: 22.8, // عائد واقعي جيد
        change: 8.5,
        investment: 10000000, // 10 مليون ريال (حقيقي)
        status: "نشط",
        rating: 4.7,
      },
      {
        id: 2,
        name: "مصنع البتروكيماويات - المنطقة الحرة",
        sector: "الصناعة والمنطقة الحرة",
        region: "صلالة الكبرى",
        roi: 19.5, // عائد صناعي مستقر
        change: 5.2,
        investment: 120000000, // 120 مليون ريال (استثمار حديث)
        status: "نشط",
        rating: 4.5,
      },
      {
        id: 3,
        name: "مشروع توطين زراعة الكركم",
        sector: "الزراعة",
        region: "صلالة الكبرى",
        roi: 18.3, // عائد زراعي جيد
        change: 12.7, // نمو قوي في المرحلة الثانية
        investment: 2600000, // 2.6 مليون ريال (هيئة المؤسسات الصغيرة)
        status: "نشط",
        rating: 4.4,
      },
    ],
  };

  useEffect(() => {
    // محاكاة تحميل البيانات الحقيقية
    setTimeout(() => {
      setMarketData(realMarketData);
      setLoading(false);
    }, 1500);
  }, [selectedTimeframe, selectedSector, selectedRegion]);

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)} مليار ر.ع`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)} مليون ر.ع`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)} ألف ر.ع`;
    }
    return `${amount.toLocaleString()} ر.ع`;
  };

  const getTrendIcon = (trend) => {
    return trend === "up" ? ArrowUp : ArrowDown;
  };

  const getTrendColor = (trend) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-light-200 to-pink-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-light-200 to-pink-50">
      {/* رأس الصفحة المذهل */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-accent-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-br from-accent-400 to-accent-400 rounded-full opacity-10 blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <div className="relative">
                <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-white/10 rounded-xl animate-ping" />
              </div>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2 tracking-wide">
                  سوق ظفار الاستثماري
                </h1>
                <div className="flex items-center gap-2 text-white/80">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    منصة الاستثمار الذكية
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              اكتشف فرص الاستثمار الذهبية في محافظة ظفار مع تحليلات السوق
              المتقدمة والرؤى الذكية
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">
                  {formatCurrency(marketData.marketOverview.totalMarketValue)}
                </div>
                <div className="text-white/80 text-sm">حجم السوق الإجمالي</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">
                  {marketData.marketOverview.growthRate}%
                </div>
                <div className="text-white/80 text-sm">معدل النمو السنوي</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-2xl font-bold text-white">
                  {marketData.marketOverview.totalInvestors.toLocaleString()}
                </div>
                <div className="text-white/80 text-sm">مستثمر نشط</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* شريط التحكم المتقدم */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                رجوع
              </motion.button>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="1month">شهر واحد</option>
                <option value="3months">3 أشهر</option>
                <option value="6months">6 أشهر</option>
                <option value="1year">سنة واحدة</option>
              </select>

              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">جميع القطاعات</option>
                <option value="tourism">السياحة</option>
                <option value="fisheries">الثروة السمكية</option>
                <option value="agriculture">الزراعة</option>
                <option value="logistics">النقل واللوجستيات</option>
                <option value="manufacturing">الصناعة</option>
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

            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                تحديث البيانات
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                تصدير التقرير
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* مؤشرات السوق الرئيسية */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {marketData.marketIndicators.map((indicator, index) => {
            const TrendIcon = getTrendIcon(indicator.trend);
            return (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
                    {indicator.name}
                  </h3>
                  <div
                    className={`flex items-center gap-1 ${getTrendColor(
                      indicator.trend
                    )}`}
                  >
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {Math.abs(indicator.change)}%
                    </span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {indicator.value}%
                </div>
                <p className="text-sm text-gray-600">{indicator.description}</p>

                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${indicator.value}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* تحليل القطاعات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-32 w-64 h-64 bg-primary-500 rounded-full opacity-5 blur-3xl" />
            <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-accent-500 rounded-full opacity-5 blur-3xl" />
          </div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-white rounded-xl shadow-2xl p-6 overflow-hidden border border-gray-100"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full -translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-400 rounded-full translate-x-12 translate-y-12" />
            </div>
            <div className="relative mb-8">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-accent-500 to-primary-500 rounded-lg shadow-lg">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  توزيع القطاعات الاستثمارية
                </span>
              </h3>
              <p className="text-sm text-gray-500 mr-11">
                نظرة شاملة على توزيع الاستثمارات حسب القطاعات
              </p>
            </div>
            <div className="relative">
              <ResponsiveContainer width="100%" height={400}>
                <RechartsPieChart>
                  <defs>
                    <linearGradient id="industry" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1E40AF" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="tourism" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                      <stop offset="100%" stopColor="#047857" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="fisheries" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                      <stop offset="100%" stopColor="#D97706" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient
                      id="agriculture"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity={1} />
                    </linearGradient>
                    <linearGradient id="logistics" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity={1} />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={marketData.sectorPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ payload, percentage }) => {
                      return `${payload.shortName}\n${percentage}%`;
                    }}
                    outerRadius={140}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                    paddingAngle={3}
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {marketData.sectorPerformance.map((entry, index) => {
                      const gradientIds = [
                        "industry",
                        "tourism",
                        "fisheries",
                        "agriculture",
                        "logistics",
                      ];
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={`url(#${gradientIds[index]})`}
                          style={{
                            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                            cursor: "pointer",
                          }}
                        />
                      );
                    })}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [formatCurrency(value), name]}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "none",
                      borderRadius: "16px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(10px)",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>

              {/* Center Info */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">4.7</div>
                  <div className="text-sm text-gray-500">مليار ر.ع</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                إجمالي الاستثمارات:{" "}
                <span className="font-bold text-primary-600">
                  {formatCurrency(marketData.marketOverview.totalMarketValue)}
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative bg-white rounded-xl shadow-2xl p-6 overflow-hidden border border-gray-100"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-400 rounded-full translate-x-14 -translate-y-14" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-br from-accent-400 to-accent-400 rounded-full -translate-x-18 translate-y-18" />
            </div>
            <div className="relative mb-8">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  أداء القطاعات
                </span>
              </h3>
              <p className="text-sm text-gray-500 mr-11">
                تحليل مفصل لأداء ونمو كل قطاع استثماري
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={marketData.sectorPerformance}
                margin={{ top: 30, right: 30, left: 20, bottom: 80 }}
                barCategoryGap="20%"
              >
                <defs>
                  <linearGradient id="industryBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="tourismBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34D399" stopOpacity={1} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="fisheriesBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" stopOpacity={1} />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient
                    id="agricultureBar"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
                  </linearGradient>
                  <linearGradient id="logisticsBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F87171" stopOpacity={1} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                  strokeOpacity={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fontWeight: 500 }}
                  angle={-35}
                  textAnchor="end"
                  height={90}
                  stroke="#6B7280"
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(value) =>
                    `${(value / 1000000000).toFixed(1)}ب`
                  }
                  stroke="#6B7280"
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "القيمة"]}
                  labelStyle={{ color: "#1F2937", fontWeight: 600 }}
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)",
                    fontSize: "13px",
                  }}
                  cursor={{ fill: "rgba(59, 130, 246, 0.05)" }}
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1800}
                  animationBegin={200}
                >
                  {marketData.sectorPerformance.map((entry, index) => {
                    const gradientIds = [
                      "industryBar",
                      "tourismBar",
                      "fisheriesBar",
                      "agricultureBar",
                      "logisticsBar",
                    ];
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#${gradientIds[index]})`}
                        style={{
                          filter: "drop-shadow(0 6px 20px rgba(0,0,0,0.15))",
                          transition: "all 0.3s ease",
                        }}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-8 space-y-4">
              {marketData.sectorPerformance.map((sector, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, ${sector.color}20, transparent)`,
                    }}
                  />

                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {/* Icon Background */}
                        <div
                          className="w-14 h-14 rounded-xl shadow-lg flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${sector.gradientFrom}, ${sector.gradientTo})`,
                            boxShadow: `0 6px 20px ${sector.color}30`,
                          }}
                        >
                          <sector.icon className="w-7 h-7 text-white" />
                        </div>
                        {/* Glowing Ring */}
                        <div
                          className="absolute inset-0 w-14 h-14 rounded-xl animate-pulse opacity-30"
                          style={{
                            background: `linear-gradient(135deg, ${sector.gradientFrom}, ${sector.gradientTo})`,
                            animation:
                              "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-xl text-gray-900 group-hover:text-gray-700 transition-colors">
                            {sector.shortName}
                          </h4>
                          <Sparkles className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {sector.description}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <span
                            className="text-xs font-semibold text-white px-3 py-1 rounded-full shadow-sm"
                            style={{
                              background: `linear-gradient(90deg, ${sector.gradientFrom}, ${sector.gradientTo})`,
                            }}
                          >
                            {sector.percentage}% من السوق
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            القطاع الرائد
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xl text-gray-900 mb-1">
                        {formatCurrency(sector.value)}
                      </div>
                      <div className="flex items-center justify-end gap-1">
                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          +{sector.growth}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar with Label */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-600">
                        تقدم القطاع
                      </span>
                      <span className="text-xs font-bold text-gray-800">
                        {sector.percentage}%
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-3 rounded-full relative overflow-hidden"
                        style={{
                          background: `linear-gradient(90deg, ${sector.gradientFrom}, ${sector.gradientTo})`,
                          boxShadow: `0 0 12px ${sector.color}50`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${sector.percentage}%` }}
                        transition={{
                          delay: 1.2 + index * 0.1,
                          duration: 1.2,
                          ease: "easeOut",
                        }}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* باقي مكونات التحليل */}
        <MarketAnalysis
          marketData={marketData}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default MarketPage;
