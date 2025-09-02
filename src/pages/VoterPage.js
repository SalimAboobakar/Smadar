import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Vote,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Share2,
  Eye,
  TrendingUp,
  Users,
  Filter,
  Search,
  ArrowLeft,
  MessageCircle,
  Clock,
  MapPin,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const VoterPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [userVotes, setUserVotes] = useState({});

  // Mock data for projects
  useEffect(() => {
    const mockProjects = [
      {
        id: 1,
        name: "مشروع فندق صلالة الفاخر",
        description: "فندق 5 نجوم على شاطئ صلالة مع إطلالة رائعة على البحر",
        type: "فنادق ومنتجعات",
        region: "صلالة",
        investment: 5000000,
        votes: { up: 234, down: 45, total: 279 },
        approval: 84,
        status: "نشط",
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
        details: {
          expectedROI: 18,
          timeline: "24 شهر",
          jobs: 150,
          sustainability: 0.8,
        },
      },
      {
        id: 2,
        name: "مطعم المأكولات الشعبية",
        description: "مطعم متخصص في المأكولات العمانية التقليدية",
        type: "مطاعم ومقاهي",
        region: "صلالة",
        investment: 800000,
        votes: { up: 156, down: 23, total: 179 },
        approval: 87,
        status: "قيد المراجعة",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
        details: {
          expectedROI: 15,
          timeline: "12 شهر",
          jobs: 25,
          sustainability: 0.7,
        },
      },
      {
        id: 3,
        name: "منتجع شاطئ المغسيل",
        description: "منتجع سياحي على شاطئ المغسيل مع أنشطة مائية",
        type: "أنشطة ترفيهية",
        region: "صلالة",
        investment: 3000000,
        votes: { up: 445, down: 67, total: 512 },
        approval: 87,
        status: "نشط",
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
        details: {
          expectedROI: 20,
          timeline: "18 شهر",
          jobs: 80,
          sustainability: 0.9,
        },
      },
      {
        id: 4,
        name: "مقهى الثقافة والفنون",
        description: "مقهى يجمع بين الثقافة والفنون مع مساحة للعروض",
        type: "مطاعم ومقاهي",
        region: "صلالة",
        investment: 600000,
        votes: { up: 89, down: 34, total: 123 },
        approval: 72,
        status: "نشط",
        image:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
        details: {
          expectedROI: 12,
          timeline: "10 شهر",
          jobs: 15,
          sustainability: 0.6,
        },
      },
    ];
    setProjects(mockProjects);
  }, []);

  const handleVote = (projectId, voteType) => {
    setUserVotes((prev) => ({
      ...prev,
      [projectId]: voteType,
    }));

    // Update project votes (in real app, this would be an API call)
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId) {
          const newVotes = { ...project.votes };
          if (voteType === "up") {
            newVotes.up += 1;
          } else {
            newVotes.down += 1;
          }
          newVotes.total += 1;
          return {
            ...project,
            votes: newVotes,
            approval: Math.round((newVotes.up / newVotes.total) * 100),
          };
        }
        return project;
      })
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || project.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const projectTypes = [
    "all",
    "فنادق ومنتجعات",
    "مطاعم ومقاهي",
    "أنشطة ترفيهية",
    "تجارة وتجزئة",
  ];

  const overallStats = {
    totalProjects: projects.length,
    totalVotes: projects.reduce((sum, project) => sum + project.votes.total, 0),
    avgApproval: Math.round(
      projects.reduce((sum, project) => sum + project.approval, 0) /
        projects.length
    ),
    activeProjects: projects.filter((p) => p.status === "نشط").length,
  };

  const chartData = {
    projectTypes: {
      labels: [
        "فنادق ومنتجعات",
        "مطاعم ومقاهي",
        "أنشطة ترفيهية",
        "تجارة وتجزئة",
      ],
      datasets: [
        {
          data: [2, 2, 1, 0],
          backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"],
          borderWidth: 0,
        },
      ],
    },
    approvalRates: {
      labels: projects.map((p) => p.name),
      datasets: [
        {
          label: "نسبة الموافقة",
          data: projects.map((p) => p.approval),
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderRadius: 8,
        },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
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
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Vote className="w-8 h-8 text-green-400" />
                  </div>
                  صفحة الناخب
                </h1>
                <p className="text-white/70">
                  شارك برأيك في المشاريع الاستثمارية
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-white/70">إجمالي الأصوات</p>
                <p className="text-2xl font-bold text-green-400">
                  {overallStats.totalVotes}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            {
              title: "إجمالي المشاريع",
              value: overallStats.totalProjects,
              icon: BarChart3,
              color: "blue",
            },
            {
              title: "إجمالي الأصوات",
              value: overallStats.totalVotes,
              icon: Vote,
              color: "green",
            },
            {
              title: "متوسط الموافقة",
              value: `${overallStats.avgApproval}%`,
              icon: TrendingUp,
              color: "accent",
            },
            {
              title: "المشاريع النشطة",
              value: overallStats.activeProjects,
              icon: Users,
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

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-white/50 absolute right-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="البحث في المشاريع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/70" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "جميع الأنواع" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary-500/20 to-accent-600/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🏢</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      project.status === "نشط"
                        ? "bg-green-500/20 text-green-400"
                        : project.status === "قيد المراجعة"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-primary-500/20 text-blue-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{project.region}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">
                      {(project.investment / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{project.details.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      {project.details.jobs} وظيفة
                    </span>
                  </div>
                </div>

                {/* Voting Stats */}
                <div className="bg-white/5 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/80 text-sm">نسبة الموافقة</span>
                    <span className="text-2xl font-bold text-green-400">
                      {project.approval}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{project.votes.up} موافقة</span>
                    <span>{project.votes.down} رفض</span>
                    <span>{project.votes.total} إجمالي</span>
                  </div>
                </div>

                {/* Voting Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(project.id, "up")}
                    disabled={userVotes[project.id]}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      userVotes[project.id] === "up"
                        ? "bg-green-500 text-white"
                        : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    }`}
                  >
                    <ThumbsUp className="w-5 h-5" />
                    مهتم
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(project.id, "down")}
                    disabled={userVotes[project.id]}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      userVotes[project.id] === "down"
                        ? "bg-red-500 text-white"
                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    }`}
                  >
                    <ThumbsDown className="w-5 h-5" />
                    غير مهتم
                  </motion.button>
                </div>

                {/* Additional Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-red-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Share2 className="w-5 h-5 text-blue-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 text-accent-400" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">تفاصيل</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              توزيع أنواع المشاريع
            </h3>
            <div className="h-64">
              <Doughnut
                data={chartData.projectTypes}
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

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              نسب الموافقة
            </h3>
            <div className="h-64">
              <Bar
                data={chartData.approvalRates}
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
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedProject.name}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-white/70">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">
                      تفاصيل الاستثمار
                    </h4>
                    <div className="space-y-2 text-white/70 text-sm">
                      <div>
                        المبلغ:{" "}
                        {(selectedProject.investment / 1000000).toFixed(1)}{" "}
                        مليون ريال
                      </div>
                      <div>
                        العائد المتوقع: {selectedProject.details.expectedROI}%
                      </div>
                      <div>المدة: {selectedProject.details.timeline}</div>
                      <div>الوظائف: {selectedProject.details.jobs}</div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-semibold mb-2">
                      الإحصائيات
                    </h4>
                    <div className="space-y-2 text-white/70 text-sm">
                      <div>نسبة الموافقة: {selectedProject.approval}%</div>
                      <div>إجمالي الأصوات: {selectedProject.votes.total}</div>
                      <div>الموافقات: {selectedProject.votes.up}</div>
                      <div>الرفض: {selectedProject.votes.down}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoterPage;
