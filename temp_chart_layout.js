// Enhanced chart layout for better spacing and organization

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="analytics-grid dashboard-section"
>
  <AnimatedCard className="enhanced-metric-card widget-container">
    <div className="section-header">
      <h3 className="section-title text-white flex items-center gap-3">
        <div className="p-2 bg-primary-500/20 rounded-lg">
          <BarChart3 className="w-6 h-6 text-accent-400" />
        </div>
        تحليل الطلب
      </h3>
    </div>

    <div className="chart-wrapper">
      <Doughnut
        data={demandChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "white",
                font: { size: 14 },
                padding: 20,
              },
            },
          },
        }}
      />
    </div>
  </AnimatedCard>

  <AnimatedCard className="enhanced-metric-card widget-container">
    <div className="section-header">
      <h3 className="section-title text-white flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </div>
        توزيع المخاطر
      </h3>
    </div>

    <div className="chart-wrapper">
      <Bar
        data={riskChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          scales: {
            x: {
              ticks: { color: "white", font: { size: 12 } },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              ticks: { color: "white", font: { size: 12 } },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
        }}
      />
    </div>
  </AnimatedCard>
</motion.div>;
