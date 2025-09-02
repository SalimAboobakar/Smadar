import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Settings,
  Database,
  FileText,
  UserCheck,
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for admin dashboard
  const stats = {
    totalProjects: 156,
    activeUsers: 1247,
    totalVotes: 8934,
    avgApproval: 78.5,
  };

  const projects = [
    {
      id: 1,
      name: "مشروع فندق صلالة",
      status: "نشط",
      votes: 234,
      approval: 85,
    },
    {
      id: 2,
      name: "مطعم المأكولات الشعبية",
      status: "قيد المراجعة",
      votes: 156,
      approval: 72,
    },
    {
      id: 3,
      name: "منتجع شاطئ المغسيل",
      status: "مكتمل",
      votes: 445,
      approval: 91,
    },
    { id: 4, name: "مقهى الثقافة", status: "نشط", votes: 89, approval: 68 },
  ];

  const chartData = {
    projects: {
      labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
      datasets: [
        {
          label: "المشاريع الجديدة",
          data: [12, 19, 3, 5, 2, 3],
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
        },
      ],
    },
    users: {
      labels: ["مستثمرون", "ناخبون", "مديرون"],
      datasets: [
        {
          data: [45, 50, 5],
          backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"],
          borderWidth: 0,
        },
      ],
    },
  };

  const tabs = [
    { id: "overview", name: "نظرة عامة", icon: BarChart3 },
    { id: "projects", name: "المشاريع", icon: Database },
    { id: "users", name: "المستخدمين", icon: Users },
    { id: "reports", name: "التقارير", icon: FileText },
    { id: "settings", name: "الإعدادات", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-sm border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <UserCheck className="w-8 h-8 text-red-400" />
                  </div>
                  لوحة المدير
                </h1>
                <p className="text-white/70">إدارة شاملة لمنصة تدوم</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                تصدير التقرير
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-white/20"
        >
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "إجمالي المشاريع",
              value: stats.totalProjects,
              icon: Database,
              color: "blue",
            },
            {
              title: "المستخدمين النشطين",
              value: stats.activeUsers,
              icon: Users,
              color: "green",
            },
            {
              title: "إجمالي الأصوات",
              value: stats.totalVotes,
              icon: TrendingUp,
              color: "purple",
            },
            {
              title: "متوسط الموافقة",
              value: `${stats.avgApproval}%`,
              icon: Shield,
              color: "yellow",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 border-${stat.color}-500/30 rounded-2xl p-6 border hover:from-${stat.color}-500/30 hover:to-${stat.color}-600/30 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/80 mb-2">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold text-${stat.color}-400`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 bg-${stat.color}-500/20 rounded-full`}>
                  <stat.icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Content based on active tab */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Projects Chart */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                  نمو المشاريع
                </h3>
                <div className="h-64">
                  <Line
                    data={chartData.projects}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { labels: { color: "white" } },
                      },
                      scales: {
                        x: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255,255,255,0.1)" },
                        },
                        y: {
                          ticks: { color: "white" },
                          grid: { color: "rgba(255,255,255,0.1)" },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              {/* Users Distribution */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-400" />
                  توزيع المستخدمين
                </h3>
                <div className="h-64">
                  <Doughnut
                    data={chartData.users}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { labels: { color: "white" } },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Database className="w-6 h-6 text-blue-400" />
                  إدارة المشاريع
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-white/50 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="البحث في المشاريع..."
                      className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    مشروع جديد
                  </motion.button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-right py-4 px-6 text-white/80 font-medium">
                        اسم المشروع
                      </th>
                      <th className="text-right py-4 px-6 text-white/80 font-medium">
                        الحالة
                      </th>
                      <th className="text-right py-4 px-6 text-white/80 font-medium">
                        الأصوات
                      </th>
                      <th className="text-right py-4 px-6 text-white/80 font-medium">
                        نسبة الموافقة
                      </th>
                      <th className="text-right py-4 px-6 text-white/80 font-medium">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-6 text-white font-medium">
                          {project.name}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              project.status === "نشط"
                                ? "bg-green-500/20 text-green-400"
                                : project.status === "قيد المراجعة"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-white">
                          {project.votes}
                        </td>
                        <td className="py-4 px-6 text-white">
                          {project.approval}%
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-blue-400" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-yellow-400" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-400" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-400" />
                إدارة المستخدمين
              </h3>
              <p className="text-white/70">
                قريباً - إدارة المستخدمين والصلاحيات
              </p>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-400" />
                التقارير والإحصائيات
              </h3>
              <p className="text-white/70">
                قريباً - تقارير مفصلة وإحصائيات متقدمة
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-gray-400" />
                إعدادات المنصة
              </h3>
              <p className="text-white/70">قريباً - إعدادات المنصة والتكوين</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
