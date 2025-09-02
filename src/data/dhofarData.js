// بيانات محافظة ظفار والمناطق
export const dhofarRegions = {
  salalah: {
    name: "صلالة",
    subRegions: [
      { name: "صحلنوت", population: 15000, monthlyVisitors: 8000 },
      { name: "السعادة", population: 12000, monthlyVisitors: 5000 },
      { name: "الدهاريز", population: 18000, monthlyVisitors: 12000 },
      { name: "اتين", population: 10000, monthlyVisitors: 3000 },
      { name: "صلالة المركز", population: 25000, monthlyVisitors: 20000 },
      { name: "عوقد", population: 8000, monthlyVisitors: 4000 },
      { name: "المغسيل", population: 5000, monthlyVisitors: 15000 },
    ],
    totalPopulation: 93000,
    totalMonthlyVisitors: 67000,
    // بيانات إضافية للاستثمار
    investmentData: {
      totalMarketValue: 142500000, // 142.5 مليون ريال عماني
      averageVisitorSpending: 150, // 150 ريال عماني
      peakSeason: "يونيو - سبتمبر",
      infrastructureScore: 8.5, // من 10
      accessibilityScore: 9.0, // من 10
    },
  },
  mirbat: {
    name: "مرباط",
    population: 15000,
    monthlyVisitors: 8000,
    investmentData: {
      totalMarketValue: 12000000, // 12 مليون ريال عماني
      averageVisitorSpending: 120, // 120 ريال عماني
      peakSeason: "يونيو - سبتمبر",
      infrastructureScore: 7.0,
      accessibilityScore: 7.5,
    },
  },
  taqah: {
    name: "طاقة",
    population: 12000,
    monthlyVisitors: 5000,
    investmentData: {
      totalMarketValue: 7500000, // 7.5 مليون ريال عماني
      averageVisitorSpending: 100, // 100 ريال عماني
      peakSeason: "يونيو - سبتمبر",
      infrastructureScore: 6.5,
      accessibilityScore: 7.0,
    },
  },
};

// أنواع المشاريع مع الأوزان
export const projectTypes = {
  hotels: {
    name: "فنادق ومنتجعات",
    category: "hospitality",
    visitorWeight: 0.8,
    localWeight: 0.2,
    avgROI: 0.18,
    seasonalityRisk: 0.3,
    permitsRequired: 4,
    avgApprovalDays: 21,
    defaultOperatingCost: 15000,
    // بيانات إضافية للاستثمار
    investmentData: {
      capitalRange: { min: 250000, max: 400000 },
      expectedROI: { min: 0.3, max: 0.5 },
      seasonalRevenue: { min: 120000, max: 200000 },
      paybackPeriod: "2-4 سنوات",
      riskLevel: "متوسط",
    },
  },
  restaurants: {
    name: "مطاعم ومقاهي",
    category: "food",
    visitorWeight: 0.6,
    localWeight: 0.4,
    avgROI: 0.15,
    seasonalityRisk: 0.2,
    permitsRequired: 3,
    avgApprovalDays: 14,
    defaultOperatingCost: 8000,
    investmentData: {
      capitalRange: { min: 50000, max: 150000 },
      expectedROI: { min: 0.15, max: 0.25 },
      seasonalRevenue: { min: 30000, max: 80000 },
      paybackPeriod: "3-5 سنوات",
      riskLevel: "منخفض إلى متوسط",
    },
  },
  tech: {
    name: "شركات تقنية",
    category: "technology",
    visitorWeight: 0.1,
    localWeight: 0.9,
    avgROI: 0.25,
    seasonalityRisk: 0.1,
    permitsRequired: 2,
    avgApprovalDays: 7,
    defaultOperatingCost: 5000,
    investmentData: {
      capitalRange: { min: 30000, max: 100000 },
      expectedROI: { min: 0.25, max: 0.4 },
      seasonalRevenue: { min: 20000, max: 60000 },
      paybackPeriod: "2-3 سنوات",
      riskLevel: "متوسط إلى عالي",
    },
  },
  entertainment: {
    name: "أنشطة ترفيهية",
    category: "entertainment",
    visitorWeight: 0.9,
    localWeight: 0.1,
    avgROI: 0.2,
    seasonalityRisk: 0.4,
    permitsRequired: 5,
    avgApprovalDays: 28,
    defaultOperatingCost: 12000,
    investmentData: {
      capitalRange: { min: 100000, max: 300000 },
      expectedROI: { min: 0.2, max: 0.35 },
      seasonalRevenue: { min: 80000, max: 150000 },
      paybackPeriod: "3-6 سنوات",
      riskLevel: "متوسط إلى عالي",
    },
  },
  retail: {
    name: "تجارة وتجزئة",
    category: "retail",
    visitorWeight: 0.4,
    localWeight: 0.6,
    avgROI: 0.12,
    seasonalityRisk: 0.15,
    permitsRequired: 2,
    avgApprovalDays: 10,
    defaultOperatingCost: 6000,
    investmentData: {
      capitalRange: { min: 40000, max: 120000 },
      expectedROI: { min: 0.12, max: 0.2 },
      seasonalRevenue: { min: 25000, max: 60000 },
      paybackPeriod: "4-6 سنوات",
      riskLevel: "منخفض",
    },
  },
  // إضافة أنواع مشاريع جديدة
  fisheries: {
    name: "قطاع الثروة السمكية",
    category: "fisheries",
    visitorWeight: 0.2,
    localWeight: 0.8,
    avgROI: 0.28,
    seasonalityRisk: 0.2,
    permitsRequired: 4,
    avgApprovalDays: 21,
    defaultOperatingCost: 20000,
    investmentData: {
      capitalRange: { min: 150000, max: 250000 },
      expectedROI: { min: 0.2, max: 0.35 },
      seasonalRevenue: { min: 100000, max: 180000 },
      paybackPeriod: "3-5 سنوات",
      riskLevel: "متوسط",
    },
  },
  agriculture: {
    name: "قطاع الزراعة",
    category: "agriculture",
    visitorWeight: 0.3,
    localWeight: 0.7,
    avgROI: 0.2,
    seasonalityRisk: 0.3,
    permitsRequired: 3,
    avgApprovalDays: 14,
    defaultOperatingCost: 10000,
    investmentData: {
      capitalRange: { min: 100000, max: 180000 },
      expectedROI: { min: 0.15, max: 0.25 },
      seasonalRevenue: { min: 60000, max: 120000 },
      paybackPeriod: "4-6 سنوات",
      riskLevel: "منخفض إلى متوسط",
    },
  },
  logistics: {
    name: "النقل والخدمات اللوجستية",
    category: "logistics",
    visitorWeight: 0.1,
    localWeight: 0.9,
    avgROI: 0.23,
    seasonalityRisk: 0.1,
    permitsRequired: 4,
    avgApprovalDays: 21,
    defaultOperatingCost: 25000,
    investmentData: {
      capitalRange: { min: 300000, max: 500000 },
      expectedROI: { min: 0.18, max: 0.28 },
      seasonalRevenue: { min: 150000, max: 250000 },
      paybackPeriod: "3-5 سنوات",
      riskLevel: "متوسط",
    },
  },
  manufacturing: {
    name: "الصناعة التحويلية",
    category: "manufacturing",
    visitorWeight: 0.1,
    localWeight: 0.9,
    avgROI: 0.25,
    seasonalityRisk: 0.1,
    permitsRequired: 3,
    avgApprovalDays: 14,
    defaultOperatingCost: 15000,
    investmentData: {
      capitalRange: { min: 120000, max: 200000 },
      expectedROI: { min: 0.2, max: 0.3 },
      seasonalRevenue: { min: 80000, max: 140000 },
      paybackPeriod: "3-4 سنوات",
      riskLevel: "منخفض إلى متوسط",
    },
  },
};

// الجمهور المستهدف
export const targetAudiences = {
  tourists: {
    name: "السياح",
    weight: 1.0,
    seasonality: 0.8,
  },
  locals: {
    name: "السكان المحليون",
    weight: 0.7,
    seasonality: 0.2,
  },
  families: {
    name: "العائلات",
    weight: 0.8,
    seasonality: 0.3,
  },
  business: {
    name: "رجال الأعمال",
    weight: 0.6,
    seasonality: 0.1,
  },
};
