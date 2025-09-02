import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Star,
  MapPin,
  Eye,
  Zap,
  Target,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MarketAnalysis = ({ marketData, formatCurrency }) => {
  return (
    <>
      {/* اتجاهات السوق */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          اتجاهات السوق (مليون ر.ع)
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={marketData.marketTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="tourism"
              stackId="1"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.7}
              name="السياحة"
            />
            <Area
              type="monotone"
              dataKey="fisheries"
              stackId="1"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.7}
              name="الثروة السمكية"
            />
            <Area
              type="monotone"
              dataKey="agriculture"
              stackId="1"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.7}
              name="الزراعة"
            />
            <Area
              type="monotone"
              dataKey="logistics"
              stackId="1"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.7}
              name="النقل"
            />
            <Area
              type="monotone"
              dataKey="manufacturing"
              stackId="1"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.7}
              name="الصناعة"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* أفضل المشاريع أداءً */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <Star className="w-6 h-6 text-yellow-500" />
            أفضل المشاريع أداءً
          </h3>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
            عرض المزيد
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.topPerformers.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-green-600 font-medium">
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{project.rating}</span>
                </div>
              </div>

              <h4 className="font-bold text-lg mb-2 text-gray-800 leading-tight">
                {project.name}
              </h4>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">القطاع:</span>
                  <span className="font-medium">{project.sector}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المنطقة:</span>
                  <span className="font-medium">{project.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الاستثمار:</span>
                  <span className="font-medium">
                    {formatCurrency(project.investment)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {project.roi}%
                  </div>
                  <div className="text-xs text-gray-500">
                    العائد على الاستثمار
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    +{project.change}%
                  </span>
                </div>
              </div>

              <motion.div
                className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.roi}%` }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 1 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* التوزيع الجغرافي */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-red-600" />
          التوزيع الجغرافي للاستثمارات
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketData.regionalDistribution.map((region, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold">{region.region}</h4>
                  <div className="text-2xl font-bold">{region.percentage}%</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">القيمة الإجمالية:</span>
                    <span className="font-semibold">
                      {formatCurrency(region.value)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">المشاريع:</span>
                    <span className="font-semibold">{region.projects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">المستثمرون:</span>
                    <span className="font-semibold">{region.investors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">متوسط العائد:</span>
                    <span className="font-semibold">{region.avgROI}%</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <motion.div
                      className="bg-white h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${region.percentage}%` }}
                      transition={{ delay: 1.4 + index * 0.2, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* تحليلات متقدمة */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* رؤى السوق */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Eye className="w-6 h-6" />
            رؤى السوق
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 mt-1" />
              <div>
                <p className="font-semibold">نمو متسارع في قطاع السياحة</p>
                <p className="text-white/80 text-sm">
                  مع اقتراب موسم الخريف، نتوقع زيادة 25% في الاستثمارات السياحية
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-300 mt-1" />
              <div>
                <p className="font-semibold">فرص ذهبية في الثروة السمكية</p>
                <p className="text-white/80 text-sm">
                  الطلب المتزايد على المنتجات البحرية يخلق فرص استثمارية ممتازة
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-blue-300 mt-1" />
              <div>
                <p className="font-semibold">استقرار في القطاعات التقليدية</p>
                <p className="text-white/80 text-sm">
                  الزراعة والصناعة تظهر نمواً مستقراً ومخاطر منخفضة
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* توقعات المستقبل */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-green-600" />
            توقعات الربع القادم
          </h3>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-green-800">نمو متوقع</span>
                <span className="text-2xl font-bold text-green-600">+18%</span>
              </div>
              <p className="text-green-700 text-sm">
                نتوقع نمواً قوياً في الاستثمارات خلال الربع القادم
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-800">
                  مستثمرون جدد
                </span>
                <span className="text-2xl font-bold text-blue-600">+320</span>
              </div>
              <p className="text-blue-700 text-sm">
                توقعات بانضمام مستثمرين جدد للسوق
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-purple-800">
                  مشاريع جديدة
                </span>
                <span className="text-2xl font-bold text-purple-600">+25</span>
              </div>
              <p className="text-purple-700 text-sm">
                مشاريع استثمارية جديدة في المراحل النهائية
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* دعوة للعمل */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl p-8 text-center text-white"
      >
        <h3 className="text-3xl font-bold mb-4">
          ابدأ رحلتك الاستثمارية اليوم
        </h3>
        <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          اكتشف الفرص الذهبية في سوق ظفار واستثمر في مستقبل واعد مع عوائد مجزية
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
            <Target className="w-5 h-5" />
            استكشف الفرص
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            تحليل مفصل
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default MarketAnalysis;
