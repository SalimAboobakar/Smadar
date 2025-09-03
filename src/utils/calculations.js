import {
  dhofarRegions,
  projectTypes,
  targetAudiences,
} from "../data/dhofarData";

// بيانات اقتصادية محسنة لكل منطقة (بناءً على بيانات عُمان الفعلية 2024)
const economicIndicators = {
  salalah: {
    averageHouseholdIncome: 1200, // ريال عماني شهرياً
    averageVisitorIncome: 2500, // ريال عماني شهرياً (متوسط دخل السياح)
    purchasingPowerIndex: 0.85, // مؤشر القوة الشرائية (0-1)
    costOfLivingIndex: 1.15, // معامل تكلفة المعيشة
    unemploymentRate: 0.08, // معدل البطالة
    disposableIncomeRatio: 0.65, // نسبة الدخل المتاح للإنفاق
    economicGrowthRate: 0.035, // معدل النمو الاقتصادي السنوي
    inflationRate: 0.025, // معدل التضخم
    marketMaturity: 0.8, // نضج السوق (0-1)
  },
  mirbat: {
    averageHouseholdIncome: 950,
    averageVisitorIncome: 2200,
    purchasingPowerIndex: 0.72,
    costOfLivingIndex: 0.95,
    unemploymentRate: 0.12,
    disposableIncomeRatio: 0.60,
    economicGrowthRate: 0.025,
    inflationRate: 0.030,
    marketMaturity: 0.6,
  },
  taqah: {
    averageHouseholdIncome: 850,
    averageVisitorIncome: 2000,
    purchasingPowerIndex: 0.68,
    costOfLivingIndex: 0.88,
    unemploymentRate: 0.15,
    disposableIncomeRatio: 0.58,
    economicGrowthRate: 0.020,
    inflationRate: 0.028,
    marketMaturity: 0.5,
  },
};

// نقاط الأسعار لكل نوع مشروع
const projectPricePoints = {
  hotels: 200, // ريال عماني لليلة الواحدة
  restaurants: 25, // ريال عماني للوجبة
  tech: 80, // ريال عماني للخدمة
  tourism: 150, // ريال عماني للنشاط
  retail: 40, // ريال عماني للمنتج
  agriculture: 15, // ريال عماني للمنتج
  logistics: 60, // ريال عماني للخدمة
  manufacturing: 35, // ريال عماني للمنتج
};

// مرونة الطلب بالنسبة للدخل لكل نوع مشروع
const incomeElasticities = {
  hotels: 1.8, // مرونة عالية - سلعة كمالية
  restaurants: 1.2, // مرونة متوسطة
  tech: 0.8, // مرونة منخفضة - حاجة أساسية حديثة
  tourism: 2.0, // مرونة عالية جداً - سلعة كمالية
  retail: 1.0, // مرونة طبيعية
  agriculture: 0.6, // مرونة منخفضة - حاجة أساسية
  logistics: 0.9, // مرونة منخفضة إلى متوسطة
  manufacturing: 0.7, // مرونة منخفضة
};

// تحذير عام حول عدم ضمان النجاح
export const getConfidenceWarning = () => {
  return {
    type: "warning",
    message:
      "⚠️ تحذير مهم: جميع التوقعات والأرقام المعروضة هي تقديرية ولا تضمن نجاح المشروع. يرجى إجراء دراسة جدوى مفصلة قبل اتخاذ أي قرار استثماري.",
    details: [
      "هذه النتائج مبنية على بيانات عامة وقد لا تنطبق على الوضع الفعلي",
      "تتأثر النتائج بالظروف الاقتصادية والسياسية المتغيرة",
      "يُنصح بالاستعانة بخبراء محليين لإجراء دراسة جدوى شاملة",
      "جميع الأرقام المالية هي تقديرية وتحتاج مراجعة دقيقة",
    ],
  };
};

// حساب عامل القوة الشرائية المحسن
export const calculatePurchasingPowerFactor = (region, projectType, targetAudience) => {
  const economics = economicIndicators[region] || economicIndicators.salalah;
  const pricePoint = projectPricePoints[projectType] || 50;
  const elasticity = incomeElasticities[projectType] || 1.0;
  
  // تحديد الجمهور المستهدف ودخله
  let targetIncome, spendingCapacity, pricesensitivity;
  if (targetAudience === 'tourists') {
    targetIncome = economics.averageVisitorIncome;
    spendingCapacity = targetIncome * 0.3; // 30% من دخل السائح للإنفاق اليومي
    pricesensitivity = 0.6; // السياح أقل حساسية للأسعار
  } else if (targetAudience === 'business') {
    targetIncome = economics.averageVisitorIncome * 1.5; // رجال الأعمال دخل أعلى
    spendingCapacity = targetIncome * 0.4;
    pricesensitivity = 0.4; // أقل حساسية للأسعار
  } else {
    targetIncome = economics.averageHouseholdIncome;
    spendingCapacity = targetIncome * economics.disposableIncomeRatio;
    pricesensitivity = 0.8; // السكان المحليون أكثر حساسية للأسعار
  }
  
  // حساب القدرة على تحمل تكاليف المشروع
  const affordabilityRatio = Math.min(spendingCapacity / pricePoint, 5); // حد أقصى 5
  
  // تطبيق مرونة الطلب بالنسبة للدخل
  const demandSensitivity = Math.pow(affordabilityRatio, 1/elasticity);
  
  // تطبيق تأثير معدل البطالة والحساسية للأسعار
  const employmentFactor = 1 - economics.unemploymentRate;
  const priceAcceptance = 1 - (pricesensitivity * 0.5); // تقليل التأثير السلبي للحساسية
  
  // تطبيق تأثير تكلفة المعيشة
  const costOfLivingAdjustment = 1 / economics.costOfLivingIndex;
  
  // النتيجة النهائية (محدودة بين 0-1)
  const rawFactor = demandSensitivity * employmentFactor * priceAcceptance * 
                   economics.purchasingPowerIndex * costOfLivingAdjustment;
  
  return Math.min(Math.max(rawFactor, 0), 1);
};

// حساب الطلب الموزون المحسن مع عوامل واقعية
export const calculateEnhancedWeightedDemand = (region, projectType, targetAudience) => {
  const regionData = dhofarRegions[region] || dhofarRegions.salalah; // fallback to salalah if region not found
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  const economics = economicIndicators[region] || economicIndicators.salalah;

  let population, visitors;
  if (region === "salalah") {
    population = regionData.totalPopulation;
    visitors = regionData.totalMonthlyVisitors;
  } else {
    population = regionData.population;
    visitors = regionData.monthlyVisitors;
  }

  // عوامل واقعية محسنة
  const marketSaturationFactor = 0.7 * economics.marketMaturity; // تشبع السوق مع نضج السوق
  const purchasingPowerFactor = calculatePurchasingPowerFactor(region, projectType, targetAudience);
  const competitionFactor = 0.75 + (economics.marketMaturity * 0.15); // منافسة أقل في الأسواق الناضجة

  // حساب الطلب من الزوار
  const visitorDemand = projectData.visitorWeight * visitors * audienceData.weight * 
                       marketSaturationFactor * purchasingPowerFactor;

  // حساب الطلب من السكان المحليين
  const localDemand = projectData.localWeight * population * audienceData.weight * 
                     purchasingPowerFactor;

  // الطلب الإجمالي مع تطبيق عامل المنافسة
  const totalDemand = (visitorDemand + localDemand) * competitionFactor;

  return Math.round(totalDemand);
};

// حساب معامل الحوكمة المحسن
export const calculateEnhancedGovernanceFactor = (projectType, region) => {
  const projectData = projectTypes[projectType];
  const regionData = dhofarRegions[region] || dhofarRegions.salalah; // fallback to salalah if region not found
  const economics = economicIndicators[region] || economicIndicators.salalah;

  // عوامل التعقيد البيروقراطي (تقل مع نضج السوق)
  const bureaucraticComplexity = 1.5 - (economics.marketMaturity * 0.3);
  const approvalUncertainty = 0.8 + (economics.marketMaturity * 0.15);
  
  // تأثير البنية التحتية على سرعة المعاملات
  const infrastructureBonus = (regionData.investmentData?.infrastructureScore || 7) / 10;

  const baseGovernance = 1 / (projectData.permitsRequired * projectData.avgApprovalDays * bureaucraticComplexity);
  const adjustedGovernance = baseGovernance * approvalUncertainty * infrastructureBonus;

  return Math.round(adjustedGovernance * 1000) / 1000;
};

// حساب مؤشر الجاذبية الاستثمارية المحسن (IAI) - مضمون عدم تجاوز 100%
export const calculateEnhancedIAI = (region, projectType, targetAudience, investmentAmount = 100000) => {
  // 1. حساب المكونات الأساسية
  const demand = calculateEnhancedWeightedDemand(region, projectType, targetAudience);
  const governance = calculateEnhancedGovernanceFactor(projectType, region);
  const purchasingPower = calculatePurchasingPowerFactor(region, projectType, targetAudience);
  
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  const regionData = dhofarRegions[region] || dhofarRegions.salalah; // fallback to salalah if region not found
  const economics = economicIndicators[region] || economicIndicators.salalah;
  
  // 2. تطبيع المكونات (كل مكون بين 0-1) مع حدود واقعية
  
  // أ) مكون الطلب (35%) - أهم عامل
  const maxDemand = 8000; // الحد الأقصى الواقعي للطلب الشهري
  const normalizedDemand = Math.min(demand / maxDemand, 1);
  
  // ب) مكون الحوكمة (15%) - مهم ولكن ليس الأهم
  const maxGovernance = 0.008; // الحد الأقصى الواقعي لعامل الحوكمة
  const normalizedGovernance = Math.min(governance / maxGovernance, 1);
  
  // ج) مكون العائد (25%) - مهم جداً للمستثمرين
  const maxROI = 0.35; // الحد الأقصى الواقعي للعائد (35%)
  const inflationAdjustedROI = projectData.avgROI - economics.inflationRate;
  const normalizedROI = Math.min(Math.max(inflationAdjustedROI / maxROI, 0), 1);
  
  // د) مكون القوة الشرائية (15%) - جديد ومهم
  const normalizedPurchasingPower = purchasingPower;
  
  // هـ) مكون الموسمية (10%) - تأثير محدود
  const seasonalityImpact = projectData.seasonalityRisk * audienceData.seasonality;
  const seasonalityFactor = Math.max(1 - seasonalityImpact, 0.2); // حد أدنى 20%
  const normalizedSeasonality = seasonalityFactor;
  
  // 3. حساب النتيجة المرجحة
  const weightedScore = (
    0.35 * normalizedDemand +
    0.15 * normalizedGovernance +
    0.25 * normalizedROI +
    0.15 * normalizedPurchasingPower +
    0.10 * normalizedSeasonality
  );
  
  // 4. تطبيق عوامل التعديل الواقعية المحسنة
  const realismFactors = {
    marketRisk: 0.80 + (economics.marketMaturity * 0.1), // مخاطر أقل في الأسواق الناضجة
    competition: 0.75 + (economics.marketMaturity * 0.15), // منافسة منظمة في الأسواق الناضجة
    economicUncertainty: 0.85 + (economics.economicGrowthRate * 2), // استقرار أكبر مع النمو
    regionalRisk: (regionData.investmentData?.infrastructureScore || 7) / 10,
    businessEnvironment: 1 - (economics.unemploymentRate * 0.5), // بيئة أعمال أفضل مع انخفاض البطالة
  };
  
  const adjustmentFactor = 
    realismFactors.marketRisk * 
    realismFactors.competition * 
    realismFactors.economicUncertainty * 
    realismFactors.regionalRisk *
    realismFactors.businessEnvironment;
  
  // 5. النتيجة النهائية (مضمونة بين 0-100)
  const preliminaryIAI = weightedScore * adjustmentFactor * 100;
  
  // 6. تطبيق المنحنى التدريجي لضمان التوزيع الطبيعي
  let finalIAI;
  if (preliminaryIAI <= 50) {
    finalIAI = preliminaryIAI * 0.9; // تقليل طفيف للنتائج المنخفضة
  } else if (preliminaryIAI <= 80) {
    finalIAI = 45 + (preliminaryIAI - 50) * 1.1; // تحسين طفيف للنتائج المتوسطة
  } else {
    finalIAI = 78 + (preliminaryIAI - 80) * 0.8; // تقليل للنتائج العالية لمنع المبالغة
  }
  
  // 7. ضمان عدم تجاوز 100% أو النزول تحت 0%
  return Math.max(5, Math.min(95, Math.round(finalIAI))); // نطاق واقعي 5-95%
};

// حساب مؤشر الاستدامة المحسن (SS)
export const calculateEnhancedSS = (projectType, investmentAmount = 100000, region) => {
  const projectData = projectTypes[projectType];
  const economics = economicIndicators[region] || economicIndicators.salalah;
  const regionData = dhofarRegions[region] || dhofarRegions.salalah; // fallback to salalah if region not found
  
  // العائد المعدل حسب الظروف الاقتصادية
  const baseROI = projectData.avgROI;
  const economicGrowthFactor = 1 + economics.economicGrowthRate;
  const inflationAdjustment = 1 - economics.inflationRate;
  const marketMaturityBonus = 1 + (economics.marketMaturity * 0.1);
  const adjustedROI = baseROI * economicGrowthFactor * inflationAdjustment * marketMaturityBonus;
  
  // المخاطر المحسنة والشاملة
  const baseRisk = projectData.seasonalityRisk;
  const marketVolatility = 1.2 - (economics.marketMaturity * 0.2); // تقلبات أقل في الأسواق الناضجة
  const economicRisk = economics.unemploymentRate * 0.5; // تأثير جزئي للبطالة
  const competitionRisk = 0.15 - (economics.marketMaturity * 0.05); // منافسة منظمة أفضل
  const totalRisk = (baseRisk * marketVolatility) + economicRisk + competitionRisk;
  
  // التكاليف المعدلة والدقيقة
  const baseCost = projectData.defaultOperatingCost / investmentAmount;
  const costOfLivingAdjustment = economics.costOfLivingIndex;
  const efficiencyFactor = economics.marketMaturity; // كفاءة أعلى في الأسواق الناضجة
  const adjustedCost = baseCost * costOfLivingAdjustment * (1 - efficiencyFactor * 0.2);
  
  // العوائق التنظيمية المحسنة
  const baseHurdles = (projectData.permitsRequired * projectData.avgApprovalDays) / 365;
  const bureaucracyFactor = 1.1 - (economics.marketMaturity * 0.2); // بيروقراطية أقل
  const infrastructureBonus = (regionData.investmentData?.infrastructureScore || 7) / 10;
  const adjustedHurdles = baseHurdles * bureaucracyFactor * (1 - infrastructureBonus * 0.3);
  
  // حساب الاستدامة
  const denominator = totalRisk + adjustedCost + adjustedHurdles;
  const sustainability = denominator > 0 ? adjustedROI / denominator : 0;
  
  // تطبيق عامل الواقعية المحسن
  const realismFactor = 0.85 + (economics.marketMaturity * 0.1);
  const realisticSS = sustainability * realismFactor;
  
  // ضمان نطاق منطقي (0.1 - 10.0)
  const boundedSS = Math.max(0.1, Math.min(8.0, realisticSS));
  
  return Math.round(boundedSS * 100) / 100;
};

// الحصول على التوصيات المحسنة مع تحذيرات
export const getEnhancedRecommendations = (iai, ss, projectType, region) => {
  const recommendations = [];
  const economics = economicIndicators[region] || economicIndicators.salalah;
  
  // إضافة تحذير عام
  recommendations.push(getConfidenceWarning());
  
  // تقييم IAI مع مراعاة الظروف المحلية
  if (iai >= 75) {
    recommendations.push({
      type: "success",
      message: `مشروع ذو جاذبية استثمارية ممتازة (${iai}%) - فرصة قوية`,
    });
  } else if (iai >= 60) {
    recommendations.push({
      type: "success", 
      message: `مشروع ذو جاذبية استثمارية جيدة (${iai}%) - يستحق الاعتبار`,
    });
  } else if (iai >= 40) {
    recommendations.push({
      type: "warning",
      message: `مشروع متوسط الجاذبية (${iai}%) - يحتاج دراسة أعمق ومراجعة التكاليف`,
    });
  } else {
    recommendations.push({
      type: "error",
      message: `مشروع منخفض الجاذبية (${iai}%) - مخاطر عالية، فكر في بدائل`,
    });
  }
  
  // تقييم SS مع السياق الاقتصادي
  if (ss >= 2.5) {
    recommendations.push({
      type: "success",
      message: `مشروع مستدام ممتاز (${ss}) - استثمار طويل المدى موصى به`,
    });
  } else if (ss >= 1.8) {
    recommendations.push({
      type: "success",
      message: `مشروع مستدام جيد (${ss}) - توقعات إيجابية للمستقبل`,
    });
  } else if (ss >= 1.2) {
    recommendations.push({
      type: "warning", 
      message: `مشروع متوسط الاستدامة (${ss}) - راجع التكاليف التشغيلية`,
    });
  } else {
    recommendations.push({
      type: "error",
      message: `مشروع ضعيف الاستدامة (${ss}) - مخاطر طويلة المدى`,
    });
  }
  
  // توصيات خاصة بالمنطقة والظروف الاقتصادية
  if (region === "salalah") {
    if (economics.marketMaturity > 0.7) {
      recommendations.push({
        type: "info",
        message: "صلالة: سوق ناضج مع منافسة قوية - ركز على التميز والجودة",
      });
    }
  } else {
    recommendations.push({
      type: "info", 
      message: `${region}: سوق نامي مع فرص أكبر - لكن احذر من التحديات اللوجستية`,
    });
  }
  
  // توصيات اقتصادية
  if (economics.unemploymentRate > 0.1) {
    recommendations.push({
      type: "warning",
      message: "معدل بطالة مرتفع في المنطقة - قد يؤثر على الطلب المحلي",
    });
  }
  
  if (economics.inflationRate > 0.03) {
    recommendations.push({
      type: "warning", 
      message: "معدل تضخم مرتفع - راجع استراتيجية التسعير بانتظام",
    });
  }
  
  return recommendations;
};

// الحصول على المخاطر المحسنة
export const getEnhancedTopRisks = (projectType, targetAudience, region) => {
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  const economics = economicIndicators[region] || economicIndicators.salalah;
  const risks = [];

  // مخاطر عامة
  risks.push({
    name: "عدم ضمان النجاح",
    level: "high",
    description: "جميع التوقعات تقديرية ولا تضمن نجاح المشروع",
  });

  // مخاطر اقتصادية حسب المنطقة
  if (economics.unemploymentRate > 0.1) {
    risks.push({
      name: "ضعف القوة الشرائية",
      level: "high", 
      description: `معدل بطالة مرتفع (${(economics.unemploymentRate * 100).toFixed(1)}%) قد يقلل الطلب المحلي`,
    });
  }
  
  if (economics.inflationRate > 0.025) {
    risks.push({
      name: "التضخم والتكاليف",
      level: "medium",
      description: `معدل تضخم (${(economics.inflationRate * 100).toFixed(1)}%) قد يرفع التكاليف التشغيلية`,
    });
  }

  // مخاطر موسمية محسنة
  if (projectData.seasonalityRisk > 0.3) {
    const seasonalImpact = projectData.seasonalityRisk * audienceData.seasonality;
    risks.push({
      name: "المخاطر الموسمية",
      level: seasonalImpact > 0.4 ? "high" : "medium",
      description: `تقلبات موسمية قوية (${(seasonalImpact * 100).toFixed(1)}%) - خطط للتدفق النقدي`,
    });
  }

  // مخاطر تنظيمية
  if (projectData.permitsRequired > 3) {
    risks.push({
      name: "تعقيد التراخيص", 
      level: "medium",
      description: `${projectData.permitsRequired} تراخيص مطلوبة - قد يؤخر البدء ${projectData.avgApprovalDays} يوم`,
    });
  }

  // مخاطر السوق
  if (economics.marketMaturity < 0.6) {
    risks.push({
      name: "عدم نضج السوق",
      level: "medium",
      description: "السوق ما زال في طور النمو - تقلبات وعدم قابلية للتنبؤ",
    });
  }

  return risks.slice(0, 6); // أهم 6 مخاطر
};

// حساب معدل الثقة المحسن
export const calculateEnhancedConfidenceRate = (iai, ss, projectType, region) => {
  const projectData = projectTypes[projectType];
  const economics = economicIndicators[region] || economicIndicators.salalah;
  
  // نقطة البداية 65%
  let confidence = 0.65;
  
  // تأثير نضج السوق إيجابياً
  confidence += economics.marketMaturity * 0.15;
  
  // تأثير البنية التحتية
  const regionData = dhofarRegions[region] || dhofarRegions.salalah; // fallback to salalah if region not found
  const infraScore = regionData.investmentData?.infrastructureScore || 7;
  confidence += (infraScore - 7) * 0.02;
  
  // تأثير المؤشرات الاقتصادية
  confidence -= economics.unemploymentRate * 0.5;
  confidence -= economics.inflationRate * 2;
  confidence += economics.economicGrowthRate * 3;
  
  // تأثير تعقيد المشروع
  if (projectData.permitsRequired > 3) confidence -= 0.08;
  if (projectData.seasonalityRisk > 0.4) confidence -= 0.06;
  
  // تأثير النتائج
  if (iai > 70) confidence += 0.1;
  else if (iai < 40) confidence -= 0.15;
  
  if (ss > 2.0) confidence += 0.08;
  else if (ss < 1.2) confidence -= 0.12;
  
  // النطاق النهائي 25%-90%
  return Math.max(0.25, Math.min(0.90, confidence));
};

// دالة الخلفية للتوافق
export const calculateIAI = calculateEnhancedIAI;
export const calculateSS = calculateEnhancedSS;
export const calculateWeightedDemand = calculateEnhancedWeightedDemand;
export const calculateGovernanceFactor = calculateEnhancedGovernanceFactor;
export const getRecommendations = getEnhancedRecommendations;
export const getTopRisks = getEnhancedTopRisks;
export const calculateConfidenceRate = calculateEnhancedConfidenceRate;
