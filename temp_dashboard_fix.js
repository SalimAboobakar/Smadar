// Enhanced metric cards structure for InvestorDashboard
// Replace the existing metric cards with this optimized structure

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="grid-metrics dashboard-section"
>
  <div className="tooltip-wrapper">
    <MathTooltip
      equation={getEquationData("iai").equation}
      title={getEquationData("iai").title}
      description={getEquationData("iai").description}
      variables={getEquationData("iai").variables}
    >
      <AnimatedCard className="enhanced-metric-card metric-card widget-container">
        <div className="metric-card-content">
          <div className="p-3 bg-primary-500/20 rounded-full mb-4">
            <TrendingUp className="w-8 h-8 text-primary-400" />
          </div>
          <div className="metric-value text-white">
            {results?.iai ? `${Math.round(results.iai)}%` : "0%"}
          </div>
          <div className="metric-label text-white/80">
            مؤشر الجاذبية الاستثمارية
          </div>
          <div className="metric-trend text-primary-400">
            <span className="text-xs">IAI</span>
          </div>
        </div>
      </AnimatedCard>
    </MathTooltip>
  </div>

  <div className="tooltip-wrapper">
    <MathTooltip
      equation={getEquationData("ss").equation}
      title={getEquationData("ss").title}
      description={getEquationData("ss").description}
      variables={getEquationData("ss").variables}
    >
      <AnimatedCard className="enhanced-metric-card metric-card widget-container">
        <div className="metric-card-content">
          <div className="p-3 bg-green-500/20 rounded-full mb-4">
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <div className="metric-value text-white">
            {results?.ss ? results.ss.toFixed(1) : "0.0"}
          </div>
          <div className="metric-label text-white/80">مؤشر الاستدامة</div>
          <div className="metric-trend text-green-400">
            <span className="text-xs">SS</span>
          </div>
        </div>
      </AnimatedCard>
    </MathTooltip>
  </div>

  <div className="tooltip-wrapper">
    <MathTooltip
      equation={getEquationData("confidence").equation}
      title={getEquationData("confidence").title}
      description={getEquationData("confidence").description}
      variables={getEquationData("confidence").variables}
    >
      <AnimatedCard className="enhanced-metric-card metric-card widget-container">
        <div className="metric-card-content">
          <div className="p-3 bg-blue-500/20 rounded-full mb-4">
            <Target className="w-8 h-8 text-blue-400" />
          </div>
          <div className="metric-value text-white">
            {results?.confidence ? `${Math.round(results.confidence)}%` : "0%"}
          </div>
          <div className="metric-label text-white/80">معدل الثقة</div>
          <div className="metric-trend text-blue-400">
            <span className="text-xs">Confidence</span>
          </div>
        </div>
      </AnimatedCard>
    </MathTooltip>
  </div>

  <AnimatedCard className="enhanced-metric-card metric-card widget-container">
    <div className="metric-card-content">
      <div className="p-3 bg-yellow-500/20 rounded-full mb-4">
        <Users className="w-8 h-8 text-yellow-400" />
      </div>
      <div className="metric-value text-white">
        {results?.demand ? Math.round(results.demand) : "0"}
      </div>
      <div className="metric-label text-white/80">الطلب المتوقع</div>
      <div className="metric-trend text-yellow-400">
        <span className="text-xs">يومياً</span>
      </div>
    </div>
  </AnimatedCard>
</motion.div>;
