import { dhofarRegions, projectTypes, targetAudiences } from '../data/dhofarData';

// حساب الطلب الموزون
export const calculateWeightedDemand = (region, projectType, targetAudience) => {
  const regionData = dhofarRegions[region];
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  
  let population, visitors;
  
  if (region === 'salalah') {
    // للصلالة، نستخدم متوسط المناطق الفرعية
    population = regionData.totalPopulation;
    visitors = regionData.totalMonthlyVisitors;
  } else {
    population = regionData.population;
    visitors = regionData.monthlyVisitors;
  }
  
  const weightedDemand = 
    (projectData.visitorWeight * visitors * audienceData.weight) +
    (projectData.localWeight * population * audienceData.weight);
    
  return Math.round(weightedDemand);
};

// حساب معامل الحوكمة
export const calculateGovernanceFactor = (projectType) => {
  const projectData = projectTypes[projectType];
  const governanceFactor = 1 / (projectData.permitsRequired * projectData.avgApprovalDays);
  return Math.round(governanceFactor * 1000) / 1000; // 3 خانات عشرية
};

// حساب مؤشر الجاذبية الاستثمارية (IAI)
export const calculateIAI = (region, projectType, targetAudience, investmentAmount = 100000) => {
  const demand = calculateWeightedDemand(region, projectType, targetAudience);
  const governance = calculateGovernanceFactor(projectType);
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  
  // تطبيع القيم
  const normalizedDemand = Math.min(demand / 1000, 1); // تطبيع الطلب
  const normalizedROI = projectData.avgROI;
  const normalizedGovernance = governance * 100; // تحويل إلى نسبة مئوية
  const seasonalityFactor = 1 - (projectData.seasonalityRisk * audienceData.seasonality);
  
  // الأوزان: الطلب 40%, الحوكمة 20%, العائد 20%, الموسمية 20%
  const IAI = (0.4 * normalizedDemand) + 
              (0.2 * normalizedGovernance) + 
              (0.2 * normalizedROI) + 
              (0.2 * seasonalityFactor);
              
  return Math.round(IAI * 100); // تحويل إلى نسبة مئوية
};

// حساب مؤشر الاستدامة (SS)
export const calculateSS = (projectType, investmentAmount = 100000) => {
  const projectData = projectTypes[projectType];
  const roi = projectData.avgROI;
  const risk = projectData.seasonalityRisk;
  const cost = projectData.defaultOperatingCost / investmentAmount;
  const hurdles = (projectData.permitsRequired * projectData.avgApprovalDays) / 365;
  
  const sustainability = roi / (risk + cost + hurdles);
  return Math.round(sustainability * 100) / 100;
};

// الحصول على التوصيات
export const getRecommendations = (iai, ss, projectType, region) => {
  const recommendations = [];
  
  if (iai >= 80) {
    recommendations.push({
      type: "success",
      message: "مشروع عالي الجاذبية الاستثمارية"
    });
  } else if (iai >= 60) {
    recommendations.push({
      type: "warning",
      message: "مشروع متوسط الجاذبية الاستثمارية"
    });
  } else {
    recommendations.push({
      type: "error",
      message: "مشروع منخفض الجاذبية الاستثمارية"
    });
  }
  
  if (ss >= 2) {
    recommendations.push({
      type: "success",
      message: "مشروع مستدام على المدى الطويل"
    });
  } else if (ss >= 1) {
    recommendations.push({
      type: "warning",
      message: "مشروع يحتاج مراجعة للاستدامة"
    });
  } else {
    recommendations.push({
      type: "error",
      message: "مشروع غير مستدام"
    });
  }
  
  // توصيات خاصة بالمنطقة
  if (region === 'salalah') {
    recommendations.push({
      type: "info",
      message: "صلالة تتمتع بموقع استراتيجي وعدد كبير من الزوار"
    });
  }
  
  return recommendations;
};

// الحصول على المخاطر الرئيسية
export const getTopRisks = (projectType, targetAudience) => {
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  const risks = [];
  
  if (projectData.seasonalityRisk > 0.3) {
    risks.push({
      name: "المخاطر الموسمية",
      level: "high",
      description: "تأثر كبير بالموسم السياحي"
    });
  }
  
  if (projectData.permitsRequired > 3) {
    risks.push({
      name: "تعقيد التراخيص",
      level: "medium",
      description: "عدد كبير من التراخيص المطلوبة"
    });
  }
  
  if (audienceData.seasonality > 0.5) {
    risks.push({
      name: "اعتماد على السياحة",
      level: "medium",
      description: "اعتماد كبير على السياح"
    });
  }
  
  return risks;
};
