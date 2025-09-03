import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Mail, Phone, MapPin, Twitter } from 'lucide-react';

const PartnerFooter = () => {
  const partners = {
    government: [
      {
        name: "جهاز الرقابة المالية والإدارية للدولة",
        nameEn: "State Financial and Administrative Audit Authority",
        logo: "🏛️",
        website: "https://www.sai.gov.om/",
        description: "الشريك الرسمي في الحوكمة والرقابة المالية"
      },
      {
        name: "بلدية محافظة ظفار", 
        nameEn: "Dhofar Municipality",
        logo: "🏢",
        website: "#",
        description: "الشريك المحلي في التنمية المستدامة"
      },
      {
        name: "وزارة التراث والسياحة",
        nameEn: "Ministry of Heritage & Tourism", 
        logo: "🏛️",
        website: "#",
        description: "الشريك في تطوير القطاع السياحي"
      }
    ],
    private: [
      {
        name: "غرفة تجارة وصناعة ظفار",
        nameEn: "Dhofar Chamber of Commerce",
        logo: "💼", 
        website: "#",
        description: "شريك القطاع الخاص"
      },
      {
        name: "مجموعة الحكمة الاستثمارية",
        nameEn: "Al Hikma Investment Group",
        logo: "📈",
        website: "#",
        description: "شريك الاستثمار والتمويل"
      },
      {
        name: "مؤسسة التنمية السياحية",
        nameEn: "Tourism Development Foundation",
        logo: "🌴",
        website: "#", 
        description: "شريك تطوير السياحة المستدامة"
      }
    ],
    international: [
      {
        name: "البنك الدولي",
        nameEn: "World Bank",
        logo: "🌍",
        website: "#",
        description: "شريك التمويل الدولي"
      },
      {
        name: "منظمة السياحة العالمية",
        nameEn: "UNWTO", 
        logo: "✈️",
        website: "#",
        description: "شريك السياحة العالمية"
      }
    ]
  };

  const contactInfo = {
    email: "info@yadoom.om",
    phone: "+968 9XXX XXXX",
    address: "صلالة، محافظة ظفار، سلطنة عُمان",
    social: {
      twitter: "https://twitter.com/yadoom_om",
      instagram: "#",
      linkedin: "#",
      facebook: "#"
    }
  };

  const PartnerSection = ({ title, partners, bgColor = "bg-white", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`${bgColor} rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow`}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">🤝</span>
        </div>
        {title}
      </h3>
      
      <div className="space-y-4">
        {partners.map((partner, index) => (
          <motion.a
            key={index}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, x: 5 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-100 hover:border-gray-200"
          >
            <div className="text-3xl mt-1 group-hover:scale-110 transition-transform">
              {partner.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1">
                {partner.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2 leading-tight">
                {partner.nameEn}
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {partner.description}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-600 mt-1 flex-shrink-0 transition-colors" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* قسم الشراكات */}
        <div className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🤝</span>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                بالتعاون مع
              </h2>
            </div>
            
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 mx-auto rounded-full mb-6"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              نعمل مع شركائنا الاستراتيجيين من الجهات الحكومية والقطاع الخاص والمنظمات الدولية
              <br />
              لتطوير النظام البيئي الاستثماري في محافظة ظفار وتعزيز الشفافية والحوكمة الرشيدة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <PartnerSection
              title="الجهات الحكومية"
              partners={partners.government}
              bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
              delay={0.1}
            />
            
            <PartnerSection
              title="القطاع الخاص"
              partners={partners.private}
              bgColor="bg-gradient-to-br from-green-50 to-green-100"
              delay={0.2}
            />
            
            <PartnerSection
              title="المنظمات الدولية"
              partners={partners.international}
              bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
              delay={0.3}
            />
          </div>

          {/* إحصائيات الشراكة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">{partners.government.length + partners.private.length + partners.international.length}+</div>
                <div className="text-primary-100">شريك استراتيجي</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-primary-100">شفافية في البيانات</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-primary-100">دعم فني متواصل</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* قسم التواصل والمعلومات */}
        <div className="border-t border-gray-200 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* معلومات المنصة */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">يدوم</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    منصة يدوم
                  </h3>
                  <p className="text-gray-600 font-medium">ذكاء استثماري بلمسة المجتمع</p>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                منصة رقمية متطورة تهدف إلى تعزيز الاستثمار الذكي في محافظة ظفار من خلال تحليل البيانات 
                والذكاء الاصطناعي، مع إشراك المجتمع المحلي في عملية اتخاذ القرارات الاستثمارية وضمان الشفافية 
                والحوكمة الرشيدة بالتعاون مع {' '}
                <a 
                  href="https://www.sai.gov.om/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold underline decoration-2 underline-offset-2"
                >
                  جهاز الرقابة المالية والإدارية للدولة
                </a>
              </p>
              
              {/* وسائل التواصل الاجتماعي */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800 text-lg">تابعنا على:</h4>
                <div className="flex items-center gap-4">
                  {[
                    { name: "X (Twitter)", icon: "𝕏", url: contactInfo.social.twitter, color: "hover:bg-black" },
                    { name: "Instagram", icon: "📸", url: contactInfo.social.instagram, color: "hover:bg-pink-500" },
                    { name: "LinkedIn", icon: "💼", url: contactInfo.social.linkedin, color: "hover:bg-blue-600" },
                    { name: "Facebook", icon: "👥", url: contactInfo.social.facebook, color: "hover:bg-blue-500" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 hover:text-white ${social.color} group`}
                      title={social.name}
                    >
                      <span className="group-hover:scale-110 transition-transform">
                        {social.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* معلومات الاتصال */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-500" />
                تواصل معنا
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">العنوان</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">الهاتف</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium" dir="ltr">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">البريد الإلكتروني</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Twitter className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800 text-sm">منصة X</p>
                    <a href={contactInfo.social.twitter} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      @yadoom_om
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* روابط سريعة */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-gray-800 text-lg mb-6">روابط سريعة</h4>
              <div className="space-y-3">
                {[
                  { name: "عن المنصة", url: "#about" },
                  { name: "الخدمات", url: "#services" },
                  { name: "الشراكات", url: "#partnerships" },
                  { name: "الدعم الفني", url: "#support" },
                  { name: "سياسة الخصوصية", url: "#privacy" },
                  { name: "شروط الاستخدام", url: "#terms" },
                  { name: "الأسئلة الشائعة", url: "#faq" },
                  { name: "اتصل بنا", url: "#contact" }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-gray-600 hover:text-primary-600 transition-colors text-sm py-1 hover:translate-x-1 transition-transform duration-200"
                  >
                    ← {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 منصة يدوم. جميع الحقوق محفوظة.
              </p>
              <span className="text-gray-300">|</span>
              <p className="text-gray-500 text-sm">
                صُنع بـ ❤️ في سلطنة عُمان
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>النسخة 1.0.0</span>
              <span>|</span>
              <span>آخر تحديث: {new Date().toLocaleDateString('ar-SA')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PartnerFooter;
