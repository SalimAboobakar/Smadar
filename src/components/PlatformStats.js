import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  BarChart3,
  Award,
  Globe,
  Activity,
} from "lucide-react";
import AnimatedCard from "./ui/AnimatedCard";
import {
  getPlatformStats,
  getPopularProjects,
} from "../services/firebaseService";

const PlatformStats = () => {
  const [stats, setStats] = useState(null);
  const [popularProjects, setPopularProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [platformStats, popular] = await Promise.all([
        getPlatformStats(),
        getPopularProjects(),
      ]);

      setStats(platformStats);
      setPopularProjects(popular);
    } catch (error) {
      console.error("خطأ في تحميل الإحصائيات:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-white mb-2">
            جاري تحميل الإحصائيات...
          </h3>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات عامة */}
      <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">إحصائيات المنصة</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            className="text-center p-4 bg-primary-500/20 rounded-xl border border-primary-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary-400">
              {stats?.totalVotes || 0}
            </div>
            <div className="text-sm text-blue-300">إجمالي الأصوات</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-green-500/20 rounded-xl border border-green-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">
              {stats?.totalAnalyses || 0}
            </div>
            <div className="text-sm text-green-300">التحليلات المنجزة</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-accent-500/20 rounded-xl border border-accent-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="w-8 h-8 text-accent-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent-400">
              {stats?.approvalRate || 0}%
            </div>
            <div className="text-sm text-purple-300">نسبة الموافقة العامة</div>
          </motion.div>

          <motion.div
            className="text-center p-4 bg-orange-500/20 rounded-xl border border-orange-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Activity className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">
              {stats?.upVotes || 0}
            </div>
            <div className="text-sm text-orange-300">أصوات الموافقة</div>
          </motion.div>
        </div>
      </AnimatedCard>

      {/* المشاريع الأكثر شعبية */}
      <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-600 rounded-xl flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            المشاريع الأكثر شعبية
          </h3>
        </div>

        <div className="space-y-3">
          {popularProjects.length > 0 ? (
            popularProjects.slice(0, 5).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent-500 to-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {project.projectType} - {project.region}
                    </div>
                    <div className="text-white/60 text-sm">
                      {project.audience} • {project.investment.toLocaleString()}{" "}
                      ريال
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-white font-semibold">
                    {project.totalVotes}
                  </div>
                  <div className="text-white/60 text-sm">أصوات</div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              <Globe className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>لا توجد بيانات كافية لعرض المشاريع الشائعة</p>
            </div>
          )}
        </div>
      </AnimatedCard>

      {/* شريط التقدم العام */}
      <AnimatedCard className="bg-white/10 backdrop-blur-sm border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white">
            نسبة الموافقة العامة
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-white/80">
            <span>الموافقة</span>
            <span>{stats?.approvalRate || 0}%</span>
          </div>

          <div className="w-full bg-gray-500/20 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-green-500 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${stats?.approvalRate || 0}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="text-green-400 font-bold">
                {stats?.upVotes || 0}
              </div>
              <div className="text-green-300 text-sm">موافقة</div>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
              <div className="text-red-400 font-bold">
                {stats?.downVotes || 0}
              </div>
              <div className="text-red-300 text-sm">رفض</div>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default PlatformStats;
