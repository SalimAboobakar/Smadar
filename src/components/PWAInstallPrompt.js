import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Smartphone, Monitor } from "lucide-react";

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // التحقق من وضع التطبيق المستقل
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia("(display-mode: standalone)").matches ||
        window.navigator.standalone ||
        document.referrer.includes("android-app://");

      setIsStandalone(isStandaloneMode);
    };

    // التحقق من تثبيت التطبيق
    const checkInstalled = () => {
      if ("getInstalledRelatedApps" in navigator) {
        navigator
          .getInstalledRelatedApps()
          .then((apps) => {
            setIsInstalled(apps.length > 0);
          })
          .catch((err) => {
            console.log("خطأ في فحص التطبيقات المثبتة:", err);
          });
      }
    };

    // الاستماع لحدث beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // منع عرض النافذة الافتراضية
      e.preventDefault();
      setDeferredPrompt(e);

      // إظهار النافذة المخصصة بعد 3 ثواني
      setTimeout(() => {
        if (!isStandalone && !isInstalled) {
          setShowPrompt(true);
        }
      }, 3000);
    };

    // الاستماع لحدث التثبيت
    const handleAppInstalled = () => {
      console.log("تم تثبيت التطبيق بنجاح");
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    checkStandalone();
    checkInstalled();

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isStandalone, isInstalled]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // إظهار نافذة التثبيت
      deferredPrompt.prompt();

      // انتظار اختيار المستخدم
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("المستخدم قبل تثبيت التطبيق");
      } else {
        console.log("المستخدم رفض تثبيت التطبيق");
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("خطأ في عملية التثبيت:", error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // عدم إظهار النافذة مرة أخرى في هذه الجلسة
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // عدم إظهار النافذة إذا تم رفضها مسبقاً في هذه الجلسة
  useEffect(() => {
    const dismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) {
      setShowPrompt(false);
    }
  }, []);

  // معلومات المتصفح والجهاز
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(userAgent);
    const isAndroid = /Android/.test(userAgent);
    const isChrome = /Chrome/.test(userAgent);
    const isSafari = /Safari/.test(userAgent) && !isChrome;

    return { isIOS, isAndroid, isChrome, isSafari };
  };

  const { isIOS, isAndroid, isChrome, isSafari } = getBrowserInfo();

  // تعليمات التثبيت حسب المتصفح
  const getInstallInstructions = () => {
    if (isIOS && isSafari) {
      return {
        title: "تثبيت على iPhone/iPad",
        steps: [
          "اضغط على زر المشاركة في أسفل الشاشة",
          "اختر 'إضافة إلى الشاشة الرئيسية'",
          "اضغط 'إضافة' لتأكيد التثبيت",
        ],
        icon: <Smartphone className="w-6 h-6" />,
      };
    } else if (isAndroid && isChrome) {
      return {
        title: "تثبيت على Android",
        steps: [
          "اضغط على القائمة (⋮) في أعلى المتصفح",
          "اختر 'إضافة إلى الشاشة الرئيسية'",
          "اضغط 'إضافة' لتأكيد التثبيت",
        ],
        icon: <Smartphone className="w-6 h-6" />,
      };
    } else {
      return {
        title: "تثبيت على الكمبيوتر",
        steps: [
          "اضغط على أيقونة التثبيت في شريط العنوان",
          "أو استخدم القائمة واختر 'تثبيت التطبيق'",
          "اتبع التعليمات لإكمال التثبيت",
        ],
        icon: <Monitor className="w-6 h-6" />,
      };
    }
  };

  const instructions = getInstallInstructions();

  if (isStandalone || isInstalled || !showPrompt) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto"
      >
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
          <div className="p-6">
            {/* رأس النافذة */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {instructions.icon}
                <h3 className="text-white font-bold text-lg">ثبت منصة يدوم</h3>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* المحتوى */}
            <div className="mb-6">
              <p className="text-white/90 mb-4 text-sm leading-relaxed">
                احصل على تجربة أفضل مع تطبيق منصة يدوم. الوصول السريع،
                الإشعارات، والعمل بدون إنترنت.
              </p>

              {/* المميزات */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  وصول سريع
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  إشعارات فورية
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  عمل بدون إنترنت
                </div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  تحديثات تلقائية
                </div>
              </div>
            </div>

            {/* الأزرار */}
            <div className="flex gap-3">
              {deferredPrompt ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstallClick}
                  className="flex-1 bg-white text-primary-600 font-semibold py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  تثبيت الآن
                </motion.button>
              ) : (
                <div className="flex-1">
                  <p className="text-white/60 text-xs mb-2">
                    {instructions.title}:
                  </p>
                  <ul className="text-white/80 text-xs space-y-1">
                    {instructions.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-accent-300 font-bold">
                          {index + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDismiss}
                className="px-4 py-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                لاحقاً
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
