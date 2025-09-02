import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Building,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import {
  analyzeProjectWithGemini,
  generateSmartRecommendations,
} from "../services/geminiService";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("3months");
  const [selectedSector, setSelectedSector] = useState("all");

  // بيانات وهمية للرؤى الذكية
  const mockInsights = {
    marketTrends: {
      title: "اتجاهات السوق الحالية",
      insights: [
        {
          type: "positive",
          title: "نمو قطاع السياحة",
          description:
            "قطاع السياحة يظهر نمواً مستمراً بنسبة 15% مع اقتراب موسم الخريف",
          impact: "high",
          confidence: 87,
          icon: TrendingUp,
        },
        {
          type: "warning",
          title: "منافسة متزايدة في المطاعم",
          description: "عدد المطاعم الجديدة زاد بنسبة 25% مما يزيد من المنافسة",
          impact: "medium",
          confidence: 92,
          icon: AlertTriangle,
        },
        {
          type: "opportunity",
          title: "فرصة في قطاع الثروة السمكية",
          description:
            "الطلب على المنتجات البحرية في تزايد مع إمكانيات تصدير كبيرة",
          impact: "high",
          confidence: 78,
          icon: Lightbulb,
        },
      ],
    },
    predictions: {
      title: "التنبؤات المستقبلية",
      predictions: [
        {
          timeframe: "3 أشهر",
          prediction: "زيادة الاستثمارات في قطاع السياحة بنسبة 20%",
          probability: 85,
          factors: ["موسم الخريف", "زيادة السياح", "تحسين البنية التحتية"],
        },
        {
          timeframe: "6 أشهر",
          prediction: "ظهور فرص جديدة في قطاع التكنولوجيا",
          probability: 70,
          factors: ["التحول الرقمي", "دعم الحكومة", "الاستثمارات الخارجية"],
        },
        {
          timeframe: "12 شهر",
          prediction: "توسع السوق الإقليمي للمنتجات المحلية",
          probability: 65,
          factors: ["اتفاقيات تجارية", "تحسين الجودة", "التسويق الإقليمي"],
        },
      ],
    },
    recommendations: {
      title: "التوصيات الذكية",
      recommendations: [
        {
          category: "الاستثمار",
          title: "التركيز على المشاريع المستدامة",
          description:
            "المشاريع البيئية تحصل على دعم حكومي أكبر ومعدل نجاح أعلى",
          priority: "high",
          expectedROI: "25-35%",
        },
        {
          category: "التسويق",
          title: "استخدام التسويق الرقمي",
          description:
            "الاستثمار في التسويق عبر وسائل التواصل الاجتماعي يزيد من الوصول بنسبة 40%",
          priority: "medium",
          expectedROI: "15-25%",
        },
        {
          category: "الشراكات",
          title: "بناء شراكات استراتيجية",
          description:
            "الشراكات مع الشركات المحلية تزيد من فرص النجاح بنسبة 30%",
          priority: "high",
          expectedROI: "20-30%",
        },
      ],
    },
    riskAnalysis: {
      title: "تحليل المخاطر",
      risks: [
        {
          type: "market",
          title: "تقلبات السوق",
          level: "medium",
          description: "التقلبات الاقتصادية قد تؤثر على الطلب",
          mitigation: "تنويع مصادر الدخل والتركيز على السوق المحلي",
        },
        {
          type: "regulatory",
          title: "تغيير القوانين",
          level: "low",
          description: "تغيير القوانين التنظيمية قد يؤثر على بعض القطاعات",
          mitigation: "متابعة التطورات القانونية والاستعداد للتغييرات",
        },
        {
          type: "competition",
          title: "منافسة محلية",
          level: "high",
          description: "زيادة عدد المنافسين في السوق المحلي",
          mitigation: "التركيز على التميز والابتكار في الخدمات",
        },
      ],
    },
    successFactors: {
      title: "عوامل النجاح الرئيسية",
      factors: [
        {
          factor: "الموقع الاستراتيجي",
          importance: 95,
          description: "الموقع الجيد يزيد من فرص النجاح بنسبة 40%",
        },
        {
          factor: "جودة الخدمة",
          importance: 90,
          description: "الجودة العالية تزيد من ولاء العملاء بنسبة 60%",
        },
        {
          factor: "التسعير التنافسي",
          importance: 85,
          description: "التسعير المناسب يزيد من الحصة السوقية بنسبة 35%",
        },
        {
          factor: "الابتكار",
          importance: 80,
          description: "الابتكار يزيد من التميز التنافسي بنسبة 50%",
        },
      ],
    },
  };

  useEffect(() => {
    loadInsights();
  }, [selectedTimeframe, selectedSector]);

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);

      // محاكاة تحميل البيانات
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setInsights(mockInsights);
    } catch (err) {
      console.error("خطأ في تحميل الرؤى:", err);
      setError("فشل في تحميل الرؤى الذكية");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadInsights();
  };

  const handleExportInsights = () => {
    const data = {
      insights,
      timestamp: new Date().toISOString(),
      timeframe: selectedTimeframe,
      sector: selectedSector,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ai-insights-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
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
      {/* شريط التحكم */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-light-300 rounded-lg">
              <Brain className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">الرؤى الذكية</h2>
              <p className="text-sm text-gray-600">
                تحليلات متقدمة مدعومة بالذكاء الاصطناعي
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="1month">شهر واحد</option>
              <option value="3months">3 أشهر</option>
              <option value="6months">6 أشهر</option>
              <option value="1year">سنة واحدة</option>
            </select>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            >
              <option value="all">جميع القطاعات</option>
              <option value="tourism">السياحة</option>
              <option value="fisheries">الثروة السمكية</option>
              <option value="agriculture">الزراعة</option>
              <option value="logistics">النقل</option>
              <option value="manufacturing">الصناعة</option>
            </select>

            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>

            <button
              onClick={handleExportInsights}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {error && <ErrorMessage error={{ message: error }} />}

      {/* اتجاهات السوق */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          {insights.marketTrends.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.marketTrends.insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${getImpactColor(insight.impact)}`}
                >
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">
                      مستوى التأثير: {insight.impact}
                    </span>
                    <span className="text-xs text-primary-600">
                      ثقة: {insight.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* التنبؤات المستقبلية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          {insights.predictions.title}
        </h3>
        <div className="space-y-4">
          {insights.predictions.predictions.map((prediction, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">
                  {prediction.prediction}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {prediction.timeframe}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {prediction.probability}% احتمال
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {prediction.factors.map((factor, factorIndex) => (
                  <span
                    key={factorIndex}
                    className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* التوصيات الذكية */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          {insights.recommendations.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.recommendations.recommendations.map(
            (recommendation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                    {recommendation.category}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${getPriorityColor(
                      recommendation.priority
                    )}`}
                  >
                    {recommendation.priority}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {recommendation.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {recommendation.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">العائد المتوقع:</span>
                  <span className="text-sm font-medium text-green-600">
                    {recommendation.expectedROI}
                  </span>
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* تحليل المخاطر */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          {insights.riskAnalysis.title}
        </h3>
        <div className="space-y-4">
          {insights.riskAnalysis.risks.map((risk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs ${getRiskColor(
                    risk.level
                  )}`}
                >
                  {risk.level}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
              <div className="p-3 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-800">
                  <strong>استراتيجية التخفيف:</strong> {risk.mitigation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* عوامل النجاح */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent-600" />
          {insights.successFactors.title}
        </h3>
        <div className="space-y-4">
          {insights.successFactors.factors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{factor.factor}</h4>
                <span className="text-lg font-bold text-accent-600">
                  {factor.importance}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{factor.description}</p>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-accent-600 h-2 rounded-full"
                    style={{ width: `${factor.importance}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIInsights;
