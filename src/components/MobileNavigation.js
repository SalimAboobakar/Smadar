import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  UserCog,
  TrendingUp,
  Vote,
  Briefcase,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import NotificationSystem from "./NotificationSystem";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: "home",
      name: "الرئيسية",
      icon: Home,
      path: "/",
      color: "text-blue-600",
    },
    {
      id: "admin",
      name: "لوحة المدير",
      icon: UserCog,
      path: "/admin",
      color: "text-red-600",
    },
    {
      id: "investor",
      name: "لوحة المستثمر",
      icon: TrendingUp,
      path: "/investor",
      color: "text-green-600",
    },
    {
      id: "voter",
      name: "صفحة الناخب",
      icon: Vote,
      path: "/voter",
      color: "text-purple-600",
    },
    {
      id: "investment",
      name: "الفرص الاستثمارية",
      icon: Briefcase,
      path: "/investment",
      color: "text-orange-600",
    },
    {
      id: "dashboard",
      name: "لوحة التحكم المحسنة",
      icon: BarChart3,
      path: "/dashboard",
      color: "text-indigo-600",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const toggleSubmenu = (itemId) => {
    setActiveSubmenu(activeSubmenu === itemId ? null : itemId);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* زر القائمة */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* شريط التنقل للشاشات الكبيرة */}
      <div className="hidden lg:flex items-center gap-4">
        <NotificationSystem />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">م</span>
          </div>
          <span className="text-sm font-medium text-gray-700">مدير النظام</span>
        </div>
      </div>

      {/* القائمة المنبثقة */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* خلفية شفافة */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* القائمة */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50"
            >
              {/* رأس القائمة */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg font-bold">ت</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      منصة تدوم
                    </h2>
                    <p className="text-sm text-gray-600">ذكاء استثماري</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* معلومات المستخدم */}
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">م</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">مدير النظام</h3>
                    <p className="text-sm text-gray-600">admin@tadawom.om</p>
                  </div>
                </div>
              </div>

              {/* الإشعارات */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    الإشعارات
                  </span>
                  <NotificationSystem />
                </div>
              </div>

              {/* عناصر التنقل */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  {navigationItems.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-right transition-colors ${
                          isActive(item.path)
                            ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                        <span className="flex-1 text-right font-medium">
                          {item.name}
                        </span>
                        {isActive(item.path) && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    </div>
                  ))}
                </nav>
              </div>

              {/* إعدادات وخروج */}
              <div className="p-4 border-t border-gray-200 space-y-2">
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span className="flex-1 text-right font-medium">
                    الإعدادات
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="flex-1 text-right font-medium">
                    تسجيل الخروج
                  </span>
                </button>
              </div>

              {/* معلومات إضافية */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500">منصة تدوم v1.0.0</p>
                  <p className="text-xs text-gray-400 mt-1">
                    © 2024 جميع الحقوق محفوظة
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;
