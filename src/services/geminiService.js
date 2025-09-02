import { GoogleGenerativeAI } from "@google/generative-ai";

// إعداد Gemini AI
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("REACT_APP_GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(apiKey);

// قائمة النماذج المدعومة (بالترتيب من الأفضل)
const SUPPORTED_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-pro",
  "gemini-1.0-pro",
];

// دالة للحصول على النموذج المتاح
const getAvailableModel = async () => {
  try {
    // محاولة استخدام النماذج بالترتيب
    for (const modelName of SUPPORTED_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        // اختبار بسيط للتأكد من أن النموذج يعمل
        await model.generateContent("test");
        console.log(`تم العثور على النموذج المدعوم: ${modelName}`);
        return model;
      } catch (error) {
        console.warn(`النموذج ${modelName} غير متاح:`, error.message);
        continue;
      }
    }
    throw new Error("لا توجد نماذج مدعومة متاحة");
  } catch (error) {
    console.error("خطأ في الحصول على النموذج:", error);
    throw error;
  }
};

// الحصول على النموذج
let model = null;
getAvailableModel()
  .then((availableModel) => {
    model = availableModel;
  })
  .catch((error) => {
    console.error("فشل في تهيئة نموذج Gemini:", error);
  });

// دالة مساعدة لضمان وجود النموذج
const ensureModel = async () => {
  if (!model) {
    model = await getAvailableModel();
  }
  return model;
};

// دالة مساعدة لإرجاع تحليل افتراضي في حالة فشل API
const getFallbackAnalysis = (analysisType, projectData) => {
  const fallbackResponses = {
    overview: `
تحليل المشروع الاستثماري:

المشروع: ${projectData.projectType} في ${projectData.region}
الجمهور المستهدف: ${projectData.audience}
مبلغ الاستثمار: ${projectData.investment} ريال عماني

التحليل:
1. الجدوى الاقتصادية: المشروع يبدو واعداً في المنطقة المحددة
2. السوق المحلي: هناك فرص متاحة للنمو والتوسع
3. المخاطر: مخاطر متوسطة يمكن إدارتها
4. التوصيات: التركيز على الجودة والخدمة المتميزة
5. الفرص: إمكانية التوسع في المستقبل

ملاحظة: هذا تحليل افتراضي. يرجى التحقق من اتصال الإنترنت وإعادة المحاولة.
    `,
    recommendations: `
توصيات ذكية للمشروع:

نقاط القوة:
- موقع استراتيجي في ${projectData.region}
- جمهور مستهدف واضح: ${projectData.audience}

نقاط التحسين:
- تطوير استراتيجية تسويقية قوية
- التركيز على تجربة العملاء

نصائح عملية:
- إجراء دراسة سوق مفصلة
- وضع خطة مالية واضحة
- بناء شبكة علاقات محلية

مؤشرات الأداء:
- معدل النمو الشهري
- رضا العملاء
- العائد على الاستثمار

ملاحظة: هذه توصيات افتراضية. يرجى إعادة المحاولة للحصول على تحليل أكثر تفصيلاً.
    `,
    risks: `
تحليل المخاطر:

المخاطر المحتملة:
1. مخاطر السوق: تقلبات الطلب
2. مخاطر مالية: عدم كفاية التمويل
3. مخاطر تشغيلية: نقص الخبرة
4. مخاطر تنظيمية: تغيير القوانين

استراتيجيات التخفيف:
- تنويع مصادر الدخل
- بناء احتياطي مالي
- الاستعانة بخبراء
- متابعة التطورات التنظيمية

خطط الطوارئ:
- خطة بديلة للتمويل
- استراتيجية تسويق بديلة
- خطة إدارة الأزمات

مؤشرات الإنذار المبكر:
- انخفاض المبيعات
- زيادة التكاليف
- تغيير سلوك العملاء

ملاحظة: هذا تحليل افتراضي. يرجى إعادة المحاولة للحصول على تحليل أكثر تفصيلاً.
    `,
    market: `
تحليل السوق التنافسي:

المنافسون المحليون:
- منافسون مباشرون في المنطقة
- منافسون غير مباشرون

نقاط القوة التنافسية:
- موقع مميز
- خدمة متميزة
- أسعار تنافسية

الفرص المتاحة:
- أسواق جديدة
- خدمات إضافية
- شراكات استراتيجية

استراتيجيات التميز:
- التركيز على الجودة
- خدمة عملاء متميزة
- ابتكار مستمر

نصائح لتجنب المنافسة:
- التخصص في مجال معين
- بناء علامة تجارية قوية
- تطوير علاقات طويلة الأمد

ملاحظة: هذا تحليل افتراضي. يرجى إعادة المحاولة للحصول على تحليل أكثر تفصيلاً.
    `,
    actionPlan: `
خطة العمل:

المراحل التنفيذية:
1. مرحلة التخطيط (1-2 شهر)
2. مرحلة الإعداد (2-3 أشهر)
3. مرحلة التشغيل (3-6 أشهر)
4. مرحلة التطوير (6+ أشهر)

الجدول الزمني:
- الشهر 1: إعداد الخطة والتراخيص
- الشهر 2-3: التجهيز والتسويق
- الشهر 4-6: التشغيل والتحسين

الميزانية المقترحة:
- التجهيز: 40% من الميزانية
- التسويق: 30% من الميزانية
- التشغيل: 20% من الميزانية
- الطوارئ: 10% من الميزانية

الموارد المطلوبة:
- موارد بشرية
- موارد مالية
- موارد تقنية
- موارد مادية

مؤشرات النجاح:
- تحقيق الأهداف المالية
- رضا العملاء
- النمو المستدام

نقاط المراجعة:
- مراجعة شهرية للأداء
- مراجعة ربع سنوية للاستراتيجية
- مراجعة سنوية شاملة

ملاحظة: هذه خطة افتراضية. يرجى إعادة المحاولة للحصول على خطة أكثر تفصيلاً.
    `,
  };

  return fallbackResponses[analysisType] || fallbackResponses.overview;
};

// خدمة تحليل المشاريع باستخدام Gemini
export const analyzeProjectWithGemini = async (projectData) => {
  try {
    const currentModel = await ensureModel();

    const prompt = `
    تحليل مشروع استثماري في محافظة ظفار:
    
    المنطقة: ${projectData.region}
    نوع المشروع: ${projectData.projectType}
    الجمهور المستهدف: ${projectData.audience}
    مبلغ الاستثمار: ${projectData.investment} ريال عماني
    
    يرجى تقديم تحليل شامل يتضمن:
    1. تقييم الجدوى الاقتصادية
    2. تحليل السوق المحلي
    3. المخاطر المحتملة
    4. التوصيات الاستراتيجية
    5. الفرص المتاحة
    
    أجب باللغة العربية وبشكل مفصل ومنظم.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في تحليل Gemini:", error);
    return getFallbackAnalysis("overview", projectData);
  }
};

// خدمة توليد توصيات ذكية
export const generateSmartRecommendations = async (
  iai,
  ss,
  projectType,
  region
) => {
  try {
    const currentModel = await ensureModel();

    const prompt = `
    بناءً على المؤشرات التالية:
    - مؤشر الجاذبية الاستثمارية (IAI): ${iai}%
    - مؤشر الاستدامة (SS): ${ss}
    - نوع المشروع: ${projectType}
    - المنطقة: ${region}
    
    قدم توصيات ذكية ومحددة تتضمن:
    1. نقاط القوة والضعف
    2. استراتيجيات التحسين
    3. نصائح عملية للتنفيذ
    4. مؤشرات الأداء المطلوب مراقبتها
    
    أجب باللغة العربية وبشكل مختصر وواضح.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في توليد التوصيات:", error);
    return getFallbackAnalysis("recommendations", { region, projectType });
  }
};

// خدمة تحليل المخاطر المتقدم
export const analyzeRisksWithGemini = async (projectData, risks) => {
  try {
    const currentModel = await ensureModel();

    const prompt = `
    تحليل المخاطر للمشروع التالي:
    
    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectData.projectType}
    - الجمهور المستهدف: ${projectData.audience}
    
    المخاطر المحددة: ${risks.map((risk) => risk.name).join(", ")}
    
    قدم تحليلاً متقدماً يتضمن:
    1. تقييم مستوى كل خطر
    2. استراتيجيات التخفيف
    3. خطط الطوارئ
    4. مؤشرات الإنذار المبكر
    
    أجب باللغة العربية وبشكل مفصل.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في تحليل المخاطر:", error);
    return getFallbackAnalysis("risks", projectData);
  }
};

// خدمة تحليل السوق التنافسي
export const analyzeMarketCompetition = async (projectType, region) => {
  try {
    const currentModel = await ensureModel();

    const prompt = `
    تحليل السوق التنافسي لمشروع ${projectType} في منطقة ${region} في محافظة ظفار:
    
    قدم تحليلاً شاملاً يتضمن:
    1. المنافسين المحليين
    2. نقاط القوة والضعف التنافسية
    3. الفرص المتاحة في السوق
    4. استراتيجيات التميز
    5. نصائح لتجنب المنافسة المباشرة
    
    أجب باللغة العربية وبشكل مفصل ومنظم.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في تحليل السوق:", error);
    return getFallbackAnalysis("market", { region, projectType });
  }
};

// خدمة توليد خطة عمل
export const generateActionPlan = async (projectData, recommendations) => {
  try {
    const currentModel = await ensureModel();

    const prompt = `
    بناءً على المشروع والتوصيات التالية:
    
    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectData.projectType}
    - الجمهور المستهدف: ${projectData.audience}
    - مبلغ الاستثمار: ${projectData.investment} ريال عماني
    
    التوصيات: ${recommendations}
    
    قدم خطة عمل مفصلة تتضمن:
    1. المراحل التنفيذية
    2. الجدول الزمني
    3. الميزانية المقترحة
    4. الموارد المطلوبة
    5. مؤشرات النجاح
    6. نقاط المراجعة
    
    أجب باللغة العربية وبشكل منظم وواضح.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في توليد خطة العمل:", error);
    return getFallbackAnalysis("actionPlan", projectData);
  }
};

export default {
  analyzeProjectWithGemini,
  generateSmartRecommendations,
  analyzeRisksWithGemini,
  analyzeMarketCompetition,
  generateActionPlan,
};
