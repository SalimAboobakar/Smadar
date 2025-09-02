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
} from "firebase/firestore";
import { db } from "../firebase/config";

// إعدادات التطبيق
const APP_CONFIG = {
  useFirebase: true, // يمكن تغييرها إلى false لتعطيل Firebase
  fallbackToLocalStorage: true, // استخدام localStorage كبديل
};

// دالة مساعدة للتحقق من إمكانية استخدام Firebase
const canUseFirebase = () => {
  return APP_CONFIG.useFirebase && db;
};

// خدمة حفظ نتائج التصويت المجتمعي
export const saveVotingResult = async (projectData, voteData) => {
  try {
    // محاولة استخدام Firebase أولاً
    if (canUseFirebase()) {
      const votingRef = collection(db, "communityVotes");
      const docRef = await addDoc(votingRef, {
        projectId: projectData.projectId,
        region: projectData.region,
        projectType: projectData.projectType,
        audience: projectData.audience,
        investment: projectData.investment,
        vote: voteData.vote, // 'up' or 'down'
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        ipAddress: await getClientIP(),
      });

      console.log("تم حفظ التصويت في Firebase بنجاح:", docRef.id);
      return docRef.id;
    }
  } catch (error) {
    console.warn("فشل في حفظ التصويت في Firebase:", error);
  }

  // استخدام localStorage كبديل
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const voteData = {
        id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        projectId: projectData.projectId,
        region: projectData.region,
        projectType: projectData.projectType,
        audience: projectData.audience,
        investment: projectData.investment,
        vote: voteData.vote,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        source: "localStorage",
      };

      const existingVotes = JSON.parse(
        localStorage.getItem("communityVotes") || "[]"
      );
      existingVotes.push(voteData);
      localStorage.setItem("communityVotes", JSON.stringify(existingVotes));

      console.log("تم حفظ التصويت في localStorage بنجاح:", voteData.id);
      return voteData.id;
    } catch (localError) {
      console.error("فشل في حفظ التصويت في localStorage:", localError);
    }
  }

  return null;
};

// خدمة جلب نتائج التصويت لمشروع معين
export const getVotingResults = async (projectId) => {
  let firebaseVotes = [];
  let localVotes = [];

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const votingRef = collection(db, "communityVotes");
      const q = query(
        votingRef,
        where("projectId", "==", projectId),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        firebaseVotes.push({
          id: doc.id,
          ...doc.data(),
          source: "firebase",
        });
      });

      console.log(
        "تم جلب نتائج التصويت من Firebase:",
        firebaseVotes.length,
        "تصويت"
      );
    } catch (error) {
      console.warn("فشل في جلب نتائج التصويت من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localVotesData = JSON.parse(
        localStorage.getItem("communityVotes") || "[]"
      );
      localVotes = localVotesData
        .filter((vote) => vote.projectId === projectId)
        .map((vote) => ({
          ...vote,
          source: "localStorage",
        }));

      console.log(
        "تم جلب نتائج التصويت من localStorage:",
        localVotes.length,
        "تصويت"
      );
    } catch (error) {
      console.warn("فشل في جلب نتائج التصويت من localStorage:", error);
    }
  }

  // دمج النتائج وترتيبها حسب الوقت
  const allVotes = [...firebaseVotes, ...localVotes];
  allVotes.sort((a, b) => {
    const timeA = new Date(
      a.timestamp?.toDate ? a.timestamp.toDate() : a.timestamp
    );
    const timeB = new Date(
      b.timestamp?.toDate ? b.timestamp.toDate() : b.timestamp
    );
    return timeB - timeA;
  });

  return allVotes;
};

// خدمة حفظ نتائج التحليل
export const saveAnalysisResult = async (projectData, analysisData) => {
  try {
    // محاولة استخدام Firebase أولاً
    if (canUseFirebase()) {
      const analysisRef = collection(db, "analysisResults");
      const docRef = await addDoc(analysisRef, {
        projectId: projectData.projectId,
        region: projectData.region,
        projectType: projectData.projectType,
        audience: projectData.audience,
        investment: projectData.investment,
        iai: analysisData.iai,
        ss: analysisData.ss,
        demand: analysisData.demand,
        recommendations: analysisData.recommendations,
        risks: analysisData.risks,
        timestamp: serverTimestamp(),
        geminiAnalysis: analysisData.geminiAnalysis || null,
      });

      console.log("تم حفظ نتائج التحليل في Firebase بنجاح:", docRef.id);
      return docRef.id;
    }
  } catch (error) {
    console.warn("فشل في حفظ نتائج التحليل في Firebase:", error);
  }

  // استخدام localStorage كبديل
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localAnalysisData = {
        id: `local_analysis_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        projectId: projectData.projectId,
        region: projectData.region,
        projectType: projectData.projectType,
        audience: projectData.audience,
        investment: projectData.investment,
        iai: analysisData.iai,
        ss: analysisData.ss,
        demand: analysisData.demand,
        recommendations: analysisData.recommendations,
        risks: analysisData.risks,
        timestamp: new Date().toISOString(),
        geminiAnalysis: analysisData.geminiAnalysis || null,
        source: "localStorage",
      };

      const existingAnalyses = JSON.parse(
        localStorage.getItem("analysisResults") || "[]"
      );
      existingAnalyses.push(localAnalysisData);
      localStorage.setItem("analysisResults", JSON.stringify(existingAnalyses));

      console.log(
        "تم حفظ نتائج التحليل في localStorage بنجاح:",
        localAnalysisData.id
      );
      return localAnalysisData.id;
    } catch (localError) {
      console.error("فشل في حفظ نتائج التحليل في localStorage:", localError);
    }
  }

  return null;
};

// خدمة جلب التحليلات السابقة
export const getPreviousAnalyses = async (region, projectType) => {
  let firebaseAnalyses = [];
  let localAnalyses = [];

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const analysisRef = collection(db, "analysisResults");
      const q = query(
        analysisRef,
        where("region", "==", region),
        where("projectType", "==", projectType),
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
        "تم جلب التحليلات السابقة من Firebase:",
        firebaseAnalyses.length,
        "تحليل"
      );
    } catch (error) {
      console.warn("فشل في جلب التحليلات السابقة من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localAnalysesData = JSON.parse(
        localStorage.getItem("analysisResults") || "[]"
      );
      localAnalyses = localAnalysesData
        .filter(
          (analysis) =>
            analysis.region === region && analysis.projectType === projectType
        )
        .slice(0, 10)
        .map((analysis) => ({
          ...analysis,
          source: "localStorage",
        }));

      console.log(
        "تم جلب التحليلات السابقة من localStorage:",
        localAnalyses.length,
        "تحليل"
      );
    } catch (error) {
      console.warn("فشل في جلب التحليلات السابقة من localStorage:", error);
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

// خدمة حفظ تحليل Gemini
export const saveGeminiAnalysis = async (projectId, analysisType, content) => {
  try {
    // محاولة استخدام Firebase أولاً
    if (canUseFirebase()) {
      const geminiRef = collection(db, "geminiAnalyses");
      const docRef = await addDoc(geminiRef, {
        projectId: projectId,
        analysisType: analysisType,
        content: content,
        timestamp: serverTimestamp(),
      });

      console.log("تم حفظ تحليل Gemini في Firebase بنجاح:", docRef.id);
      return docRef.id;
    }
  } catch (error) {
    console.warn("فشل في حفظ تحليل Gemini في Firebase:", error);
  }

  // استخدام localStorage كبديل
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const geminiData = {
        id: `local_gemini_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        projectId: projectId,
        analysisType: analysisType,
        content: content,
        timestamp: new Date().toISOString(),
        source: "localStorage",
      };

      const existingGeminiAnalyses = JSON.parse(
        localStorage.getItem("geminiAnalyses") || "[]"
      );
      existingGeminiAnalyses.push(geminiData);
      localStorage.setItem(
        "geminiAnalyses",
        JSON.stringify(existingGeminiAnalyses)
      );

      console.log("تم حفظ تحليل Gemini في localStorage بنجاح:", geminiData.id);
      return geminiData.id;
    } catch (localError) {
      console.error("فشل في حفظ تحليل Gemini في localStorage:", localError);
    }
  }

  return null;
};

// خدمة جلب إحصائيات المنصة
export const getPlatformStats = async () => {
  let firebaseStats = {
    totalVotes: 0,
    totalAnalyses: 0,
    upVotes: 0,
    downVotes: 0,
    approvalRate: 0,
  };
  let localStats = {
    totalVotes: 0,
    totalAnalyses: 0,
    upVotes: 0,
    downVotes: 0,
    approvalRate: 0,
  };

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const [votingSnapshot, analysisSnapshot] = await Promise.all([
        getDocs(collection(db, "communityVotes")),
        getDocs(collection(db, "analysisResults")),
      ]);

      firebaseStats.totalVotes = votingSnapshot.size;
      firebaseStats.totalAnalyses = analysisSnapshot.size;

      // حساب إحصائيات التصويت
      votingSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.vote === "up") firebaseStats.upVotes++;
        else if (data.vote === "down") firebaseStats.downVotes++;
      });

      firebaseStats.approvalRate =
        firebaseStats.totalVotes > 0
          ? Math.round((firebaseStats.upVotes / firebaseStats.totalVotes) * 100)
          : 0;

      console.log("تم جلب إحصائيات المنصة من Firebase:", firebaseStats);
    } catch (error) {
      console.warn("فشل في جلب إحصائيات المنصة من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localVotes = JSON.parse(
        localStorage.getItem("communityVotes") || "[]"
      );
      const localAnalyses = JSON.parse(
        localStorage.getItem("analysisResults") || "[]"
      );

      localStats.totalVotes = localVotes.length;
      localStats.totalAnalyses = localAnalyses.length;

      // حساب إحصائيات التصويت
      localVotes.forEach((vote) => {
        if (vote.vote === "up") localStats.upVotes++;
        else if (vote.vote === "down") localStats.downVotes++;
      });

      localStats.approvalRate =
        localStats.totalVotes > 0
          ? Math.round((localStats.upVotes / localStats.totalVotes) * 100)
          : 0;

      console.log("تم جلب إحصائيات المنصة من localStorage:", localStats);
    } catch (error) {
      console.warn("فشل في جلب إحصائيات المنصة من localStorage:", error);
    }
  }

  // دمج الإحصائيات
  const combinedStats = {
    totalVotes: firebaseStats.totalVotes + localStats.totalVotes,
    totalAnalyses: firebaseStats.totalAnalyses + localStats.totalAnalyses,
    upVotes: firebaseStats.upVotes + localStats.upVotes,
    downVotes: firebaseStats.downVotes + localStats.downVotes,
    approvalRate: 0,
  };

  combinedStats.approvalRate =
    combinedStats.totalVotes > 0
      ? Math.round((combinedStats.upVotes / combinedStats.totalVotes) * 100)
      : 0;

  return combinedStats;
};

// خدمة جلب المشاريع الأكثر شعبية
export const getPopularProjects = async () => {
  let firebaseVotes = [];
  let localVotes = [];

  // محاولة جلب البيانات من Firebase
  if (canUseFirebase()) {
    try {
      const votingRef = collection(db, "communityVotes");
      const q = query(votingRef, orderBy("timestamp", "desc"), limit(50));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        firebaseVotes.push({
          ...doc.data(),
          source: "firebase",
        });
      });

      console.log(
        "تم جلب أصوات المشاريع من Firebase:",
        firebaseVotes.length,
        "تصويت"
      );
    } catch (error) {
      console.warn("فشل في جلب أصوات المشاريع من Firebase:", error);
    }
  }

  // جلب البيانات من localStorage
  if (APP_CONFIG.fallbackToLocalStorage) {
    try {
      const localVotesData = JSON.parse(
        localStorage.getItem("communityVotes") || "[]"
      );
      localVotes = localVotesData.slice(0, 50).map((vote) => ({
        ...vote,
        source: "localStorage",
      }));

      console.log(
        "تم جلب أصوات المشاريع من localStorage:",
        localVotes.length,
        "تصويت"
      );
    } catch (error) {
      console.warn("فشل في جلب أصوات المشاريع من localStorage:", error);
    }
  }

  // دمج الأصوات وحساب الإحصائيات
  const allVotes = [...firebaseVotes, ...localVotes];
  const projectStats = {};

  allVotes.forEach((vote) => {
    const key = `${vote.region}_${vote.projectType}_${vote.audience}`;

    if (!projectStats[key]) {
      projectStats[key] = {
        region: vote.region,
        projectType: vote.projectType,
        audience: vote.audience,
        investment: vote.investment,
        upVotes: 0,
        downVotes: 0,
        totalVotes: 0,
      };
    }

    if (vote.vote === "up") projectStats[key].upVotes++;
    else if (vote.vote === "down") projectStats[key].downVotes++;
    projectStats[key].totalVotes++;
  });

  // تحويل إلى مصفوفة وترتيب حسب عدد الأصوات
  const popularProjects = Object.values(projectStats)
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 10);

  return popularProjects;
};

// دالة مساعدة للحصول على IP العميل (مبسطة)
const getClientIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      timeout: 5000, // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.ip || "unknown";
  } catch (error) {
    console.error("خطأ في الحصول على IP:", error);
    return "unknown";
  }
};

// خدمة رفع جميع البيانات إلى Firebase
export const uploadAllDataToFirebase = async () => {
  try {
    if (!canUseFirebase()) {
      console.warn("Firebase غير متاح");
      return false;
    }

    console.log("بدء رفع جميع البيانات إلى Firebase...");

    // استيراد خدمة البيانات الاستثمارية
    const { uploadInvestmentDataToFirebase } = await import(
      "./investmentDataService"
    );

    // رفع بيانات الفرص الاستثمارية
    const investmentResult = await uploadInvestmentDataToFirebase();

    if (investmentResult) {
      console.log("✅ تم رفع بيانات الفرص الاستثمارية بنجاح");
    } else {
      console.warn("⚠️ فشل في رفع بيانات الفرص الاستثمارية");
    }

    // يمكن إضافة المزيد من خدمات رفع البيانات هنا
    console.log("تم الانتهاء من رفع البيانات إلى Firebase");
    return true;
  } catch (error) {
    console.error("خطأ في رفع البيانات إلى Firebase:", error);
    return false;
  }
};

// خدمة جلب جميع البيانات من Firebase
export const getAllDataFromFirebase = async () => {
  try {
    if (!canUseFirebase()) {
      console.warn("Firebase غير متاح، سيتم استخدام البيانات المحلية");
      return null;
    }

    console.log("بدء جلب جميع البيانات من Firebase...");

    // استيراد خدمة البيانات الاستثمارية
    const {
      getInvestmentOpportunitiesFromFirebase,
      getRequiredLicensesFromFirebase,
    } = await import("./investmentDataService");

    // جلب بيانات الفرص الاستثمارية
    const investmentOpportunities =
      await getInvestmentOpportunitiesFromFirebase();
    const requiredLicenses = await getRequiredLicensesFromFirebase();

    const allData = {
      investmentOpportunities,
      requiredLicenses,
      timestamp: new Date().toISOString(),
    };

    console.log("تم جلب جميع البيانات من Firebase بنجاح");
    return allData;
  } catch (error) {
    console.error("خطأ في جلب البيانات من Firebase:", error);
    return null;
  }
};

export default {
  saveVotingResult,
  getVotingResults,
  saveAnalysisResult,
  getPreviousAnalyses,
  saveGeminiAnalysis,
  getPlatformStats,
  getPopularProjects,
  uploadAllDataToFirebase,
  getAllDataFromFirebase,
};
