import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  Users,
  Building,
  DollarSign,
} from "lucide-react";

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // محاكاة الإشعارات
  const mockNotifications = [
    {
      id: 1,
      type: "success",
      title: "مشروع جديد تمت الموافقة عليه",
      message: "مشروع فندق صغير في صلالة تمت الموافقة عليه من قبل المجتمع",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 دقائق مضت
      read: false,
      icon: CheckCircle,
    },
    {
      id: 2,
      type: "info",
      title: "تحديث في البيانات",
      message: "تم تحديث بيانات قطاع الثروة السمكية مع أرقام جديدة",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 دقيقة مضت
      read: false,
      icon: Info,
    },
    {
      id: 3,
      type: "warning",
      title: "تحذير: مخاطر عالية",
      message: "مشروع في قطاع الترفيه يظهر مخاطر عالية - يحتاج مراجعة",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 دقيقة مضت
      read: true,
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "trend",
      title: "اتجاه إيجابي",
      message: "قطاع السياحة يظهر نمواً بنسبة 15% هذا الشهر",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // ساعة مضت
      read: true,
      icon: TrendingUp,
    },
    {
      id: 5,
      type: "investment",
      title: "استثمار جديد",
      message: "مستثمر جديد انضم للمنصة مع رأس مال 500,000 ريال عماني",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // ساعتان مضتا
      read: true,
      icon: DollarSign,
    },
  ];

  useEffect(() => {
    // تحميل الإشعارات
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);

    // محاكاة إشعارات جديدة
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ["success", "info", "warning", "trend", "investment"][
          Math.floor(Math.random() * 5)
        ],
        title: "إشعار جديد",
        message: "تم تحديث البيانات أو إضافة مشروع جديد",
        timestamp: new Date(),
        read: false,
        icon: Bell,
      };

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    }, 30000); // كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "info":
        return Info;
      case "trend":
        return TrendingUp;
      case "investment":
        return DollarSign;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "info":
        return "text-blue-600 bg-blue-100";
      case "trend":
        return "text-purple-600 bg-purple-100";
      case "investment":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  return (
    <div className="relative">
      {/* زر الإشعارات */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* قائمة الإشعارات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            {/* رأس الإشعارات */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  الإشعارات
                </h3>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      تعيين الكل كمقروء
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* قائمة الإشعارات */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  لا توجد إشعارات
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? "bg-blue-50" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${getNotificationColor(
                            notification.type
                          )}`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* تذييل الإشعارات */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800">
                  عرض جميع الإشعارات
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* إشعار منبثق (Toast) */}
      <AnimatePresence>
        {notifications.filter((n) => !n.read).length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bell className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  إشعار جديد
                </h4>
                <p className="text-sm text-gray-600">
                  لديك {unreadCount} إشعار غير مقروء
                </p>
              </div>
              <button
                onClick={() => setUnreadCount(0)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
