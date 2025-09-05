import { GoogleGenerativeAI } from "@google/generative-ai";

// إعداد الذكاء الاصطناعي
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
    for (const modelName of SUPPORTED_MODELS) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
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
    console.error("فشل في تهيئة نموذج الذكاء الاصطناعي:", error);
  });

// دالة مساعدة لضمان وجود النموذج
const ensureModel = async () => {
  if (!model) {
    model = await getAvailableModel();
  }
  return model;
};

// ضوابط صارمة للذكاء الاصطناعي - محسنة للسرعة والإيجاز
const AI_CONSTRAINTS = `
أنت خبير استثماري متخصص في محافظة ظفار بسلطنة عمان. مهمتك الوحيدة هي تحليل المشاريع الاستثمارية.

الضوابط الصارمة:
1. التزم بموضوع الاستثمار في ظفار فقط
2. لا تجب على أسئلة خارج نطاق الاستثمار
3. استخدم البيانات المحلية لظفار فقط
4. اذكر دائماً أن التوقعات تقديرية وغير مضمونة ولكن بطريقة لا تربك المستثمر
5. ركز على القطاعات الخمسة: الثروة السمكية، الزراعة، السياحة، النقل، الصناعة
6. اذكر التراخيص المطلوبة من الجهات الحكومية العمانية
7. قدم تحليلاً واقعياً مع تحذيرات من المخاطر
8. لا تقدم نصائح طبية، قانونية، أو شخصية
9. لا تعلق على السياسة أو الدين
10. إذا سُئلت عن موضوع خارج الاستثمار، ارفض الإجابة وارجع للموضوع

قواعد الردود:
- أجب بإيجاز ووضوح (3-5 نقاط رئيسية كحد أقصى)
- استخدم نقاط مرقمة أو نقاط بسيطة
- تجنب التفاصيل المطولة إلا عند الطلب
- ركز على المعلومات العملية والقابلة للتطبيق
- اذكر النتائج الرئيسية أولاً ثم التفاصيل

إذا سُئلت عن أي موضوع خارج نطاق الاستثمار في ظفار، قل: "أعتذر، أنا متخصص في تحليل المشاريع الاستثمارية في محافظة ظفار فقط. كيف يمكنني مساعدتك في تحليل مشروعك الاستثماري؟"
`;

// قيود إضافية للردود المفصلة
const DETAILED_CONSTRAINTS = `
بالإضافة للضوابط الأساسية، عند طلب التفصيل:
- قدم تحليلاً شاملاً ومفصلاً
- اذكر الأرقام والإحصائيات
- قدم أمثلة عملية
- اشرح المنطق وراء كل توصية
- قدم خطط بديلة
- اذكر المراجع والمصادر
`;

// دالة مساعدة لإرجاع تحليل افتراضي في حالة فشل API
const getFallbackAnalysis = (analysisType, projectData) => {
  const fallbackResponses = {
    overview: `
تحليل المشروع الاستثماري (تقديري):

المشروع: ${projectData.projectType} في ${projectData.region}
الجمهور المستهدف: ${projectData.audience}
مبلغ الاستثمار: ${projectData.investment} ريال عماني

⚠️ تحذير مهم: هذا التحليل تقديري ولا يضمن نجاح المشروع

التحليل:
1. الجدوى الاقتصادية: المشروع يبدو واعداً لكن يحتاج دراسة أعمق
2. السوق المحلي: هناك فرص متاحة لكن المنافسة موجودة
3. المخاطر: مخاطر متوسطة إلى عالية يمكن إدارتها
4. التوصيات: التركيز على الجودة والخدمة المتميزة
5. الفرص: إمكانية التوسع لكن بحذر

ملاحظة: هذا تحليل افتراضي. يرجى التحقق من اتصال الإنترنت وإعادة المحاولة.
    `,
    recommendations: `
توصيات ذكية للمشروع (تقديرية):

⚠️ تحذير: هذه التوصيات تقديرية ولا تضمن النجاح

نقاط القوة:
- موقع استراتيجي في ${projectData.region}
- جمهور مستهدف واضح: ${projectData.audience}

نقاط التحسين:
- تطوير استراتيجية تسويقية قوية
- التركيز على تجربة العملاء
- دراسة المنافسين المحليين

نصائح عملية:
- إجراء دراسة سوق مفصلة مع خبراء محليين
- وضع خطة مالية واضحة مع احتياطي للمخاطر
- بناء شبكة علاقات محلية

مؤشرات الأداء:
- معدل النمو الشهري
- رضا العملاء
- العائد على الاستثمار

ملاحظة: هذه توصيات افتراضية. يرجى إعادة المحاولة للحصول على تحليل أكثر تفصيلاً.
    `,
    risks: `
تحليل المخاطر (تقديري):

⚠️ تحذير: جميع التوقعات تقديرية ولا تضمن النجاح

المخاطر المحتملة:
1. مخاطر السوق: تقلبات الطلب والمنافسة
2. مخاطر مالية: عدم كفاية التمويل
3. مخاطر تشغيلية: نقص الخبرة المحلية
4. مخاطر تنظيمية: تغيير القوانين والتراخيص

استراتيجيات التخفيف:
- تنويع مصادر الدخل
- بناء احتياطي مالي (20% على الأقل)
- الاستعانة بخبراء محليين
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
تحليل السوق التنافسي (تقديري):

⚠️ تحذير: هذا التحليل تقديري ولا يضمن النجاح

المنافسون المحليون:
- منافسون مباشرون في المنطقة
- منافسون غير مباشرون (بدائل)

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
خطة العمل (تقديرية):

⚠️ تحذير: هذه الخطة تقديرية ولا تضمن النجاح

المراحل التنفيذية:
1. مرحلة التخطيط (2-3 أشهر)
2. مرحلة الإعداد (3-4 أشهر)
3. مرحلة التشغيل (6-12 شهر)
4. مرحلة التطوير (12+ شهر)

الجدول الزمني:
- الشهر 1-2: إعداد الخطة والتراخيص
- الشهر 3-4: التجهيز والتسويق
- الشهر 5-12: التشغيل والتحسين

الميزانية المقترحة:
- التجهيز: 40% من الميزانية
- التسويق: 25% من الميزانية
- التشغيل: 25% من الميزانية
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

// خدمة تحليل المشاريع باستخدام الذكاء الاصطناعي - محسنة للسرعة
export const analyzeProjectWithGemini = async (
  projectData,
  detailed = false
) => {
  try {
    const currentModel = await ensureModel();

    const constraints = detailed
      ? `${AI_CONSTRAINTS}\n\n${DETAILED_CONSTRAINTS}`
      : AI_CONSTRAINTS;
    const responseType = detailed ? "مفصل ومنظم" : "موجز وواضح";

    const prompt = `
    ${constraints}

    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectData.projectType}
    - الجمهور المستهدف: ${projectData.audience}
    - مبلغ الاستثمار: ${projectData.investment} ريال عماني

    ${
      detailed
        ? `
    قدم تحليلاً شاملاً يتضمن:
    1. تقييم الجدوى الاقتصادية (بناءً على بيانات السوق المحلي)
    2. تحليل السوق المحلي (المنافسون، الطلب، العرض)
    3. المخاطر المحتملة (محددة لظفار)
    4. التوصيات الاستراتيجية (قابلة للتطبيق محلياً)
    5. الفرص المتاحة (مبنية على البيانات الفعلية)
    6. التراخيص المطلوبة (من الجهات الحكومية العمانية)
    `
        : `
    قدم تحليلاً موجزاً يتضمن:
    1. الجدوى الاقتصادية (نقاط رئيسية)
    2. السوق المحلي (المنافسون والفرص)
    3. المخاطر الرئيسية
    4. التوصيات الأساسية
    5. التراخيص المطلوبة
    `
    }

    أجب باللغة العربية وبشكل ${responseType}. استخدم الأرقام والاحصائيات الفعلية لظفار.
    اذكر دائماً أن التوقعات تقديرية وغير مضمونة.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في التحليل الذكي:", error);
    return getFallbackAnalysis("overview", projectData);
  }
};

// خدمة توليد توصيات ذكية - محسنة للسرعة
export const generateSmartRecommendations = async (
  iai,
  ss,
  projectType,
  region,
  detailed = false
) => {
  try {
    const currentModel = await ensureModel();

    const constraints = detailed
      ? `${AI_CONSTRAINTS}\n\n${DETAILED_CONSTRAINTS}`
      : AI_CONSTRAINTS;
    const responseType = detailed ? "مفصل ومنظم" : "موجز وواضح";

    const prompt = `
    ${constraints}

    بيانات المشروع:
    - مؤشر الجاذبية الاستثمارية (IAI): ${iai}%
    - مؤشر الاستدامة (SS): ${ss}
    - نوع المشروع: ${projectType}
    - المنطقة: ${region}
    
    ${
      detailed
        ? `
    قدم توصيات ذكية ومحددة تتضمن:
    1. نقاط القوة والضعف (محددة لظفار)
    2. استراتيجيات التحسين (قابلة للتطبيق محلياً)
    3. نصائح عملية للتنفيذ (مع الجهات الحكومية)
    4. مؤشرات الأداء المطلوب مراقبتها
    5. الجدول الزمني المقترح
    6. الميزانية التفصيلية
    7. التراخيص المطلوبة
    8. الشركاء المحتملين
    `
        : `
    قدم توصيات موجزة تتضمن:
    1. نقاط القوة والضعف الرئيسية
    2. استراتيجيات التحسين الأساسية
    3. نصائح عملية للتنفيذ
    4. مؤشرات الأداء المهمة
    5. التراخيص المطلوبة
    `
    }
    
    أجب باللغة العربية وبشكل ${responseType}. استخدم أسماء الجهات الحكومية والأماكن الحقيقية.
    اذكر دائماً أن التوصيات تقديرية وغير مضمونة.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في توليد التوصيات:", error);
    return getFallbackAnalysis("recommendations", { region, projectType });
  }
};

// خدمة تحليل المخاطر المتقدم - محسنة للسرعة
export const analyzeRisksWithGemini = async (
  projectData,
  risks,
  detailed = false
) => {
  try {
    const currentModel = await ensureModel();

    const constraints = detailed
      ? `${AI_CONSTRAINTS}\n\n${DETAILED_CONSTRAINTS}`
      : AI_CONSTRAINTS;
    const responseType = detailed ? "مفصل ومنظم" : "موجز وواضح";

    const prompt = `
    ${constraints}

    تحليل المخاطر للمشروع التالي:
    
    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectData.projectType}
    - الجمهور المستهدف: ${projectData.audience}
    
    المخاطر المحددة: ${risks.map((risk) => risk.name).join(", ")}
    
    ${
      detailed
        ? `
    قدم تحليلاً متقدماً يتضمن:
    1. تقييم مستوى كل خطر
    2. استراتيجيات التخفيف
    3. خطط الطوارئ
    4. مؤشرات الإنذار المبكر
    `
        : `
    قدم تحليلاً موجزاً يتضمن:
    1. المخاطر الرئيسية
    2. استراتيجيات التخفيف الأساسية
    3. مؤشرات الإنذار المبكر
    `
    }
    
    أجب باللغة العربية وبشكل ${responseType}.
    اذكر دائماً أن تحليل المخاطر تقديري وغير مضمون.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في تحليل المخاطر:", error);
    return getFallbackAnalysis("risks", projectData);
  }
};

// خدمة تحليل السوق التنافسي - محسنة للسرعة
export const analyzeMarketCompetition = async (
  projectType,
  region,
  detailed = false
) => {
  try {
    const currentModel = await ensureModel();

    const constraints = detailed
      ? `${AI_CONSTRAINTS}\n\n${DETAILED_CONSTRAINTS}`
      : AI_CONSTRAINTS;
    const responseType = detailed ? "مفصل ومنظم" : "موجز وواضح";

    const prompt = `
    ${constraints}

    المشروع المقترح: ${projectType} في منطقة ${region} بظفار

    ${
      detailed
        ? `
    قدم تحليلاً شاملاً يتضمن:
    1. المنافسين المباشرين (نفس النشاط في نفس المنطقة)
    2. المنافسين غير المباشرين (أنشطة بديلة)
    3. نقاط القوة والضعف لكل منافس
    4. حصة السوق المتاحة للمشروع الجديد
    5. استراتيجيات التميز والتفرد
    6. نصائح لتجنب المنافسة المباشرة
    7. الفرص المتاحة في السوق
    8. التحديات التنافسية المتوقعة
    `
        : `
    قدم تحليلاً موجزاً يتضمن:
    1. المنافسين الرئيسيين
    2. نقاط القوة والضعف
    3. الفرص المتاحة
    4. استراتيجيات التميز
    5. التحديات المتوقعة
    `
    }

    أجب باللغة العربية وبشكل ${responseType}. استخدم أسماء وأماكن حقيقية في ظفار.
    اذكر دائماً أن تحليل المنافسة تقديري وغير مضمون.
    `;

    const result = await currentModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("خطأ في تحليل السوق:", error);
    return getFallbackAnalysis("market", { region, projectType });
  }
};

// خدمة توليد خطة عمل - محسنة للسرعة
export const generateActionPlan = async (
  projectData,
  recommendations,
  detailed = false
) => {
  try {
    const currentModel = await ensureModel();

    const constraints = detailed
      ? `${AI_CONSTRAINTS}\n\n${DETAILED_CONSTRAINTS}`
      : AI_CONSTRAINTS;
    const responseType = detailed ? "مفصل ومنظم" : "موجز وواضح";

    const prompt = `
    ${constraints}

    بناءً على المشروع والتوصيات التالية:
    
    بيانات المشروع:
    - المنطقة: ${projectData.region}
    - نوع المشروع: ${projectData.projectType}
    - الجمهور المستهدف: ${projectData.audience}
    - مبلغ الاستثمار: ${projectData.investment} ريال عماني
    
    التوصيات: ${recommendations}
    
    ${
      detailed
        ? `
    قدم خطة عمل مفصلة تتضمن:
    1. المراحل التنفيذية
    2. الجدول الزمني
    3. الميزانية المقترحة
    4. الموارد المطلوبة
    5. مؤشرات النجاح
    6. نقاط المراجعة
    `
        : `
    قدم خطة عمل موجزة تتضمن:
    1. المراحل الرئيسية
    2. الجدول الزمني الأساسي
    3. الميزانية المقترحة
    4. الموارد المطلوبة
    5. مؤشرات النجاح
    `
    }
    
    أجب باللغة العربية وبشكل ${responseType}.
    اذكر دائماً أن خطة العمل تقديرية وغير مضمونة.
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
