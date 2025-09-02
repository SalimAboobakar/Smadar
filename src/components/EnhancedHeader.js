import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Globe,
  Search,
  User,
  Settings,
  LogOut,
  Bell,
  Menu,
} from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import NotificationSystem from "./NotificationSystem";

const EnhancedHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // تحديد عنوان الصفحة الحالية
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "الرئيسية";
      case "/admin":
        return "لوحة المدير";
      case "/investor":
        return "لوحة المستثمر";
      case "/voter":
        return "صفحة الناخب";
      case "/investment":
        return "الفرص الاستثمارية";
      case "/dashboard":
        return "لوحة التحكم المحسنة";
      default:
        return "منصة تدوم";
    }
  };

  // تبديل الوضع المظلم
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // يمكن إضافة منطق حفظ الوضع المظلم في localStorage
  };

  // البحث
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // يمكن إضافة منطق البحث هنا
      console.log("البحث عن:", searchQuery);
    }
  };

  // تسجيل الخروج
  const handleLogout = () => {
    // يمكن إضافة منطق تسجيل الخروج هنا
    console.log("تسجيل الخروج");
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* الجانب الأيسر - القائمة والبحث */}
          <div className="flex items-center gap-4">
            {/* القائمة المحمولة */}
            <MobileNavigation />

            {/* شعار المنصة */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">ت</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">منصة تدوم</h1>
                <p className="text-xs text-gray-600">
                  ذكاء استثماري بلمسة المجتمع
                </p>
              </div>
            </div>

            {/* عنوان الصفحة الحالية */}
            <div className="hidden md:block ml-8">
              <h2 className="text-lg font-semibold text-gray-800">
                {getPageTitle()}
              </h2>
            </div>
          </div>

          {/* الجانب الأوسط - البحث */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في المشاريع والفرص الاستثمارية..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
                />
              </div>
            </form>
          </div>

          {/* الجانب الأيمن - الإشعارات والإعدادات */}
          <div className="flex items-center gap-2">
            {/* البحث المحمول */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* الإشعارات */}
            <NotificationSystem />

            {/* تبديل الوضع المظلم */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* تغيير اللغة */}
            <button className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg">
              <Globe className="w-5 h-5" />
            </button>

            {/* قائمة المستخدم */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">م</span>
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  مدير النظام
                </span>
              </button>

              {/* قائمة المستخدم المنبثقة */}
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      مدير النظام
                    </p>
                    <p className="text-xs text-gray-600">admin@tadawom.om</p>
                  </div>

                  <button className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    الملف الشخصي
                  </button>

                  <button className="w-full px-4 py-2 text-right text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    الإعدادات
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-right text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* شريط البحث المحمول */}
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في المشاريع والفرص الاستثمارية..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
                />
              </div>
            </form>
          </motion.div>
        )}
      </div>

      {/* إغلاق قائمة المستخدم عند النقر خارجها */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </motion.header>
  );
};

export default EnhancedHeader;
