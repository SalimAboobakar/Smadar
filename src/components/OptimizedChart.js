import React, { memo, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import LoadingSpinner from "./ui/LoadingSpinner";

// مكون Tooltip محسن
const CustomTooltip = memo(({ active, payload, label, formatter }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 shadow-lg">
      {label && (
        <p className="text-white font-semibold mb-2 text-right">{label}</p>
      )}
      {payload.map((entry, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-3 text-right"
        >
          <span className="text-white/80 text-sm">
            {formatter ? formatter(entry.value, entry.name) : entry.value}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">{entry.name}</span>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

// مكون الرسم البياني المحسن
const OptimizedChart = memo(
  ({
    type = "line",
    data = [],
    width = "100%",
    height = 300,
    colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"],
    loading = false,
    error = null,
    config = {},
    onDataPointClick,
    animationDuration = 1500,
    className = "",
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    // تحسين البيانات والألوان
    const optimizedData = useMemo(() => {
      if (!Array.isArray(data) || data.length === 0) return [];

      return data.map((item) => ({
        ...item,
        // تحويل القيم النصية إلى أرقام إذا أمكن
        ...Object.keys(item).reduce((acc, key) => {
          if (
            typeof item[key] === "string" &&
            !isNaN(item[key]) &&
            item[key] !== ""
          ) {
            acc[key] = parseFloat(item[key]);
          } else {
            acc[key] = item[key];
          }
          return acc;
        }, {}),
      }));
    }, [data]);

    const gradientColors = useMemo(() => {
      return colors.map((color, index) => ({
        id: `gradient${index}`,
        color: color,
        lightColor: `${color}40`,
      }));
    }, [colors]);

    // معالج النقر على نقطة البيانات
    const handleDataPointClick = (data, index) => {
      if (onDataPointClick) {
        onDataPointClick(data, index);
      }
    };

    // إعدادات مشتركة للرسوم البيانية
    const commonProps = {
      data: optimizedData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
      ...config,
    };

    // عرض حالة التحميل
    if (loading) {
      return (
        <div
          className={`flex items-center justify-center h-${height} ${className}`}
        >
          <LoadingSpinner />
        </div>
      );
    }

    // عرض حالة الخطأ
    if (error) {
      return (
        <div
          className={`flex items-center justify-center h-${height} ${className}`}
        >
          <div className="text-red-400 text-center">
            <p className="text-lg font-semibold mb-2">
              حدث خطأ في تحميل الرسم البياني
            </p>
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </div>
      );
    }

    // عرض حالة عدم وجود بيانات
    if (!optimizedData.length) {
      return (
        <div
          className={`flex items-center justify-center h-${height} ${className}`}
        >
          <div className="text-gray-400 text-center">
            <p className="text-lg font-semibold">لا توجد بيانات للعرض</p>
            <p className="text-sm">يرجى التحقق من مصدر البيانات</p>
          </div>
        </div>
      );
    }

    const renderChart = () => {
      switch (type) {
        case "line":
          return (
            <LineChart {...commonProps}>
              <defs>
                {gradientColors.map((grad) => (
                  <linearGradient
                    key={grad.id}
                    id={grad.id}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={grad.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={grad.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                fontSize={12}
                tick={{ textAnchor: "end" }}
              />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {Object.keys(optimizedData[0] || {})
                .filter(
                  (key) =>
                    key !== "name" && typeof optimizedData[0][key] === "number"
                )
                .slice(0, colors.length)
                .map((key, index) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={colors[index]}
                    strokeWidth={2}
                    dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: colors[index], strokeWidth: 2 }}
                    animationDuration={animationDuration}
                    onClick={handleDataPointClick}
                  />
                ))}
            </LineChart>
          );

        case "area":
          return (
            <AreaChart {...commonProps}>
              <defs>
                {gradientColors.map((grad) => (
                  <linearGradient
                    key={grad.id}
                    id={grad.id}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={grad.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={grad.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {Object.keys(optimizedData[0] || {})
                .filter(
                  (key) =>
                    key !== "name" && typeof optimizedData[0][key] === "number"
                )
                .slice(0, colors.length)
                .map((key, index) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stackId="1"
                    stroke={colors[index]}
                    fill={`url(#gradient${index})`}
                    animationDuration={animationDuration}
                  />
                ))}
            </AreaChart>
          );

        case "bar":
          return (
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {Object.keys(optimizedData[0] || {})
                .filter(
                  (key) =>
                    key !== "name" && typeof optimizedData[0][key] === "number"
                )
                .slice(0, colors.length)
                .map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={colors[index]}
                    animationDuration={animationDuration}
                    onClick={handleDataPointClick}
                  />
                ))}
            </BarChart>
          );

        case "pie":
          const pieData = Object.keys(optimizedData[0] || {})
            .filter(
              (key) =>
                key !== "name" && typeof optimizedData[0][key] === "number"
            )
            .map((key, index) => ({
              name: key,
              value: optimizedData.reduce(
                (sum, item) => sum + (item[key] || 0),
                0
              ),
              fill: colors[index % colors.length],
            }));

          return (
            <PieChart {...commonProps}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={40}
                paddingAngle={2}
                dataKey="value"
                animationDuration={animationDuration}
                onClick={handleDataPointClick}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          );

        default:
          return (
            <div className="text-red-400">نوع الرسم البياني غير مدعوم</div>
          );
      }
    };

    return (
      <motion.div
        className={`w-full ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          filter: isHovered ? "brightness(1.1)" : "brightness(1)",
          transition: "filter 0.3s ease",
        }}
      >
        <ResponsiveContainer width={width} height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>
    );
  }
);

OptimizedChart.displayName = "OptimizedChart";

export default OptimizedChart;
