import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  ArrowRight,
  Zap,
  Award,
  ChevronRight,
  Play,
} from "lucide-react";
import Spotlight from "./ui/Spotlight";
import BackgroundBeams from "./ui/BackgroundBeams";
import TextGenerateEffect from "./ui/TextGenerateEffect";
import TypewriterEffect from "./ui/TypewriterEffect";

const HeroSection = () => {
  const words = ["الاستثمار", "الذكاء", "المجتمع", "الاستدامة"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const leftSlideVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const rightSlideVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(45, 109, 79, 0.3)",
        "0 0 40px rgba(45, 109, 79, 0.5)",
        "0 0 20px rgba(45, 109, 79, 0.3)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-primary-900 to-slate-800">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        <BackgroundBeams className="opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-primary-900/10 to-slate-900/50" />
      </div>

      {/* Dynamic Spotlight Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(255, 255, 255, 0.1)"
      />
      <Spotlight
        className="top-28 right-0 md:right-80"
        fill="rgba(45, 109, 79, 0.08)"
      />

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-primary-400/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-lg"
          animate={{
            rotate: [0, 45, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-32 w-16 h-16 border-2 border-accent-400/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-optimized relative z-10 py-20 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[70vh]"
        >
          {/* Left Column - Primary Content (7 columns) */}
          <motion.div
            variants={leftSlideVariants}
            className="lg:col-span-7 space-y-10 text-center lg:text-right"
          >
            {/* Premium Badge with Glow Effect */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <motion.div
                variants={glowVariants}
                animate="animate"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/20 via-accent-500/25 to-primary-500/20 px-8 py-4 rounded-full border border-white/20 backdrop-blur-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-primary-300" />
                </motion.div>
                <span className="text-white/95 font-semibold text-lg tracking-wide">
                  منصة يدوم - مستقبل الاستثمار الذكي
                </span>
                <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              </motion.div>
            </motion.div>

            {/* Hero Title with Advanced Typography */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6">
                <TextGenerateEffect
                  words="منصة ذكاء استثماري بلمسة المجتمع"
                  className="bg-gradient-to-l from-white via-primary-100 to-accent-200 bg-clip-text text-transparent drop-shadow-2xl"
                />
              </h1>
            </motion.div>

            {/* Dynamic Typewriter with Enhanced Styling */}
            <motion.div
              variants={itemVariants}
              className="h-16 flex items-center justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl rounded-full" />
                <div className="relative text-2xl lg:text-3xl text-white/90 font-medium">
                  <TypewriterEffect words={words} />
                </div>
              </div>
            </motion.div>

            {/* Enhanced Description */}
            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light"
            >
              منصة رقمية ذكية تساعد المستثمرين ورواد الأعمال على تقييم جدوى
              المشاريع في محافظة ظفار مع إشراك المجتمع في صنع القرار وتعزيز
              الشفافية في الاستثمار
            </motion.p>

            {/* Premium Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-gradient-to-r from-accent-500 via-primary-600 to-accent-600 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4 justify-center">
                  اختر نوع المستخدم
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-400 to-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-xl text-white px-10 py-5 rounded-2xl text-xl font-semibold border-2 border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4 justify-center">
                  <Play className="w-6 h-6" />
                  شاهد العرض التوضيحي
                </div>
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="pt-12 flex items-center justify-center lg:justify-start gap-8 text-white/60"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent-400" />
                <span className="text-sm">معتمد رسمياً</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-400" />
                <span className="text-sm">آمن ومضمون</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">سرعة فائقة</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Feature Cards (5 columns) */}
          <motion.div
            variants={rightSlideVariants}
            className="lg:col-span-5 space-y-8"
          >
            {/* Advanced Analytics Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <TrendingUp className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-200 transition-colors">
                      تحليل ذكي متقدم
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      مؤشرات رياضية متقدمة (IAI & SS) لتقييم الجدوى الاستثمارية
                      والاستدامة على المدى الطويل
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Community Engagement Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: -5,
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <Users className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-200 transition-colors">
                      مشاركة المجتمع
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      نظام تصويت مجتمعي تفاعلي لتعزيز الشفافية والمشاركة في
                      اتخاذ القرارات الاستثمارية
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sustainability Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <Shield className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-200 transition-colors">
                      استدامة المشاريع
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      تحليل شامل للمخاطر وضمان الاستدامة البيئية والاقتصادية
                      للمشاريع الاستثمارية
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/5 to-primary-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { number: "3", label: "ولايات مستهدفة", icon: "🏢" },
                { number: "5+", label: "أنواع مشاريع", icon: "📊" },
                { number: "100%", label: "شفافية", icon: "✨" },
                { number: "24/7", label: "متاح دائماً", icon: "🚀" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-6xl md:text-7xl font-black text-white mb-4 group-hover:text-primary-200 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-white/70 text-lg font-medium group-hover:text-white transition-colors">
                    {stat.label}
                  </div>
                  <div className="text-3xl mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-sm font-medium">اكتشف المزيد</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
