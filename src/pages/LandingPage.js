import React from "react";
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
} from "lucide-react";
import HeroSection from "../components/HeroSection";
import ChatbotTrigger from "../components/ChatbotTrigger";

const LandingPage = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      id: "admin",
      title: "لوحة المدير",
      description: "إدارة شاملة للمنصة والبيانات والإحصائيات",
      icon: UserCog,
      color: "from-red-500 to-pink-600",
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
      color: "from-blue-500 to-purple-600",
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <HeroSection />

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
            منصة تدوم تقدم تجارب مخصصة لكل نوع من المستخدمين
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
              مميزات منصة تدوم
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mb-4">
                  <feature.icon className="w-6 h-6 text-blue-400" />
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
    </div>
  );
};

export default LandingPage;
