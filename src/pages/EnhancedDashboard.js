import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Building,
  MapPin,
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  PieChart,
  LineChart,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import AdvancedAnalytics from "../components/AdvancedAnalytics";
import {
  getPlatformStats,
  getPopularProjects,
} from "../services/firebaseService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";

const EnhancedDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [popularProjects, setPopularProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsData, projectsData] = await Promise.all([
        getPlatformStats(),
        getPopularProjects(),
      ]);

      setStats(statsData);
      setPopularProjects(projectsData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("خطأ في تحميل بيانات لوحة التحكم:", err);
      setError("فشل في تحميل بيانات لوحة التحكم");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  const handleExportData = () => {
    // محاكاة تصدير البيانات
    const data = {
      stats,
      popularProjects,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tadawom-dashboard-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: "overview", name: "نظرة عامة", icon: BarChart3 },
    { id: "analytics", name: "التحليلات المتقدمة", icon: LineChart },
    { id: "projects", name: "المشاريع الشائعة", icon: Building },
    { id: "insights", name: "الرؤى والتنبؤات", icon: Target },
  ];

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التحكم العلوي */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                لوحة التحكم المحسنة
              </h1>
              <p className="text-sm text-gray-600">
                آخر تحديث: {lastUpdated.toLocaleString("ar-OM")}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>

              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                تصدير البيانات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* تبويبات التنقل */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <ErrorMessage error={{ message: error }} />}

        {/* تبويب النظرة العامة */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
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
                      إجمالي التصويتات
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(stats?.totalVotes || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +15% من الشهر الماضي
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
                      إجمالي التحليلات
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(stats?.totalAnalyses || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +8 تحليلات جديدة
                  </span>
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
                    <p className="text-sm font-medium text-gray-600">
                      معدل الموافقة
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats?.approvalRate || 0}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-accent-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3% من الهدف</span>
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
                    <p className="text-sm font-medium text-gray-600">
                      التصويتات الإيجابية
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(stats?.upVotes || 0)}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    +12% من الشهر الماضي
                  </span>
                </div>
              </motion.div>
            </div>

            {/* المشاريع الشائعة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                المشاريع الأكثر شعبية
              </h3>
              <div className="space-y-4">
                {popularProjects.slice(0, 5).map((project, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-bold text-primary-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{project.projectType}</p>
                        <p className="text-sm text-gray-600">
                          {project.region}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{project.totalVotes} تصويت</p>
                      <p className="text-sm text-gray-600">
                        {Math.round(
                          (project.upVotes / project.totalVotes) * 100
                        )}
                        % موافقة
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h4 className="font-semibold mb-3">المناطق الأكثر نشاطاً</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">صلالة</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">مرباط</span>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">طاقة</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h4 className="font-semibold mb-3">أنواع المشاريع</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">السياحة</span>
                    <span className="text-sm font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الزراعة</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">الثروة السمكية</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">أخرى</span>
                    <span className="text-sm font-medium">20%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h4 className="font-semibold mb-3">مؤشرات الأداء</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">معدل الاستجابة</span>
                    <span className="text-sm font-medium text-green-600">
                      95%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">وقت التحليل</span>
                    <span className="text-sm font-medium">2.3 دقيقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">دقة التوقعات</span>
                    <span className="text-sm font-medium text-primary-600">
                      87%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* تبويب التحليلات المتقدمة */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AdvancedAnalytics />
          </motion.div>
        )}

        {/* تبويب المشاريع الشائعة */}
        {activeTab === "projects" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">
                المشاريع الأكثر شعبية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{project.projectType}</h4>
                      <span className="text-sm text-gray-500">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">المنطقة:</span>
                        <span className="font-medium">{project.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">إجمالي الأصوات:</span>
                        <span className="font-medium">
                          {project.totalVotes}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">معدل الموافقة:</span>
                        <span className="font-medium text-green-600">
                          {Math.round(
                            (project.upVotes / project.totalVotes) * 100
                          )}
                          %
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${
                              (project.upVotes / project.totalVotes) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* تبويب الرؤى والتنبؤات */}
        {activeTab === "insights" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">الرؤى والتنبؤات</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    اتجاهات النمو
                  </h4>
                  <p className="text-sm text-blue-700">
                    من المتوقع أن يشهد قطاع السياحة نمواً بنسبة 15% خلال الأشهر
                    القادمة، خاصة مع اقتراب موسم الخريف.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    فرص جديدة
                  </h4>
                  <p className="text-sm text-green-700">
                    قطاع الثروة السمكية يظهر إمكانيات كبيرة للنمو مع زيادة الطلب
                    على المنتجات البحرية في الأسواق الإقليمية.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    تحذيرات
                  </h4>
                  <p className="text-sm text-yellow-700">
                    المنافسة في قطاع المطاعم والمقاهي تزداد، مما يتطلب
                    استراتيجيات تميز واضحة للمشاريع الجديدة.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">توصيات</h4>
                  <p className="text-sm text-purple-700">
                    يُنصح بالتركيز على المشاريع المستدامة والابتكارية التي تخدم
                    المجتمع المحلي والسياح على حد سواء.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedDashboard;
