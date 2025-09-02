// سكريبت لرفع البيانات إلى Firebase
// يمكن تشغيله من وحدة التحكم في المتصفح أو كجزء من التطبيق

import { uploadAllDataToFirebase } from "../services/firebaseService";
import { uploadInvestmentDataToFirebase } from "../services/investmentDataService";

// دالة لرفع جميع البيانات
export const uploadAllData = async () => {
  console.log("🚀 بدء رفع البيانات إلى Firebase...");

  try {
    // رفع بيانات الفرص الاستثمارية
    console.log("📊 رفع بيانات الفرص الاستثمارية...");
    const investmentResult = await uploadInvestmentDataToFirebase();

    if (investmentResult) {
      console.log("✅ تم رفع بيانات الفرص الاستثمارية بنجاح");
    } else {
      console.warn("⚠️ فشل في رفع بيانات الفرص الاستثمارية");
    }

    // يمكن إضافة المزيد من خدمات رفع البيانات هنا
    console.log("🎉 تم الانتهاء من رفع جميع البيانات");
    return true;
  } catch (error) {
    console.error("❌ خطأ في رفع البيانات:", error);
    return false;
  }
};

// دالة لرفع بيانات الفرص الاستثمارية فقط
export const uploadInvestmentData = async () => {
  console.log("📊 رفع بيانات الفرص الاستثمارية...");

  try {
    const result = await uploadInvestmentDataToFirebase();

    if (result) {
      console.log("✅ تم رفع بيانات الفرص الاستثمارية بنجاح");
    } else {
      console.warn("⚠️ فشل في رفع بيانات الفرص الاستثمارية");
    }

    return result;
  } catch (error) {
    console.error("❌ خطأ في رفع بيانات الفرص الاستثمارية:", error);
    return false;
  }
};

// دالة للتحقق من حالة Firebase
export const checkFirebaseStatus = () => {
  try {
    // التحقق من وجود متغيرات البيئة
    const requiredVars = [
      "REACT_APP_FIREBASE_API_KEY",
      "REACT_APP_FIREBASE_AUTH_DOMAIN",
      "REACT_APP_FIREBASE_PROJECT_ID",
      "REACT_APP_FIREBASE_STORAGE_BUCKET",
      "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
      "REACT_APP_FIREBASE_APP_ID",
      "REACT_APP_FIREBASE_MEASUREMENT_ID",
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      console.warn("⚠️ متغيرات البيئة المفقودة:", missingVars);
      return false;
    }

    console.log("✅ جميع متغيرات البيئة متوفرة");
    return true;
  } catch (error) {
    console.error("❌ خطأ في التحقق من حالة Firebase:", error);
    return false;
  }
};

// دالة لعرض معلومات البيانات
export const showDataInfo = () => {
  console.log("📋 معلومات البيانات:");
  console.log("📊 الفرص الاستثمارية:");
  console.log("  - قطاع الثروة السمكية");
  console.log("  - قطاع الزراعة");
  console.log("  - قطاع السياحة");
  console.log("  - قطاع النقل والخدمات اللوجستية");
  console.log("  - قطاع الصناعة التحويلية");
  console.log("");
  console.log("📄 التراخيص المطلوبة:");
  console.log("  - وزارة التجارة والصناعة وترويج الاستثمار");
  console.log("  - وزارة الثروة الزراعية والسمكية");
  console.log("  - وزارة التراث والسياحة");
  console.log("  - بلدية ظفار");
  console.log("  - شرطة عمان السلطانية");
  console.log("  - وزارة النقل والاتصالات");
  console.log("  - وزارة الصحة");
};

// دالة مساعدة لعرض التعليمات
export const showInstructions = () => {
  console.log("📖 تعليمات الاستخدام:");
  console.log("");
  console.log("1. للتحقق من حالة Firebase:");
  console.log("   checkFirebaseStatus()");
  console.log("");
  console.log("2. لعرض معلومات البيانات:");
  console.log("   showDataInfo()");
  console.log("");
  console.log("3. لرفع بيانات الفرص الاستثمارية:");
  console.log("   uploadInvestmentData()");
  console.log("");
  console.log("4. لرفع جميع البيانات:");
  console.log("   uploadAllData()");
  console.log("");
  console.log("💡 يمكنك تشغيل هذه الدوال من وحدة التحكم في المتصفح");
};

// تصدير الدوال للاستخدام العام
if (typeof window !== "undefined") {
  window.uploadAllData = uploadAllData;
  window.uploadInvestmentData = uploadInvestmentData;
  window.checkFirebaseStatus = checkFirebaseStatus;
  window.showDataInfo = showDataInfo;
  window.showInstructions = showInstructions;

  console.log("🔧 تم تحميل أدوات رفع البيانات");
  console.log("💡 اكتب showInstructions() لعرض التعليمات");
}

export default {
  uploadAllData,
  uploadInvestmentData,
  checkFirebaseStatus,
  showDataInfo,
  showInstructions,
};
