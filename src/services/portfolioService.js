// خدمة إدارة المحفظة الاستثمارية
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

// إضافة استثمار جديد للمحفظة
export const addInvestmentToPortfolio = async (userId, investment) => {
  try {
    const investmentId = `${userId}_${Date.now()}`;
    const investmentData = {
      ...investment,
      id: investmentId,
      userId,
      dateAdded: new Date().toISOString(),
      status: "active", // active, paused, completed, cancelled
      totalValue: investment.initialAmount,
      currentROI: 0,
      lastUpdated: new Date().toISOString(),
    };

    await setDoc(doc(db, "portfolios", investmentId), investmentData);
    console.log("تم إضافة الاستثمار إلى المحفظة بنجاح");
    return { success: true, investmentId };
  } catch (error) {
    console.error("خطأ في إضافة الاستثمار:", error);
    return { success: false, error: error.message };
  }
};

// جلب محفظة المستثمر
export const getUserPortfolio = async (userId) => {
  try {
    const q = query(
      collection(db, "portfolios"),
      where("userId", "==", userId),
      orderBy("dateAdded", "desc")
    );

    const querySnapshot = await getDocs(q);
    const portfolio = [];

    querySnapshot.forEach((doc) => {
      portfolio.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, portfolio };
  } catch (error) {
    console.error("خطأ في جلب المحفظة:", error);
    return { success: false, error: error.message, portfolio: [] };
  }
};

// تحديث استثمار في المحفظة
export const updateInvestment = async (investmentId, updates) => {
  try {
    const investmentRef = doc(db, "portfolios", investmentId);
    const updateData = {
      ...updates,
      lastUpdated: new Date().toISOString(),
    };

    await updateDoc(investmentRef, updateData);
    console.log("تم تحديث الاستثمار بنجاح");
    return { success: true };
  } catch (error) {
    console.error("خطأ في تحديث الاستثمار:", error);
    return { success: false, error: error.message };
  }
};

// حذف استثمار من المحفظة
export const removeInvestment = async (investmentId) => {
  try {
    await deleteDoc(doc(db, "portfolios", investmentId));
    console.log("تم حذف الاستثمار من المحفظة");
    return { success: true };
  } catch (error) {
    console.error("خطأ في حذف الاستثمار:", error);
    return { success: false, error: error.message };
  }
};

// حساب إحصائيات المحفظة
export const calculatePortfolioStats = (portfolio) => {
  if (!portfolio || portfolio.length === 0) {
    return {
      totalInvestments: 0,
      totalValue: 0,
      totalROI: 0,
      averageROI: 0,
      activeInvestments: 0,
      bestPerforming: null,
      worstPerforming: null,
      sectorDistribution: {},
      riskDistribution: { low: 0, medium: 0, high: 0 },
    };
  }

  const totalInvestments = portfolio.length;
  const activeInvestments = portfolio.filter(
    (inv) => inv.status === "active"
  ).length;
  const totalValue = portfolio.reduce(
    (sum, inv) => sum + (inv.totalValue || inv.initialAmount),
    0
  );
  const totalInitialAmount = portfolio.reduce(
    (sum, inv) => sum + inv.initialAmount,
    0
  );
  const totalROI =
    totalInitialAmount > 0
      ? ((totalValue - totalInitialAmount) / totalInitialAmount) * 100
      : 0;
  const averageROI =
    portfolio.length > 0
      ? portfolio.reduce((sum, inv) => sum + (inv.currentROI || 0), 0) /
        portfolio.length
      : 0;

  // أفضل وأسوأ أداء
  const sortedByROI = [...portfolio].sort(
    (a, b) => (b.currentROI || 0) - (a.currentROI || 0)
  );
  const bestPerforming = sortedByROI[0] || null;
  const worstPerforming = sortedByROI[sortedByROI.length - 1] || null;

  // توزيع القطاعات
  const sectorDistribution = portfolio.reduce((acc, inv) => {
    const sector = inv.sector || "غير محدد";
    acc[sector] = (acc[sector] || 0) + 1;
    return acc;
  }, {});

  // توزيع المخاطر
  const riskDistribution = portfolio.reduce(
    (acc, inv) => {
      const risk = inv.riskLevel || "medium";
      if (risk.includes("منخفض") || risk.includes("low")) acc.low++;
      else if (risk.includes("عالي") || risk.includes("high")) acc.high++;
      else acc.medium++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  return {
    totalInvestments,
    totalValue,
    totalROI,
    averageROI,
    activeInvestments,
    bestPerforming,
    worstPerforming,
    sectorDistribution,
    riskDistribution,
  };
};

// إضافة تقرير أداء شهري
export const addPerformanceReport = async (investmentId, report) => {
  try {
    const reportId = `${investmentId}_${Date.now()}`;
    const reportData = {
      ...report,
      id: reportId,
      investmentId,
      date: new Date().toISOString(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    };

    await setDoc(doc(db, "performanceReports", reportId), reportData);

    // تحديث الاستثمار بآخر أداء
    await updateInvestment(investmentId, {
      currentROI: report.roi,
      totalValue: report.currentValue,
      lastReportDate: new Date().toISOString(),
    });

    console.log("تم إضافة تقرير الأداء بنجاح");
    return { success: true, reportId };
  } catch (error) {
    console.error("خطأ في إضافة تقرير الأداء:", error);
    return { success: false, error: error.message };
  }
};

// جلب تقارير الأداء لاستثمار معين
export const getPerformanceReports = async (investmentId) => {
  try {
    const q = query(
      collection(db, "performanceReports"),
      where("investmentId", "==", investmentId),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const reports = [];

    querySnapshot.forEach((doc) => {
      reports.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, reports };
  } catch (error) {
    console.error("خطأ في جلب تقارير الأداء:", error);
    return { success: false, error: error.message, reports: [] };
  }
};

// بيانات تجريبية للمحفظة (لأغراض العرض)
export const getDemoPortfolio = () => {
  return [
    {
      id: "demo_1",
      name: "مصنع تعبئة الأسماك",
      sector: "الثروة السمكية",
      initialAmount: 200000,
      totalValue: 235000,
      currentROI: 17.5,
      riskLevel: "متوسط",
      status: "active",
      dateAdded: "2024-01-15",
      expectedROI: { min: 20, max: 35 },
      timeline: "3-5 سنوات",
      region: "صلالة",
    },
    {
      id: "demo_2",
      name: "مزرعة فواكه عضوية",
      sector: "الزراعة",
      initialAmount: 150000,
      totalValue: 168000,
      currentROI: 12,
      riskLevel: "منخفض إلى متوسط",
      status: "active",
      dateAdded: "2024-02-20",
      expectedROI: { min: 15, max: 25 },
      timeline: "4-6 سنوات",
      region: "صلالة",
    },
    {
      id: "demo_3",
      name: "شقق فندقية صغيرة",
      sector: "السياحة",
      initialAmount: 300000,
      totalValue: 390000,
      currentROI: 30,
      riskLevel: "متوسط",
      status: "active",
      dateAdded: "2023-12-10",
      expectedROI: { min: 30, max: 50 },
      timeline: "2-4 سنوات",
      region: "صلالة",
    },
    {
      id: "demo_4",
      name: "شركة شاحنات تبريد",
      sector: "النقل واللوجستيات",
      initialAmount: 400000,
      totalValue: 372000,
      currentROI: -7,
      riskLevel: "متوسط",
      status: "active",
      dateAdded: "2024-03-05",
      expectedROI: { min: 18, max: 28 },
      timeline: "3-5 سنوات",
      region: "صلالة",
    },
    {
      id: "demo_5",
      name: "مصنع عصائر طبيعية",
      sector: "الصناعة التحويلية",
      initialAmount: 180000,
      totalValue: 198000,
      currentROI: 10,
      riskLevel: "منخفض إلى متوسط",
      status: "active",
      dateAdded: "2024-01-28",
      expectedROI: { min: 20, max: 30 },
      timeline: "3-4 سنوات",
      region: "صلالة",
    },
  ];
};

export default {
  addInvestmentToPortfolio,
  getUserPortfolio,
  updateInvestment,
  removeInvestment,
  calculatePortfolioStats,
  addPerformanceReport,
  getPerformanceReports,
  getDemoPortfolio,
};
