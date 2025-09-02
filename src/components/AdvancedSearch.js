import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Calendar,
  MapPin,
  Building,
  DollarSign,
  SlidersHorizontal,
} from "lucide-react";

const AdvancedSearch = ({
  data = [],
  onResults = () => {},
  placeholder = "البحث في البيانات...",
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [filters, setFilters] = useState({
    sector: "",
    region: "",
    minInvestment: "",
    maxInvestment: "",
    dateRange: "",
    sortBy: "relevance",
  });

  // خيارات الفلترة
  const sectors = [
    "السياحة",
    "الثروة السمكية",
    "الزراعة",
    "النقل واللوجستيات",
    "الصناعة والمنطقة الحرة",
  ];

  const regions = ["صلالة الكبرى", "مرباط", "طاقة", "المناطق الأخرى"];

  const sortOptions = [
    { value: "relevance", label: "الأكثر صلة" },
    { value: "date", label: "التاريخ" },
    { value: "investment", label: "قيمة الاستثمار" },
    { value: "name", label: "الاسم" },
  ];

  // البحث والفلترة
  const filteredResults = useMemo(() => {
    let results = data;

    // البحث النصي
    if (searchQuery.trim()) {
      results = results.filter((item) => {
        const searchFields = [
          item.name,
          item.title,
          item.description,
          item.sector,
          item.region,
          item.type,
        ].filter(Boolean);

        return searchFields.some((field) =>
          field.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // فلترة حسب القطاع
    if (filters.sector) {
      results = results.filter(
        (item) => item.sector === filters.sector || item.type === filters.sector
      );
    }

    // فلترة حسب المنطقة
    if (filters.region) {
      results = results.filter((item) => item.region === filters.region);
    }

    // فلترة حسب قيمة الاستثمار
    if (filters.minInvestment) {
      results = results.filter(
        (item) =>
          (item.investment || item.value || 0) >=
          parseInt(filters.minInvestment)
      );
    }

    if (filters.maxInvestment) {
      results = results.filter(
        (item) =>
          (item.investment || item.value || 0) <=
          parseInt(filters.maxInvestment)
      );
    }

    // ترتيب النتائج
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return (
            new Date(b.date || b.timestamp || 0) -
            new Date(a.date || a.timestamp || 0)
          );
        case "investment":
          return (
            (b.investment || b.value || 0) - (a.investment || a.value || 0)
          );
        case "name":
          return (a.name || a.title || "").localeCompare(
            b.name || b.title || ""
          );
        default:
          return 0;
      }
    });

    return results;
  }, [data, searchQuery, filters]);

  // تحديث النتائج
  React.useEffect(() => {
    onResults(filteredResults);
  }, [filteredResults, onResults]);

  const clearFilters = () => {
    setFilters({
      sector: "",
      region: "",
      minInvestment: "",
      maxInvestment: "",
      dateRange: "",
      sortBy: "relevance",
    });
    setSearchQuery("");
  };

  const activeFiltersCount =
    Object.values(filters).filter((value) => value && value !== "relevance")
      .length + (searchQuery ? 1 : 0);

  return (
    <div className={`w-full ${className}`}>
      {/* شريط البحث الرئيسي */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* زر الفلترة المتقدمة */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className={`absolute left-2 top-2 p-2 rounded-lg transition-all duration-300 ${
            isAdvancedOpen
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
          }`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </motion.button>
      </div>

      {/* الفلترة المتقدمة */}
      <AnimatePresence>
        {isAdvancedOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* صف الفلاتر الأول */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* فلتر القطاع */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    القطاع
                  </label>
                  <select
                    value={filters.sector}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sector: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع القطاعات</option>
                    {sectors.map((sector) => (
                      <option
                        key={sector}
                        value={sector}
                        className="bg-gray-800"
                      >
                        {sector}
                      </option>
                    ))}
                  </select>
                </div>

                {/* فلتر المنطقة */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    المنطقة
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        region: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">جميع المناطق</option>
                    {regions.map((region) => (
                      <option
                        key={region}
                        value={region}
                        className="bg-gray-800"
                      >
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* صف الفلاتر الثاني */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* الحد الأدنى للاستثمار */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    الحد الأدنى (ريال)
                  </label>
                  <input
                    type="number"
                    value={filters.minInvestment}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minInvestment: e.target.value,
                      }))
                    }
                    placeholder="0"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* الحد الأقصى للاستثمار */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <DollarSign className="w-4 h-4 inline mr-2" />
                    الحد الأقصى (ريال)
                  </label>
                  <input
                    type="number"
                    value={filters.maxInvestment}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxInvestment: e.target.value,
                      }))
                    }
                    placeholder="∞"
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* ترتيب النتائج */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    <Filter className="w-4 h-4 inline mr-2" />
                    ترتيب حسب
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-gray-800"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* أزرار التحكم */}
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-white/60 text-sm">
                  {filteredResults.length} نتيجة من أصل {data.length}
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    مسح الكل
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAdvancedOpen(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    تطبيق
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
