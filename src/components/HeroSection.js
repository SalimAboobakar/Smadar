import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  Star,
} from "lucide-react";
import Spotlight from "./ui/Spotlight";
import BackgroundBeams from "./ui/BackgroundBeams";
import TextGenerateEffect from "./ui/TextGenerateEffect";
import TypewriterEffect from "./ui/TypewriterEffect";

const HeroSection = () => {
  const words = ["الاستثمار", "الذكاء", "المجتمع", "الاستدامة"];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
      <BackgroundBeams className="absolute inset-0" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 px-6 py-3 rounded-full border border-white/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-sm text-white/90 font-medium">
              منصة يدوم - مستقبل الاستثمار الذكي
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            <TextGenerateEffect
              words="منصة ذكاء استثماري بلمسة المجتمع"
              className="bg-gradient-to-r from-white via-primary-100 to-accent-200 bg-clip-text text-transparent"
            />
          </h1>

          <div className="text-2xl md:text-3xl text-white/80 mb-8 h-12 flex items-center justify-center">
            <TypewriterEffect words={words} />
          </div>

          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-12 leading-relaxed">
            منصة رقمية ذكية تساعد المستثمرين ورواد الأعمال على تقييم جدوى
            المشاريع في محافظة ظفار مع إشراك المجتمع في صنع القرار وتعزيز
            الشفافية في الاستثمار
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-4">
              تحليل ذكي متقدم
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              مؤشرات رياضية متقدمة (IAI & SS) لتقييم الجدوى الاستثمارية
              والاستدامة على المدى الطويل
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-4">
              مشاركة المجتمع
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              نظام تصويت مجتمعي تفاعلي لتعزيز الشفافية والمشاركة في اتخاذ
              القرارات الاستثمارية
            </p>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-4">
              استدامة المشاريع
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              تحليل شامل للمخاطر وضمان الاستدامة البيئية والاقتصادية للمشاريع
              الاستثمارية
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-accent-500 to-primary-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-accent-600 hover:to-primary-700 transition-all duration-300 shadow-2xl flex items-center gap-3 group"
          >
            اختر نوع المستخدم
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-3"
          >
            <Star className="w-5 h-5" />
            شاهد العرض التوضيحي
          </motion.button>
        </motion.div>

        {/* إحصائيات سريعة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              3
            </div>
            <div className="text-white/70 text-sm">ولايات مستهدفة</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              5+
            </div>
            <div className="text-white/70 text-sm">أنواع مشاريع</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              100%
            </div>
            <div className="text-white/70 text-sm">شفافية</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              24/7
            </div>
            <div className="text-white/70 text-sm">متاح دائماً</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
