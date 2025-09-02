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
      { name: "المغسيل", population: 5000, monthlyVisitors: 15000 }
    ],
    totalPopulation: 93000,
    totalMonthlyVisitors: 67000
  },
  mirbat: {
    name: "مرباط",
    population: 15000,
    monthlyVisitors: 8000
  },
  taqah: {
    name: "طاقة",
    population: 12000,
    monthlyVisitors: 5000
  }
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
    defaultOperatingCost: 15000
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
    defaultOperatingCost: 8000
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
    defaultOperatingCost: 5000
  },
  entertainment: {
    name: "أنشطة ترفيهية",
    category: "entertainment",
    visitorWeight: 0.9,
    localWeight: 0.1,
    avgROI: 0.20,
    seasonalityRisk: 0.4,
    permitsRequired: 5,
    avgApprovalDays: 28,
    defaultOperatingCost: 12000
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
    defaultOperatingCost: 6000
  }
};

// الجمهور المستهدف
export const targetAudiences = {
  tourists: {
    name: "السياح",
    weight: 1.0,
    seasonality: 0.8
  },
  locals: {
    name: "السكان المحليون",
    weight: 0.7,
    seasonality: 0.2
  },
  families: {
    name: "العائلات",
    weight: 0.8,
    seasonality: 0.3
  },
  business: {
    name: "رجال الأعمال",
    weight: 0.6,
    seasonality: 0.1
  }
};
