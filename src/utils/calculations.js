import {
  dhofarRegions,
  projectTypes,
  targetAudiences,
} from "../data/dhofarData";

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

// حساب الطلب الموزون مع عوامل واقعية
export const calculateWeightedDemand = (
  region,
  projectType,
  targetAudience
) => {
  const regionData = dhofarRegions[region];
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];

  let population, visitors;

  if (region === "salalah") {
    population = regionData.totalPopulation;
    visitors = regionData.totalMonthlyVisitors;
  } else {
    population = regionData.population;
    visitors = regionData.monthlyVisitors;
  }

  // تطبيق عوامل واقعية للطلب
  const marketSaturationFactor = 0.7; // عامل تشبع السوق
  const purchasingPowerFactor = 0.6; // عامل القوة الشرائية
  const competitionFactor = 0.8; // عامل المنافسة

  const weightedDemand =
    projectData.visitorWeight *
      visitors *
      audienceData.weight *
      marketSaturationFactor +
    projectData.localWeight *
      population *
      audienceData.weight *
      purchasingPowerFactor;

  // تطبيق عامل المنافسة
  const finalDemand = weightedDemand * competitionFactor;

  return Math.round(finalDemand);
};

// حساب معامل الحوكمة مع تعقيدات واقعية
export const calculateGovernanceFactor = (projectType) => {
  const projectData = projectTypes[projectType];

  // إضافة تعقيدات واقعية للحوكمة
  const bureaucraticComplexity = 1.5; // تعقيد بيروقراطي إضافي
  const approvalUncertainty = 0.8; // عدم اليقين في الموافقة

  const governanceFactor =
    1 /
    (projectData.permitsRequired *
      projectData.avgApprovalDays *
      bureaucraticComplexity);
  const realisticFactor = governanceFactor * approvalUncertainty;

  return Math.round(realisticFactor * 1000) / 1000;
};

// حساب مؤشر الجاذبية الاستثمارية (IAI) مع عوامل واقعية
export const calculateIAI = (
  region,
  projectType,
  targetAudience,
  investmentAmount = 100000
) => {
  const demand = calculateWeightedDemand(region, projectType, targetAudience);
  const governance = calculateGovernanceFactor(projectType);
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];

  // تطبيق عوامل واقعية
  const marketRiskFactor = 0.85; // عامل مخاطر السوق
  const economicUncertainty = 0.9; // عدم اليقين الاقتصادي
  const competitionPressure = 0.8; // ضغط المنافسة

  // تطبيع القيم مع عوامل واقعية
  const normalizedDemand = Math.min(demand / 1000, 1) * marketRiskFactor;
  const normalizedROI = projectData.avgROI * economicUncertainty;
  const normalizedGovernance = governance * 100 * competitionPressure;
  const seasonalityFactor =
    (1 - projectData.seasonalityRisk * audienceData.seasonality) * 0.9;

  // الأوزان: الطلب 40%, الحوكمة 20%, العائد 20%, الموسمية 20%
  const IAI =
    0.4 * normalizedDemand +
    0.2 * normalizedGovernance +
    0.2 * normalizedROI +
    0.2 * seasonalityFactor;

  // تطبيق عامل عدم اليقين العام
  const realisticIAI = IAI * 0.85; // تقليل النتيجة بنسبة 15% للواقعية

  return Math.round(realisticIAI * 100);
};

// حساب مؤشر الاستدامة (SS) مع عوامل واقعية
export const calculateSS = (projectType, investmentAmount = 100000) => {
  const projectData = projectTypes[projectType];

  // إضافة عوامل واقعية
  const operationalComplexity = 1.3; // تعقيد تشغيلي
  const marketVolatility = 1.2; // تقلبات السوق
  const regulatoryRisk = 1.1; // مخاطر تنظيمية

  const roi = projectData.avgROI * 0.8; // تقليل العائد المتوقع
  const risk = projectData.seasonalityRisk * marketVolatility;
  const cost =
    (projectData.defaultOperatingCost / investmentAmount) *
    operationalComplexity;
  const hurdles =
    (projectData.permitsRequired *
      projectData.avgApprovalDays *
      regulatoryRisk) /
    365;

  const sustainability = roi / (risk + cost + hurdles);
  const realisticSS = sustainability * 0.9; // تقليل النتيجة للواقعية

  return Math.round(realisticSS * 100) / 100;
};

// الحصول على التوصيات مع تحذيرات
export const getRecommendations = (iai, ss, projectType, region) => {
  const recommendations = [];

  // إضافة تحذير عام
  recommendations.push(getConfidenceWarning());

  if (iai >= 70) {
    // خفضت العتبة من 80 إلى 70
    recommendations.push({
      type: "success",
      message: "مشروع ذو جاذبية استثمارية جيدة (تقديري)",
    });
  } else if (iai >= 50) {
    // خفضت العتبة من 60 إلى 50
    recommendations.push({
      type: "warning",
      message: "مشروع متوسط الجاذبية الاستثمارية (يحتاج دراسة أعمق)",
    });
  } else {
    recommendations.push({
      type: "error",
      message: "مشروع منخفض الجاذبية الاستثمارية (مخاطر عالية)",
    });
  }

  if (ss >= 1.5) {
    // خفضت العتبة من 2 إلى 1.5
    recommendations.push({
      type: "success",
      message: "مشروع مستدام نسبياً على المدى الطويل (تقديري)",
    });
  } else if (ss >= 1) {
    // خفضت العتبة من 1 إلى 0.8
    recommendations.push({
      type: "warning",
      message: "مشروع يحتاج مراجعة شاملة للاستدامة",
    });
  } else {
    recommendations.push({
      type: "error",
      message: "مشروع غير مستدام (مخاطر عالية)",
    });
  }

  // توصيات خاصة بالمنطقة مع تحذيرات
  if (region === "salalah") {
    recommendations.push({
      type: "info",
      message: "ظفار تتمتع بموقع استراتيجي لكن المنافسة عالية",
    });
  }

  // إضافة توصيات عامة
  recommendations.push({
    type: "info",
    message: "يُنصح بإجراء دراسة جدوى مفصلة مع خبراء محليين",
  });

  return recommendations;
};

// الحصول على المخاطر الرئيسية مع تفاصيل أكثر
export const getTopRisks = (projectType, targetAudience) => {
  const projectData = projectTypes[projectType];
  const audienceData = targetAudiences[targetAudience];
  const risks = [];

  // مخاطر عامة
  risks.push({
    name: "عدم ضمان النجاح",
    level: "high",
    description: "جميع التوقعات تقديرية ولا تضمن نجاح المشروع",
  });

  if (projectData.seasonalityRisk > 0.3) {
    risks.push({
      name: "المخاطر الموسمية",
      level: "high",
      description: "تأثر كبير بالموسم السياحي - قد يؤثر على التدفق النقدي",
    });
  }

  if (projectData.permitsRequired > 3) {
    risks.push({
      name: "تعقيد التراخيص",
      level: "medium",
      description: "عدد كبير من التراخيص المطلوبة - قد يؤخر البدء",
    });
  }

  if (audienceData.seasonality > 0.5) {
    risks.push({
      name: "اعتماد على السياحة",
      level: "medium",
      description: "اعتماد كبير على السياح - تقلبات في الطلب",
    });
  }

  // إضافة مخاطر عامة
  risks.push({
    name: "التقلبات الاقتصادية",
    level: "medium",
    description: "تأثر بالظروف الاقتصادية المحلية والعالمية",
  });

  risks.push({
    name: "المنافسة المحلية",
    level: "medium",
    description: "وجود منافسين محليين قد يؤثر على الحصة السوقية",
  });

  return risks;
};

// دالة جديدة لحساب معدل الثقة في التوقعات
export const calculateConfidenceRate = (iai, ss, projectType, region) => {
  const projectData = projectTypes[projectType];
  // حساب معدل الثقة بناءً على عوامل مختلفة
  let confidence = 0.6; // نقطة البداية 60%

  // تقليل الثقة بناءً على تعقيد المشروع
  if (projectData.permitsRequired > 3) confidence -= 0.1;
  if (projectData.seasonalityRisk > 0.4) confidence -= 0.1;

  // تقليل الثقة بناءً على المنطقة
  if (region === "salalah") confidence -= 0.05; // منافسة عالية

  // تقليل الثقة بناءً على النتائج
  if (iai < 60) confidence -= 0.1;
  if (ss < 1.5) confidence -= 0.1;

  return Math.max(confidence, 0.3); // الحد الأدنى 30%
};
