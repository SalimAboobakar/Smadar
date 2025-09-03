import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, Phone, Mail, MessageSquare, Star, Award, 
  Briefcase, TrendingUp, ChevronRight, Clock, CheckCircle, 
  Video, Monitor, Headphones, Wifi, Play, User, Trophy
} from 'lucide-react';

const ExpertAdvisoryTeam = ({ onConsultationBooked }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [consultationStep, setConsultationStep] = useState('team');
  const [isBooking, setIsBooking] = useState(false);

  const expertTeam = [
    {
      id: 1,
      name: "د. محمد الحكماني",
      title: "مستشار استثماري أول",
      specialization: "الاستثمار السياحي والفندقي",
      experience: "15+ سنة",
      rating: 4.9,
      reviewsCount: 127,
      successStories: 89,
      avatar: "👨‍💼",
      email: "mohammed.hakmani@yadoom.om",
      videoCallsCompleted: 245,
      nextAvailable: "اليوم 2:00 PM",
      languages: ["العربية", "الإنجليزية"],
      specialties: ["السياحة", "الفنادق", "المطاعم", "الترفيه"],
      consultationTypes: [
        {
          type: "quick_video",
          title: "استشارة سريعة - فيديو",
          duration: 15,
          price: "مجاناً",
          description: "مكالمة فيديو سريعة للتوجيه الأولي",
          features: ["تقييم سريع", "نصائح أساسية", "توجيه استراتيجي"]
        },
        {
          type: "detailed_video",
          title: "جلسة تحليل شاملة - فيديو",
          duration: 45,
          price: "120 ر.ع",
          description: "جلسة فيديو مفصلة مع تحليل عميق",
          features: ["تحليل شامل", "خطة عمل", "تقرير مكتوب", "متابعة أسبوعين"]
        }
      ]
    },
    {
      id: 2,
      name: "أ. فاطمة البلوشية",
      title: "خبيرة التمويل والاستثمار",
      specialization: "المشاريع الصغيرة والمتوسطة",
      experience: "12+ سنة",
      rating: 4.8,
      reviewsCount: 93,
      successStories: 67,
      avatar: "👩‍💼",
      email: "fatima.balushi@yadoom.om",
      videoCallsCompleted: 189,
      nextAvailable: "غداً 10:00 AM",
      languages: ["العربية", "الإنجليزية"],
      specialties: ["التمويل", "المشاريع الصغيرة", "ريادة الأعمال"],
      consultationTypes: [
        {
          type: "funding_video",
          title: "استشارة التمويل - فيديو",
          duration: 30,
          price: "80 ر.ع",
          description: "جلسة فيديو متخصصة في حلول التمويل",
          features: ["استراتيجيات التمويل", "تقييم الجدوى", "خطط الأعمال"]
        }
      ]
    },
    {
      id: 3,
      name: "م. أحمد الشنفري",
      title: "مستشار التكنولوجيا والابتكار",
      specialization: "المشاريع التقنية والذكية",
      experience: "10+ سنوات",
      rating: 4.9,
      reviewsCount: 156,
      successStories: 78,
      avatar: "👨‍💻",
      email: "ahmed.shanfari@yadoom.om",
      videoCallsCompleted: 298,
      nextAvailable: "اليوم 4:00 PM",
      languages: ["العربية", "الإنجليزية"],
      specialties: ["التكنولوجيا", "الابتكار", "التطبيقات", "التجارة الإلكترونية"],
      consultationTypes: [
        {
          type: "tech_video",
          title: "استشارة تقنية - فيديو",
          duration: 40,
          price: "100 ر.ع",
          description: "جلسة فيديو للمشاريع التقنية والابتكار",
          features: ["التحليل التقني", "استراتيجية التطوير", "خارطة طريق"]
        }
      ]
    }
  ];

  const ExpertCard = ({ expert }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
    >
      <div className="p-6">
        {/* Expert Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl bg-gradient-to-br from-primary-100 to-accent-100 rounded-full w-16 h-16 flex items-center justify-center">
            {expert.avatar}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">{expert.name}</h3>
            <p className="text-primary-600 font-medium mb-1">{expert.title}</p>
            <p className="text-sm text-gray-600">{expert.specialization}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-gray-800">{expert.rating}</span>
            </div>
            <p className="text-xs text-gray-500">({expert.reviewsCount} تقييم)</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Video className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-gray-800">{expert.videoCallsCompleted}</span>
            </div>
            <p className="text-xs text-gray-600">مكالمة فيديو</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-green-500" />
              <span className="text-sm font-bold text-gray-800">{expert.successStories}</span>
            </div>
            <p className="text-xs text-gray-600">قصة نجاح</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Briefcase className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-bold text-gray-800">{expert.experience}</span>
            </div>
            <p className="text-xs text-gray-600">خبرة</p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-green-50 rounded-lg border border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">متاح {expert.nextAvailable}</span>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">التخصصات:</h4>
          <div className="flex flex-wrap gap-1">
            {expert.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Video Consultation Options */}
        <div className="space-y-2 mb-4">
          {expert.consultationTypes.map((consultation, index) => (
            <div key={index} className="border border-blue-200 rounded-lg p-3 bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">{consultation.title}</span>
                </div>
                <span className="text-blue-600 font-bold">{consultation.price}</span>
              </div>
              <p className="text-xs text-blue-700 mb-2">{consultation.description}</p>
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <Clock className="w-3 h-3" />
                <span>{consultation.duration} دقيقة</span>
              </div>
            </div>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={() => {
            setSelectedExpert(expert);
            setConsultationStep('booking');
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Video className="w-5 h-5" />
          احجز استشارة فيديو
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const VideoBookingForm = ({ expert }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      consultationType: expert.consultationTypes[0]?.type || 'quick_video',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });

    const mockTimeSlots = [
      "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", 
      "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsBooking(true);

      // Mock booking process
      setTimeout(() => {
        setIsBooking(false);
        setConsultationStep('success');
        if (onConsultationBooked) {
          onConsultationBooked({
            expert,
            formData,
            mockMeetingId: Math.random().toString(36).substr(2, 9),
            mockJoinUrl: `https://zoom.us/j/${Math.random().toString().substr(2, 10)}`
          });
        }
      }, 2000);
    };

    const selectedConsultation = expert.consultationTypes.find(
      type => type.type === formData.consultationType
    );

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            حجز استشارة فيديو مع {expert.name}
          </h2>
          <p className="text-gray-600">املأ النموذج أدناه لحجز جلسة فيديو مباشرة</p>
        </div>

        {/* Selected Consultation Display */}
        {selectedConsultation && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200 mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-blue-800">{selectedConsultation.title}</h3>
              <span className="text-blue-600 font-bold text-lg">{selectedConsultation.price}</span>
            </div>
            <p className="text-blue-700 text-sm mb-3">{selectedConsultation.description}</p>
            <div className="flex items-center gap-4 text-sm text-blue-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{selectedConsultation.duration} دقيقة</span>
              </div>
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span>مكالمة فيديو مباشرة</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+968 9XXX XXXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الاستشارة المرئية</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.consultationType}
              onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
            >
              {expert.consultationTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.title} - {type.duration} دقيقة ({type.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ المفضل *</label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.preferredDate}
              onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوقت المفضل *</label>
            <select
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={formData.preferredTime}
              onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
            >
              <option value="">اختر الوقت</option>
              {mockTimeSlots.map((time) => (
                <option key={time} value={time}>
                  {time} (توقيت مسقط)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">نوع المشروع</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={formData.projectType}
            onChange={(e) => setFormData({...formData, projectType: e.target.value})}
            placeholder="مثال: مطعم، فندق، متجر إلكتروني..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">رسالة إضافية</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="3"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="أخبرنا المزيد عن مشروعك أو أي أسئلة محددة لديك..."
          />
        </div>

        {/* Video Requirements */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            متطلبات الجلسة المرئية
          </h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              اتصال إنترنت مستقر (سرعة 5 ميجابت على الأقل)
            </li>
            <li className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              كاميرا ومايكروفون (مدمج أو خارجي)
            </li>
            <li className="flex items-center gap-2">
              <Headphones className="w-4 h-4" />
              سماعات أذن للحصول على أفضل جودة صوت
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              الانضمام قبل 5 دقائق من الموعد المحدد
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isBooking}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isBooking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري إنشاء الاجتماع...
              </>
            ) : (
              <>
                <Video className="w-5 h-5" />
                حجز الاستشارة المرئية
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => setConsultationStep('team')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            رجوع
          </button>
        </div>
      </form>
    );
  };

  const SuccessMessage = () => (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
        <Video className="w-12 h-12 text-white" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 تم حجز الاستشارة المرئية بنجاح!</h2>
        <p className="text-gray-600 text-lg">
          سيتواصل معك فريقنا قريباً لتأكيد الموعد وإرسال رابط الاجتماع
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-4 text-xl">📹 ماذا بعد الحجز؟</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left" dir="rtl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-medium text-blue-800">تأكيد الموعد</h4>
              <p className="text-sm text-blue-600">سنتصل بك خلال ساعة لتأكيد الموعد</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-medium text-purple-800">رابط الاجتماع</h4>
              <p className="text-sm text-purple-600">سيصلك رابط الفيديو عبر البريد الإلكتروني</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-medium text-green-800">تذكير الموعد</h4>
              <p className="text-sm text-green-600">تذكير قبل 24 ساعة وقبل 15 دقيقة</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <div>
              <h4 className="font-medium text-orange-800">الجلسة المرئية</h4>
              <p className="text-sm text-orange-600">استشارة مخصصة مع الخبير المختص</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-800 mb-2">
          <Wifi className="w-5 h-5" />
          <span className="font-medium">نصيحة للحصول على أفضل تجربة:</span>
        </div>
        <p className="text-yellow-700 text-sm">
          تأكد من اختبار الكاميرا والمايكروفون قبل موعد الاجتماع، واستخدم سماعات الأذن لتجنب الصدى
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setShowModal(false);
            setConsultationStep('team');
            setSelectedExpert(null);
          }}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          ممتاز! 🎯
        </button>
        <button
          onClick={() => setConsultationStep('team')}
          className="px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
        >
          حجز استشارة أخرى
        </button>
      </div>
    </div>
  );

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
      >
        <Video className="w-5 h-5" />
        تواصل مع فريق الخبراء
        <Users className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {consultationStep === 'team' && (
                  <div>
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <Users className="w-8 h-8 text-blue-600" />
                        <Video className="w-8 h-8 text-purple-600" />
                      </div>
                      <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        🎥 فريق الاستشارات المرئية
                      </h1>
                      <p className="text-gray-600 text-lg">
                        احجز جلسة فيديو مباشرة مع أحد خبرائنا المتخصصين
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {expertTeam.map((expert) => (
                        <ExpertCard key={expert.id} expert={expert} />
                      ))}
                    </div>
                  </div>
                )}

                {consultationStep === 'booking' && selectedExpert && (
                  <VideoBookingForm expert={selectedExpert} />
                )}

                {consultationStep === 'success' && (
                  <SuccessMessage />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpertAdvisoryTeam;
