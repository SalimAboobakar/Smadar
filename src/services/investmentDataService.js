import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import {
  investmentOpportunities,
  requiredLicenses,
} from "../data/investmentOpportunities";

// إعدادات التطبيق
const APP_CONFIG = {
  useFirebase: true,
  fallbackToLocalStorage: true,
};

// دالة مساعدة للتحقق من إمكانية استخدام Firebase
const canUseFirebase = () => {
  return APP_CONFIG.useFirebase && db;
};

// خدمة رفع بيانات الفرص الاستثمارية إلى Firebase
export const uploadInvestmentDataToFirebase = async () => {
  try {
    if (!canUseFirebase()) {
      console.warn("Firebase غير متاح، سيتم استخدام البيانات المحلية");
      return false;
    }

    console.log("بدء رفع بيانات الفرص الاستثمارية إلى Firebase...");

    // رفع بيانات الفرص الاستثمارية
    const opportunitiesRef = collection(db, "investmentOpportunities");

    for (const [sectorId, sectorData] of Object.entries(
      investmentOpportunities
    )) {
      try {
        // إنشاء وثيقة للقطاع
        const sectorDocRef = doc(opportunitiesRef, sectorId);
        await setDoc(sectorDocRef, {
          ...sectorData,
          uploadedAt: serverTimestamp(),
          version: "1.0",
        });

        console.log(`تم رفع بيانات قطاع ${sectorData.name} بنجاح`);
      } catch (error) {
        console.error(`خطأ في رفع بيانات قطاع ${sectorData.name}:`, error);
      }
    }

    // رفع بيانات التراخيص المطلوبة
    const licensesRef = collection(db, "requiredLicenses");

    for (const [licenseId, licenseData] of Object.entries(requiredLicenses)) {
      try {
        const licenseDocRef = doc(licensesRef, licenseId);
        await setDoc(licenseDocRef, {
          ...licenseData,
          uploadedAt: serverTimestamp(),
          version: "1.0",
        });

        console.log(`تم رفع بيانات ترخيص ${licenseData.name} بنجاح`);
      } catch (error) {
        console.error(`خطأ في رفع بيانات ترخيص ${licenseData.name}:`, error);
      }
    }

    console.log("تم رفع جميع بيانات الفرص الاستثمارية إلى Firebase بنجاح");
    return true;
  } catch (error) {
    console.error("خطأ في رفع البيانات إلى Firebase:", error);
    return false;
  }
};

// خدمة جلب بيانات الفرص الاستثمارية من Firebase
export const getInvestmentOpportunitiesFromFirebase = async () => {
  try {
    if (!canUseFirebase()) {
      console.warn("Firebase غير متاح، سيتم استخدام البيانات المحلية");
      return investmentOpportunities;
    }

    const opportunitiesRef = collection(db, "investmentOpportunities");
    const querySnapshot = await getDocs(opportunitiesRef);

    const firebaseData = {};
    querySnapshot.forEach((doc) => {
      firebaseData[doc.id] = {
        id: doc.id,
        ...doc.data(),
        source: "firebase",
      };
    });

    console.log(
      "تم جلب بيانات الفرص الاستثمارية من Firebase:",
      Object.keys(firebaseData).length,
      "قطاع"
    );
    return firebaseData;
  } catch (error) {
    console.warn(
      "فشل في جلب البيانات من Firebase، سيتم استخدام البيانات المحلية:",
      error
    );
    return investmentOpportunities;
  }
};

// خدمة جلب بيانات التراخيص من Firebase
export const getRequiredLicensesFromFirebase = async () => {
  try {
    if (!canUseFirebase()) {
      console.warn("Firebase غير متاح، سيتم استخدام البيانات المحلية");
      return requiredLicenses;
    }

    const licensesRef = collection(db, "requiredLicenses");
    const querySnapshot = await getDocs(licensesRef);

    const firebaseData = {};
    querySnapshot.forEach((doc) => {
      firebaseData[doc.id] = {
        id: doc.id,
        ...doc.data(),
        source: "firebase",
      };
    });

    console.log(
      "تم جلب بيانات التراخيص من Firebase:",
      Object.keys(firebaseData).length,
      "ترخيص"
    );
    return firebaseData;
  } catch (error) {
    console.warn(
      "فشل في جلب بيانات التراخيص من Firebase، سيتم استخدام البيانات المحلية:",
      error
    );
    return requiredLicenses;
  }
};

// خدمة حفظ تحليل فرصة استثمارية
export const saveInvestmentAnalysis = async (opportunityId, analysisData) => {
  try {
    if (canUseFirebase()) {
      const analysisRef = collection(db, "investmentAnalyses");
      const docRef = await addDoc(analysisRef, {
        opportunityId: opportunityId,
        analysisType: analysisData.analysisType,
        marketAnalysis: analysisData.marketAnalysis,
        financialProjections: analysisData.financialProjections,
        riskAssessment: analysisData.riskAssessment,
        recommendations: analysisData.recommendations,
        geminiAnalysis: analysisData.geminiAnalysis || null,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      console.log(
        "تم حفظ تحليل الفرصة الاستثمارية في Firebase بنجاح:",
        docRef.id
      );
      return docRef.id;
    }
  } catch (error) {
    console.warn("فشل في حفظ تحليل الفرصة الاستثمارية في Firebase:", error);
  }

  // استخدام localStorage كبديل
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localAnalysisData = {
        id: `local_investment_analysis_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        opportunityId: opportunityId,
        analysisType: analysisData.analysisType,
        marketAnalysis: analysisData.marketAnalysis,
        financialProjections: analysisData.financialProjections,
        riskAssessment: analysisData.riskAssessment,
        recommendations: analysisData.recommendations,
        geminiAnalysis: analysisData.geminiAnalysis || null,
        timestamp: new Date().toISOString(),
        source: "localStorage",
      };

      const existingAnalyses = JSON.parse(
        localStorage.getItem("investmentAnalyses") || "[]"
      );
      existingAnalyses.push(localAnalysisData);
      localStorage.setItem(
        "investmentAnalyses",
        JSON.stringify(existingAnalyses)
      );

      console.log(
        "تم حفظ تحليل الفرصة الاستثمارية في localStorage بنجاح:",
        localAnalysisData.id
      );
      return localAnalysisData.id;
    } catch (localError) {
      console.error(
        "فشل في حفظ تحليل الفرصة الاستثمارية في localStorage:",
        localError
      );
    }
  }

  return null;
};

// خدمة جلب التحليلات السابقة لفرصة استثمارية
export const getInvestmentAnalyses = async (opportunityId) => {
  let firebaseAnalyses = [];
  let localAnalyses = [];

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const analysisRef = collection(db, "investmentAnalyses");
      const q = query(
        analysisRef,
        where("opportunityId", "==", opportunityId),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        firebaseAnalyses.push({
          id: doc.id,
          ...doc.data(),
          source: "firebase",
        });
      });

      console.log(
        "تم جلب تحليلات الفرصة الاستثمارية من Firebase:",
        firebaseAnalyses.length,
        "تحليل"
      );
    } catch (error) {
      console.warn("فشل في جلب تحليلات الفرصة الاستثمارية من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localAnalysesData = JSON.parse(
        localStorage.getItem("investmentAnalyses") || "[]"
      );
      localAnalyses = localAnalysesData
        .filter((analysis) => analysis.opportunityId === opportunityId)
        .slice(0, 10)
        .map((analysis) => ({
          ...analysis,
          source: "localStorage",
        }));

      console.log(
        "تم جلب تحليلات الفرصة الاستثمارية من localStorage:",
        localAnalyses.length,
        "تحليل"
      );
    } catch (error) {
      console.warn(
        "فشل في جلب تحليلات الفرصة الاستثمارية من localStorage:",
        error
      );
    }
  }

  // دمج النتائج وترتيبها حسب الوقت
  const allAnalyses = [...firebaseAnalyses, ...localAnalyses];
  allAnalyses.sort((a, b) => {
    const timeA = new Date(
      a.timestamp?.toDate ? a.timestamp.toDate() : a.timestamp
    );
    const timeB = new Date(
      b.timestamp?.toDate ? b.timestamp.toDate() : b.timestamp
    );
    return timeB - timeA;
  });

  return allAnalyses.slice(0, 10);
};

// خدمة حفظ تقييم فرصة استثمارية
export const saveInvestmentRating = async (opportunityId, ratingData) => {
  try {
    if (canUseFirebase()) {
      const ratingRef = collection(db, "investmentRatings");
      const docRef = await addDoc(ratingRef, {
        opportunityId: opportunityId,
        rating: ratingData.rating, // 1-5
        comment: ratingData.comment,
        investorType: ratingData.investorType, // individual, corporate, institutional
        experience: ratingData.experience, // beginner, intermediate, expert
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      });

      console.log(
        "تم حفظ تقييم الفرصة الاستثمارية في Firebase بنجاح:",
        docRef.id
      );
      return docRef.id;
    }
  } catch (error) {
    console.warn("فشل في حفظ تقييم الفرصة الاستثمارية في Firebase:", error);
  }

  // استخدام localStorage كبديل
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localRatingData = {
        id: `local_investment_rating_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        opportunityId: opportunityId,
        rating: ratingData.rating,
        comment: ratingData.comment,
        investorType: ratingData.investorType,
        experience: ratingData.experience,
        timestamp: new Date().toISOString(),
        source: "localStorage",
      };

      const existingRatings = JSON.parse(
        localStorage.getItem("investmentRatings") || "[]"
      );
      existingRatings.push(localRatingData);
      localStorage.setItem(
        "investmentRatings",
        JSON.stringify(existingRatings)
      );

      console.log(
        "تم حفظ تقييم الفرصة الاستثمارية في localStorage بنجاح:",
        localRatingData.id
      );
      return localRatingData.id;
    } catch (localError) {
      console.error(
        "فشل في حفظ تقييم الفرصة الاستثمارية في localStorage:",
        localError
      );
    }
  }

  return null;
};

// خدمة جلب تقييمات فرصة استثمارية
export const getInvestmentRatings = async (opportunityId) => {
  let firebaseRatings = [];
  let localRatings = [];

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const ratingRef = collection(db, "investmentRatings");
      const q = query(
        ratingRef,
        where("opportunityId", "==", opportunityId),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        firebaseRatings.push({
          id: doc.id,
          ...doc.data(),
          source: "firebase",
        });
      });

      console.log(
        "تم جلب تقييمات الفرصة الاستثمارية من Firebase:",
        firebaseRatings.length,
        "تقييم"
      );
    } catch (error) {
      console.warn("فشل في جلب تقييمات الفرصة الاستثمارية من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localRatingsData = JSON.parse(
        localStorage.getItem("investmentRatings") || "[]"
      );
      localRatings = localRatingsData
        .filter((rating) => rating.opportunityId === opportunityId)
        .map((rating) => ({
          ...rating,
          source: "localStorage",
        }));

      console.log(
        "تم جلب تقييمات الفرصة الاستثمارية من localStorage:",
        localRatings.length,
        "تقييم"
      );
    } catch (error) {
      console.warn(
        "فشل في جلب تقييمات الفرصة الاستثمارية من localStorage:",
        error
      );
    }
  }

  // دمج النتائج وترتيبها حسب الوقت
  const allRatings = [...firebaseRatings, ...localRatings];
  allRatings.sort((a, b) => {
    const timeA = new Date(
      a.timestamp?.toDate ? a.timestamp.toDate() : a.timestamp
    );
    const timeB = new Date(
      b.timestamp?.toDate ? b.timestamp.toDate() : b.timestamp
    );
    return timeB - timeA;
  });

  return allRatings;
};

// خدمة جلب إحصائيات الفرص الاستثمارية
export const getInvestmentStats = async () => {
  // الحصول على الإحصائيات الأساسية من البيانات المحلية
  const { getInvestmentStats: getLocalStats } = await import(
    "../data/investmentOpportunities"
  );
  const baseStats = getLocalStats();

  let firebaseStats = {
    totalAnalyses: 0,
    totalRatings: 0,
    averageRating: 0,
    topRatedOpportunities: [],
  };
  let localStats = {
    totalAnalyses: 0,
    totalRatings: 0,
    averageRating: 0,
    topRatedOpportunities: [],
  };

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const [analysisSnapshot, ratingSnapshot] = await Promise.all([
        getDocs(collection(db, "investmentAnalyses")),
        getDocs(collection(db, "investmentRatings")),
      ]);

      firebaseStats.totalAnalyses = analysisSnapshot.size;
      firebaseStats.totalRatings = ratingSnapshot.size;

      // حساب متوسط التقييم
      let totalRating = 0;
      const opportunityRatings = {};

      ratingSnapshot.forEach((doc) => {
        const data = doc.data();
        totalRating += data.rating;

        if (!opportunityRatings[data.opportunityId]) {
          opportunityRatings[data.opportunityId] = { sum: 0, count: 0 };
        }
        opportunityRatings[data.opportunityId].sum += data.rating;
        opportunityRatings[data.opportunityId].count += 1;
      });

      firebaseStats.averageRating =
        firebaseStats.totalRatings > 0
          ? Math.round((totalRating / firebaseStats.totalRatings) * 10) / 10
          : 0;

      // ترتيب الفرص حسب التقييم
      firebaseStats.topRatedOpportunities = Object.entries(opportunityRatings)
        .map(([opportunityId, ratings]) => ({
          opportunityId,
          averageRating: Math.round((ratings.sum / ratings.count) * 10) / 10,
          totalRatings: ratings.count,
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5);

      console.log(
        "تم جلب إحصائيات الفرص الاستثمارية من Firebase:",
        firebaseStats
      );
    } catch (error) {
      console.warn("فشل في جلب إحصائيات الفرص الاستثمارية من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localAnalyses = JSON.parse(
        localStorage.getItem("investmentAnalyses") || "[]"
      );
      const localRatings = JSON.parse(
        localStorage.getItem("investmentRatings") || "[]"
      );

      localStats.totalAnalyses = localAnalyses.length;
      localStats.totalRatings = localRatings.length;

      // حساب متوسط التقييم
      let totalRating = 0;
      const opportunityRatings = {};

      localRatings.forEach((rating) => {
        totalRating += rating.rating;

        if (!opportunityRatings[rating.opportunityId]) {
          opportunityRatings[rating.opportunityId] = { sum: 0, count: 0 };
        }
        opportunityRatings[rating.opportunityId].sum += rating.rating;
        opportunityRatings[rating.opportunityId].count += 1;
      });

      localStats.averageRating =
        localStats.totalRatings > 0
          ? Math.round((totalRating / localStats.totalRatings) * 10) / 10
          : 0;

      // ترتيب الفرص حسب التقييم
      localStats.topRatedOpportunities = Object.entries(opportunityRatings)
        .map(([opportunityId, ratings]) => ({
          opportunityId,
          averageRating: Math.round((ratings.sum / ratings.count) * 10) / 10,
          totalRatings: ratings.count,
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 5);

      console.log(
        "تم جلب إحصائيات الفرص الاستثمارية من localStorage:",
        localStats
      );
    } catch (error) {
      console.warn(
        "فشل في جلب إحصائيات الفرص الاستثمارية من localStorage:",
        error
      );
    }
  }

  // دمج الإحصائيات مع البيانات الأساسية
  const combinedStats = {
    ...baseStats, // إضافة totalSectors, totalOpportunities, averageCapitalRange, averageROI
    totalAnalyses: firebaseStats.totalAnalyses + localStats.totalAnalyses,
    totalRatings: firebaseStats.totalRatings + localStats.totalRatings,
    averageRating: 0,
    topRatedOpportunities: [],
  };

  // حساب متوسط التقييم المدمج
  const totalRatings = combinedStats.totalRatings;
  if (totalRatings > 0) {
    const firebaseTotal =
      firebaseStats.averageRating * firebaseStats.totalRatings;
    const localTotal = localStats.averageRating * localStats.totalRatings;
    combinedStats.averageRating =
      Math.round(((firebaseTotal + localTotal) / totalRatings) * 10) / 10;
  }

  // دمج أفضل الفرص المقيمة
  const allTopRated = [
    ...firebaseStats.topRatedOpportunities,
    ...localStats.topRatedOpportunities,
  ];
  const mergedOpportunities = {};

  allTopRated.forEach((opp) => {
    if (!mergedOpportunities[opp.opportunityId]) {
      mergedOpportunities[opp.opportunityId] = {
        opportunityId: opp.opportunityId,
        averageRating: opp.averageRating,
        totalRatings: opp.totalRatings,
      };
    } else {
      // دمج التقييمات
      const existing = mergedOpportunities[opp.opportunityId];
      const totalRatings = existing.totalRatings + opp.totalRatings;
      const weightedAverage =
        (existing.averageRating * existing.totalRatings +
          opp.averageRating * opp.totalRatings) /
        totalRatings;

      mergedOpportunities[opp.opportunityId] = {
        opportunityId: opp.opportunityId,
        averageRating: Math.round(weightedAverage * 10) / 10,
        totalRatings: totalRatings,
      };
    }
  });

  combinedStats.topRatedOpportunities = Object.values(mergedOpportunities)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

  return combinedStats;
};

export default {
  uploadInvestmentDataToFirebase,
  getInvestmentOpportunitiesFromFirebase,
  getRequiredLicensesFromFirebase,
  saveInvestmentAnalysis,
  getInvestmentAnalyses,
  saveInvestmentRating,
  getInvestmentRatings,
  getInvestmentStats,
};
