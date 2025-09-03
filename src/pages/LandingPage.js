import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Star,
  ArrowRight,
  UserCog,
  Vote,
  Briefcase,
  Search,
  Download,
  Smartphone,
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import ChatbotTrigger from "../components/ChatbotTrigger";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import PartnerFooter from "../components/PartnerFooter";
import AdvancedSearch from "../components/AdvancedSearch";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  // بيانات البحث (يمكن دمجها مع البيانات من الخدمات)
  const searchableData = [
    {
      name: "لوحة المدير",
      type: "صفحة",
      description: "إدارة شاملة للمنصة",
      path: "/admin",
    },
    {
      name: "لوحة المستثمر",
      type: "صفحة",
      description: "أدوات التحليل والاستثمار",
      path: "/investor",
    },
    {
      name: "السوق الاستثماري",
      type: "صفحة",
      description: "تحليل السوق والفرص",
      path: "/market",
    },
    {
      name: "الفرص الاستثمارية",
      type: "صفحة",
      description: "استكشاف الفرص المتاحة",
      path: "/investment",
    },
    {
      name: "التحليلات المتقدمة",
      type: "صفحة",
      description: "لوحة التحكم والتحليلات",
      path: "/dashboard",
    },
    {
      name: "التصويت المجتمعي",
      type: "صفحة",
      description: "التصويت على المشاريع",
      path: "/voter",
    },
  ];

  const userTypes = [
    {
      id: "admin",
      title: "لوحة المدير",
      description: "إدارة شاملة للمنصة والبيانات والإحصائيات",
      icon: UserCog,
      color: "from-red-500 to-accent-600",
      features: [
        "إدارة المشاريع والبيانات",
        "مراقبة الإحصائيات",
        "إدارة المستخدمين",
        "تقارير مفصلة",
      ],
      path: "/admin",
    },
    {
      id: "investor",
      title: "لوحة المستثمر",
      description: "أدوات التحليل والاستثمار الذكية",
      icon: TrendingUp,
      color: "from-accent-500 to-primary-600",
      features: [
        "تحليل المشاريع",
        "تقييم المخاطر",
        "التوصيات الذكية",
        "تقارير الاستثمار",
      ],
      path: "/investor",
    },
    {
      id: "voter",
      title: "صفحة الناخب",
      description: "التصويت على المشاريع وإبداء الرأي",
      icon: Vote,
      color: "from-green-500 to-emerald-600",
      features: [
        "التصويت على المشاريع",
        "إبداء الرأي",
        "مشاركة الأفكار",
        "لا يتطلب تسجيل دخول",
      ],
      path: "/voter",
    },
    {
      id: "investment",
      title: "الفرص الاستثمارية",
      description: "استكشف أفضل الفرص الاستثمارية في ظفار",
      icon: Briefcase,
      color: "from-orange-500 to-red-600",
      features: [
        "فرص استثمارية حقيقية",
        "تحليل مفصل لكل قطاع",
        "بيانات دقيقة ومحدثة",
        "تقييم المخاطر والعوائد",
      ],
      path: "/investment",
    },
    {
      id: "dashboard",
      title: "لوحة التحكم المحسنة",
      description: "تحليلات متقدمة وإحصائيات شاملة",
      icon: BarChart3,
      color: "from-accent-500 to-primary-600",
      features: [
        "تحليلات متقدمة",
        "رسوم بيانية تفاعلية",
        "إحصائيات شاملة",
        "رؤى وتنبؤات ذكية",
      ],
      path: "/dashboard",
    },
    {
      id: "market",
      title: "سوق ظفار الاستثماري",
      description: "تحليل شامل للسوق والفرص الاستثمارية",
      icon: TrendingUp,
      color: "from-emerald-500 to-teal-600",
      features: [
        "تحليل السوق الشامل",
        "مؤشرات الأداء الرئيسية",
        "اتجاهات الاستثمار",
        "توقعات مستقبلية",
      ],
      path: "/market",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      {/* Hero Section */}
      <HeroSection />

      {/* شريط البحث السريع */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowSearch(!showSearch)}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-right hover:bg-white/20 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <Search className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
            <span className="text-white/80 group-hover:text-white transition-colors">
              ابحث في المنصة... (المشاريع، الصفحات، البيانات)
            </span>
          </div>
        </motion.button>

        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <AdvancedSearch
              data={searchableData}
              onResults={setSearchResults}
              placeholder="ابحث في جميع أجزاء المنصة..."
            />

            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-4"
              >
                <h3 className="text-white font-semibold mb-3 text-right">
                  نتائج البحث ({searchResults.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.slice(0, 5).map((result, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigate(result.path)}
                      className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <ArrowRight className="w-4 h-4 text-white/60" />
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {result.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {result.description}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* User Type Selection */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            اختر نوع المستخدم
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            منصة يدوم تقدم تجارب مخصصة لكل نوع من المستخدمين
          </p>
        </motion.div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(userType.path)}
                className={`bg-gradient-to-br ${userType.color} p-8 rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 hover:shadow-3xl`}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                    <userType.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {userType.title}
                  </h3>

                  <p className="text-white/90 mb-6 leading-relaxed">
                    {userType.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {userType.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-white/80 text-sm"
                      >
                        <Star className="w-4 h-4 text-yellow-300 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-white font-semibold"
                  >
                    ابدأ الآن
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">
              مميزات منصة يدوم
            </h3>
            <p className="text-white/70">
              منصة شاملة تجمع بين الذكاء الاصطناعي ومشاركة المجتمع
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "ذكاء اصطناعي",
                description: "تحليل متقدم باستخدام Gemini AI",
              },
              {
                icon: BarChart3,
                title: "تحليل البيانات",
                description: "رسوم بيانية وإحصائيات مفصلة",
              },
              {
                icon: Users,
                title: "مشاركة المجتمع",
                description: "تصويت وآراء المجتمع",
              },
              {
                icon: Shield,
                title: "أمان وموثوقية",
                description: "حماية البيانات والمعلومات",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-500/20 rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-accent-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Chatbot Trigger */}
      <ChatbotTrigger />
      <PWAInstallPrompt />

      {/* Partner Footer */}
      <PartnerFooter />
    </div>
  );
};

export default LandingPage;
