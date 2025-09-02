import { getAllInvestmentOpportunities } from "../data/investmentOpportunities";
import { calculatePortfolioStats } from "./portfolioService";

// AI Investment Advisor Service
// Provides intelligent analysis and recommendations based on portfolio and market data

export const analyzePortfolio = (portfolio, marketData = {}) => {
  const stats = calculatePortfolioStats(portfolio);
  const analysis = {
    overallScore: 0,
    riskScore: 0,
    diversificationScore: 0,
    performanceScore: 0,
    insights: [],
    recommendations: [],
    warnings: [],
    opportunities: []
  };

  // Calculate Overall Investment Score (0-100)
  analysis.overallScore = calculateOverallScore(stats, portfolio);
  
  // Calculate Risk Assessment
  analysis.riskScore = calculateRiskScore(stats, portfolio);
  
  // Calculate Diversification Score
  analysis.diversificationScore = calculateDiversificationScore(stats);
  
  // Calculate Performance Score
  analysis.performanceScore = calculatePerformanceScore(stats);
  
  // Generate AI Insights
  analysis.insights = generateInsights(stats, portfolio);
  
  // Generate Recommendations
  analysis.recommendations = generateRecommendations(stats, portfolio);
  
  // Generate Warnings
  analysis.warnings = generateWarnings(stats, portfolio);
  
  // Find Market Opportunities
  analysis.opportunities = findMarketOpportunities(portfolio, stats);

  return analysis;
};

// Calculate Overall Investment Score
const calculateOverallScore = (stats, portfolio) => {
  if (!stats || stats.totalInvestments === 0) return 0;
  
  let score = 50; // Base score
  
  // Performance factor (30%)
  if (stats.averageROI > 15) score += 15;
  else if (stats.averageROI > 10) score += 10;
  else if (stats.averageROI > 5) score += 5;
  else if (stats.averageROI < 0) score -= 10;
  
  // Diversification factor (25%)
  const sectorCount = Object.keys(stats.sectorDistribution).length;
  if (sectorCount >= 4) score += 12;
  else if (sectorCount >= 3) score += 8;
  else if (sectorCount >= 2) score += 4;
  else score -= 5;
  
  // Risk balance factor (20%)
  const { low, medium, high } = stats.riskDistribution;
  const total = low + medium + high;
  if (total > 0) {
    const balanceScore = 1 - Math.abs((low + medium * 0.5) / total - 0.7);
    score += balanceScore * 10;
  }
  
  // Portfolio size factor (15%)
  if (stats.totalValue > 100000) score += 7;
  else if (stats.totalValue > 50000) score += 5;
  else if (stats.totalValue > 20000) score += 3;
  
  // Active investments factor (10%)
  const activeRatio = stats.activeInvestments / stats.totalInvestments;
  score += activeRatio * 5;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Calculate Risk Score
const calculateRiskScore = (stats, portfolio) => {
  if (!stats || stats.totalInvestments === 0) return 50;
  
  const { low, medium, high } = stats.riskDistribution;
  const total = low + medium + high;
  
  if (total === 0) return 50;
  
  // Higher percentage of high-risk = higher risk score
  const riskScore = ((high * 100) + (medium * 50) + (low * 10)) / total;
  return Math.round(riskScore);
};

// Calculate Diversification Score
const calculateDiversificationScore = (stats) => {
  if (!stats || stats.totalInvestments === 0) return 0;
  
  const sectorCount = Object.keys(stats.sectorDistribution).length;
  const maxSectors = 6; // Assume 6 available sectors
  
  let score = (sectorCount / maxSectors) * 70; // Base diversification
  
  // Check sector concentration
  const sectors = Object.values(stats.sectorDistribution);
  const maxConcentration = Math.max(...sectors) / stats.totalInvestments;
  
  if (maxConcentration < 0.3) score += 20; // Well distributed
  else if (maxConcentration < 0.5) score += 10; // Moderately distributed
  else score -= 15; // Too concentrated
  
  // Bonus for having at least one investment in each major sector
  if (sectorCount >= 4) score += 10;
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Calculate Performance Score
const calculatePerformanceScore = (stats) => {
  if (!stats || stats.totalInvestments === 0) return 0;
  
  let score = 50; // Base score
  
  // ROI performance
  if (stats.averageROI > 20) score += 30;
  else if (stats.averageROI > 15) score += 25;
  else if (stats.averageROI > 10) score += 15;
  else if (stats.averageROI > 5) score += 10;
  else if (stats.averageROI > 0) score += 5;
  else score -= 20;
  
  // Total ROI vs initial investment
  if (stats.totalROI > 25) score += 15;
  else if (stats.totalROI > 15) score += 10;
  else if (stats.totalROI > 5) score += 5;
  else if (stats.totalROI < -5) score -= 15;
  
  // Best vs worst performing spread (indicates good selection)
  if (stats.bestPerforming && stats.worstPerforming) {
    const spread = (stats.bestPerforming.currentROI || 0) - (stats.worstPerforming.currentROI || 0);
    if (spread > 20) score += 5; // Good range indicates careful selection
  }
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Generate AI Insights
const generateInsights = (stats, portfolio) => {
  const insights = [];
  
  if (stats.totalInvestments === 0) {
    insights.push({
      type: "info",
      title: "ابدأ رحلتك الاستثمارية",
      message: "لم تقم بأي استثمارات بعد. ابدأ بفرص استثمارية منخفضة المخاطر.",
      icon: "💡"
    });
    return insights;
  }
  
  // Performance insights
  if (stats.averageROI > 15) {
    insights.push({
      type: "success",
      title: "أداء استثماري ممتاز",
      message: `متوسط العائد ${stats.averageROI.toFixed(1)}% يفوق التوقعات بشكل كبير.`,
      icon: "🎯"
    });
  } else if (stats.averageROI < 5) {
    insights.push({
      type: "warning",
      title: "أداء استثماري ضعيف",
      message: `متوسط العائد ${stats.averageROI.toFixed(1)}% أقل من المتوقع. راجع استراتيجيتك.`,
      icon: "⚠️"
    });
  }
  
  // Diversification insights
  const sectorCount = Object.keys(stats.sectorDistribution).length;
  if (sectorCount <= 2) {
    insights.push({
      type: "warning",
      title: "تنويع محدود",
      message: `استثماراتك موزعة على ${sectorCount} قطاعات فقط. زيادة التنويع تقلل المخاطر.`,
      icon: "📊"
    });
  } else if (sectorCount >= 5) {
    insights.push({
      type: "success",
      title: "تنويع ممتاز",
      message: `محفظتك موزعة على ${sectorCount} قطاعات مختلفة، مما يوفر حماية جيدة من المخاطر.`,
      icon: "🛡️"
    });
  }
  
  // Risk insights
  const { low, medium, high } = stats.riskDistribution;
  const total = low + medium + high;
  if (total > 0) {
    const highRiskPercent = (high / total) * 100;
    if (highRiskPercent > 60) {
      insights.push({
        type: "danger",
        title: "مخاطر عالية",
        message: `${highRiskPercent.toFixed(1)}% من استثماراتك عالية المخاطر. فكر في إعادة التوازن.`,
        icon: "🚨"
      });
    } else if (highRiskPercent < 20 && medium + low > 0) {
      insights.push({
        type: "info",
        title: "استثمار محافظ",
        message: "محفظتك محافظة. فكر في إضافة بعض الاستثمارات عالية النمو.",
        icon: "🔒"
      });
    }
  }
  
  // Best performing insight
  if (stats.bestPerforming && stats.bestPerforming.currentROI > 20) {
    insights.push({
      type: "success",
      title: "استثمار نجم",
      message: `${stats.bestPerforming.name} يحقق عائد ${stats.bestPerforming.currentROI}% - استثمار متميز!`,
      icon: "⭐"
    });
  }
  
  return insights;
};

// Generate Recommendations
const generateRecommendations = (stats, portfolio) => {
  const recommendations = [];
  
  if (stats.totalInvestments === 0) {
    recommendations.push({
      priority: "high",
      title: "ابدأ بالأساسيات",
      description: "ابدأ بالاستثمار في قطاع السياحة أو الزراعة - قطاعات مستقرة في ظفار.",
      action: "استكشف الفرص الاستثمارية",
      category: "portfolio_start"
    });
    return recommendations;
  }
  
  // Diversification recommendations
  const sectorCount = Object.keys(stats.sectorDistribution).length;
  if (sectorCount < 3) {
    recommendations.push({
      priority: "high",
      title: "زيادة التنويع",
      description: "أضف استثمارات في قطاعات جديدة لتقليل المخاطر وزيادة الفرص.",
      action: "تصفح القطاعات المتاحة",
      category: "diversification"
    });
  }
  
  // Risk balance recommendations
  const { low, medium, high } = stats.riskDistribution;
  const total = low + medium + high;
  if (total > 0) {
    const highRiskPercent = (high / total) * 100;
    if (highRiskPercent > 70) {
      recommendations.push({
        priority: "medium",
        title: "إعادة توازن المخاطر",
        description: "فكر في إضافة استثمارات منخفضة المخاطر لتحقيق توازن أفضل.",
        action: "اعرض الاستثمارات المحافظة",
        category: "risk_balance"
      });
    } else if (highRiskPercent < 15) {
      recommendations.push({
        priority: "low",
        title: "فرص نمو",
        description: "يمكنك إضافة بعض الاستثمارات عالية النمو لزيادة العوائد المحتملة.",
        action: "اعرض فرص النمو",
        category: "growth_opportunities"
      });
    }
  }
  
  // Performance improvement recommendations
  if (stats.averageROI < 8) {
    recommendations.push({
      priority: "high",
      title: "تحسين الأداء",
      description: "ابحث عن استثمارات بعوائد أعلى أو أعد تقييم الاستثمارات الحالية.",
      action: "تحليل الأداء التفصيلي",
      category: "performance"
    });
  }
  
  // Size recommendations
  if (stats.totalValue < 20000) {
    recommendations.push({
      priority: "medium",
      title: "توسيع المحفظة",
      description: "زيادة حجم محفظتك يوفر فرص أكبر للنمو والتنويع.",
      action: "خطط لزيادة الاستثمارات",
      category: "portfolio_size"
    });
  }
  
  return recommendations;
};

// Generate Warnings
const generateWarnings = (stats, portfolio) => {
  const warnings = [];
  
  if (stats.totalInvestments === 0) return warnings;
  
  // High risk concentration warning
  const { high } = stats.riskDistribution;
  const total = stats.riskDistribution.low + stats.riskDistribution.medium + high;
  if (total > 0 && (high / total) > 0.8) {
    warnings.push({
      severity: "high",
      title: "تركز مخاطر عالي",
      message: "أكثر من 80% من استثماراتك عالية المخاطر",
      recommendation: "أعد توزيع المحفظة لتقليل المخاطر",
      icon: "🚨"
    });
  }
  
  // Sector concentration warning
  const sectors = Object.values(stats.sectorDistribution);
  const maxSectorConcentration = Math.max(...sectors) / stats.totalInvestments;
  if (maxSectorConcentration > 0.7) {
    const dominantSector = Object.keys(stats.sectorDistribution).find(
      sector => stats.sectorDistribution[sector] === Math.max(...sectors)
    );
    warnings.push({
      severity: "medium",
      title: "تركز قطاعي",
      message: `70% من استثماراتك في قطاع ${dominantSector}`,
      recommendation: "نوع استثماراتك عبر قطاعات مختلفة",
      icon: "⚠️"
    });
  }
  
  // Poor performance warning
  if (stats.averageROI < 0) {
    warnings.push({
      severity: "high",
      title: "خسائر في المحفظة",
      message: `متوسط العائد سالب ${Math.abs(stats.averageROI).toFixed(1)}%`,
      recommendation: "راجع استراتيجيتك الاستثمارية فوراً",
      icon: "📉"
    });
  }
  
  // Inactive investments warning
  const inactiveRatio = (stats.totalInvestments - stats.activeInvestments) / stats.totalInvestments;
  if (inactiveRatio > 0.3) {
    warnings.push({
      severity: "medium",
      title: "استثمارات غير نشطة",
      message: `${(inactiveRatio * 100).toFixed(1)}% من استثماراتك غير نشطة`,
      recommendation: "راجع الاستثمارات المتوقفة وفكر في بدائل",
      icon: "⏸️"
    });
  }
  
  return warnings;
};

// Find Market Opportunities
const findMarketOpportunities = (portfolio, stats) => {
  const opportunities = [];
  const allOpportunities = getAllInvestmentOpportunities();
  
  if (!allOpportunities || Object.keys(allOpportunities).length === 0) {
    return opportunities;
  }
  
  // Get user's preferred sectors (sectors they've invested in)
  const userSectors = Object.keys(stats.sectorDistribution || {});
  
  // Get sectors user hasn't invested in
  const allSectors = Object.keys(allOpportunities);
  const newSectors = allSectors.filter(sector => !userSectors.includes(sector));
  
  // Recommend opportunities in new sectors for diversification
  newSectors.slice(0, 2).forEach(sector => {
    const sectorOpportunities = allOpportunities[sector];
    if (sectorOpportunities && sectorOpportunities.length > 0) {
      const bestOpportunity = sectorOpportunities.reduce((best, current) => 
        (current.expectedROI > best.expectedROI) ? current : best
      );
      
      opportunities.push({
        type: "diversification",
        sector: sector,
        opportunity: bestOpportunity,
        reason: `تنويع محفظتك في قطاع ${sector}`,
        expectedROI: bestOpportunity.expectedROI,
        riskLevel: bestOpportunity.riskLevel,
        priority: "medium"
      });
    }
  });
  
  // Recommend high-performing opportunities in user's preferred sectors
  userSectors.forEach(sector => {
    const sectorOpportunities = allOpportunities[sector];
    if (sectorOpportunities && sectorOpportunities.length > 0) {
      const highROIOpportunities = sectorOpportunities.filter(opp => opp.expectedROI > 15);
      if (highROIOpportunities.length > 0) {
        const bestOpportunity = highROIOpportunities[0];
        opportunities.push({
          type: "growth",
          sector: sector,
          opportunity: bestOpportunity,
          reason: `فرصة عالية العائد في قطاعك المفضل`,
          expectedROI: bestOpportunity.expectedROI,
          riskLevel: bestOpportunity.riskLevel,
          priority: "high"
        });
      }
    }
  });
  
  // Recommend low-risk opportunities if portfolio is too risky
  const { high } = stats.riskDistribution;
  const total = stats.riskDistribution.low + stats.riskDistribution.medium + high;
  if (total > 0 && (high / total) > 0.6) {
    allSectors.forEach(sector => {
      const sectorOpportunities = allOpportunities[sector];
      if (sectorOpportunities && sectorOpportunities.length > 0) {
        const lowRiskOpportunities = sectorOpportunities.filter(opp => 
          opp.riskLevel && (opp.riskLevel.includes('منخفض') || opp.riskLevel.includes('low'))
        );
        if (lowRiskOpportunities.length > 0 && opportunities.length < 5) {
          opportunities.push({
            type: "risk_reduction",
            sector: sector,
            opportunity: lowRiskOpportunities[0],
            reason: "تقليل مخاطر المحفظة",
            expectedROI: lowRiskOpportunities[0].expectedROI,
            riskLevel: lowRiskOpportunities[0].riskLevel,
            priority: "high"
          });
        }
      }
    });
  }
  
  return opportunities.slice(0, 4); // Limit to 4 opportunities
};

// Get Market Sentiment Analysis
export const getMarketSentiment = () => {
  return {
    overall: "متفائل",
    score: 75,
    trend: "صاعد",
    factors: [
      "نمو قطاع السياحة في ظفار",
      "زيادة الاستثمار في التكنولوجيا",
      "دعم حكومي للمشاريع الصغيرة"
    ],
    risks: [
      "تقلبات أسعار النفط العالمية",
      "التغيرات المناخية"
    ]
  };
};

// Generate Investment Score Badge
export const getInvestmentScoreBadge = (score) => {
  if (score >= 85) return { level: "ممتاز", color: "green", icon: "🏆" };
  if (score >= 70) return { level: "جيد جداً", color: "accent", icon: "⭐" };
  if (score >= 55) return { level: "جيد", color: "yellow", icon: "👍" };
  if (score >= 40) return { level: "مقبول", color: "orange", icon: "⚡" };
  return { level: "يحتاج تحسين", color: "red", icon: "📈" };
};

// Quick Portfolio Health Check
export const getPortfolioHealthCheck = (portfolio) => {
  const analysis = analyzePortfolio(portfolio);
  
  return {
    score: analysis.overallScore,
    badge: getInvestmentScoreBadge(analysis.overallScore),
    quickInsights: analysis.insights.slice(0, 2),
    topRecommendation: analysis.recommendations[0] || null,
    urgentWarning: analysis.warnings.find(w => w.severity === "high") || null
  };
};

export default {
  analyzePortfolio,
  getMarketSentiment,
  getInvestmentScoreBadge,
  getPortfolioHealthCheck
};
