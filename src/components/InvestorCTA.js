import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Clock, Star, TrendingUp, MessageSquare, 
  Users, CheckCircle, ArrowRight, X 
} from 'lucide-react';

const InvestorCTA = ({ analysisData, visible = true }) => {
  const [showCTA, setShowCTA] = useState(false);
  const [ctaType, setCTAType] = useState('general');

  useEffect(() => {
    if (!visible) return;

    // Smart triggers based on user behavior
    const timer = setTimeout(() => {
      if (analysisData) {
        // Results-based trigger
        if (analysisData.iai > 70) {
          setCTAType('high_potential');
        } else if (analysisData.iai < 40) {
          setCTAType('needs_guidance');
        } else {
          setCTAType('optimization');
        }
      } else {
        setCTAType('general');
      }
      setShowCTA(true);
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [analysisData, visible]);

  const ctaContent = {
    general: {
      title: "💡 هل تحتاج مساعدة في اتخاذ القرار؟",
      subtitle: "تحدث مع خبير عبر الفيديو",
      message: "احصل على استشارة مجانية لمدة 15 دقيقة مع أحد خبرائنا",
      urgency: "العرض محدود - فقط لأول 50 مستثمر اليوم",
      color: "blue"
    },
    high_potential: {
      title: "🚀 مشروعك يظهر إمكانات عالية!",
      subtitle: "حان الوقت للتحرك",
      message: "دع خبراءنا يساعدونك في تحويل هذه النتائج الممتازة إلى خطة عمل",
      urgency: "استغل هذه الفرصة الذهبية الآن",
      color: "green"
    },
    needs_guidance: {
      title: "🤔 النتائج تحتاج إلى تحسين؟",
      subtitle: "لا تقلق، نحن هنا للمساعدة",
      message: "تحدث مع خبير لاكتشاف الحلول وتحسين فرص نجاح مشروعك",
      urgency: "استشارة مجانية - لا تدع الفرصة تفوتك",
      color: "orange"
    },
    optimization: {
      title: "⚡ يمكننا مساعدتك في التحسين",
      subtitle: "خطوات بسيطة لنتائج أفضل",
      message: "احجز جلسة فيديو لتحسين استراتيجيتك وزيادة فرص النجاح",
      urgency: "خبراؤنا متاحون الآن للمساعدة",
      color: "purple"
    }
  };

  const current = ctaContent[ctaType];
  const colorClasses = {
    blue: "from-blue-500 to-blue-600 border-blue-300 bg-blue-50",
    green: "from-green-500 to-green-600 border-green-300 bg-green-50",
    orange: "from-orange-500 to-orange-600 border-orange-300 bg-orange-50",
    purple: "from-purple-500 to-purple-600 border-purple-300 bg-purple-50"
  };

  if (!showCTA) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className={`fixed bottom-6 right-6 max-w-sm bg-white rounded-2xl shadow-2xl border-2 ${colorClasses[current.color].split(' ')[2]} z-40 overflow-hidden`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${colorClasses[current.color].split(' ')[0]} ${colorClasses[current.color].split(' ')[1]} p-4 text-white relative`}>
          <button
            onClick={() => setShowCTA(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">{current.title}</h3>
              <p className="text-white/90 text-xs">{current.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {current.message}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="bg-gray-50 rounded-lg p-2">
              <Users className="w-4 h-4 text-gray-600 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-800">250+</div>
              <div className="text-xs text-gray-600">استشارة</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <Star className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-800">4.9</div>
              <div className="text-xs text-gray-600">تقييم</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <Clock className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <div className="text-xs font-bold text-gray-800">15</div>
              <div className="text-xs text-gray-600">دقيقة</div>
            </div>
          </div>

          {/* Urgency */}
          <div className={`${colorClasses[current.color].split(' ')[3]} border ${colorClasses[current.color].split(' ')[2]} rounded-lg p-3 mb-4`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-700">{current.urgency}</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              // This would trigger the ExpertAdvisoryTeam modal
              const event = new CustomEvent('openVideoConsultation', { 
                detail: { analysisData, ctaType } 
              });
              window.dispatchEvent(event);
              setShowCTA(false);
            }}
            className={`w-full bg-gradient-to-r ${colorClasses[current.color].split(' ')[0]} ${colorClasses[current.color].split(' ')[1]} text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2`}
          >
            <Video className="w-4 h-4" />
            ابدأ الاستشارة المرئية
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-xs text-gray-500 mt-2">
            مجاناً • بدون التزام • خبراء معتمدون
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InvestorCTA;
