// Mathematical equations for IAI and SS with Greek letters

export const iaiEquation = {
  title: "مؤشر الجاذبية الاستثمارية (IAI)",
  equation: `
    <div class="text-center">
      <div class="mb-3 text-2xl">
        IAI = <span class="text-primary-400">α</span> × <span class="text-accent-400">δ</span> + 
        <span class="text-primary-400">β</span> × <span class="text-accent-400">ρ</span> + 
        <span class="text-primary-400">γ</span> × <span class="text-accent-400">σ</span> + 
        <span class="text-primary-400">θ</span> × <span class="text-accent-400">π</span> + 
        <span class="text-primary-400">λ</span> × <span class="text-accent-400">τ</span>
      </div>
      <div class="text-sm text-white/60">
        مضروباً في عوامل الواقعية والتصحيح
      </div>
    </div>
  `,
  description: "يقيس هذا المؤشر مدى جاذبية الفرصة الاستثمارية بناءً على عوامل متعددة مثل الطلب والعائد والحوكمة والقوة الشرائية والموسمية",
  variables: [
    { symbol: "α (ألفا)", description: "وزن الطلب = 40%" },
    { symbol: "β (بيتا)", description: "وزن العائد على الاستثمار = 20%" },
    { symbol: "γ (جاما)", description: "وزن الحوكمة = 15%" },
    { symbol: "θ (ثيتا)", description: "وزن القوة الشرائية = 15%" },
    { symbol: "λ (لامدا)", description: "وزن الموسمية = 10%" },
    { symbol: "δ (دلتا)", description: "الطلب المعياري المحسوب" },
    { symbol: "ρ (رو)", description: "العائد على الاستثمار المعياري" },
    { symbol: "σ (سيجما)", description: "عامل الحوكمة المعياري" },
    { symbol: "π (باي)", description: "عامل القوة الشرائية" },
    { symbol: "τ (تاو)", description: "عامل الموسمية المحسوب" }
  ]
};

export const ssEquation = {
  title: "مؤشر الاستدامة (SS)",
  equation: `
    <div class="text-center">
      <div class="mb-3 text-2xl">
        SS = <span class="text-accent-400">(ρ<sub>adj</sub> × Ω)</span> / <span class="text-red-400">(Ψ + Κ + Η)</span>
      </div>
      <div class="text-sm text-white/60">
        العائد المعدل مقسوماً على مجموع المخاطر والتكاليف
      </div>
    </div>
  `,
  description: "يقيس هذا المؤشر مدى استدامة الاستثمار على المدى الطويل بحساب نسبة العائد المعدل إلى إجمالي المخاطر والتكاليف",
  variables: [
    { symbol: "ρ_adj (رو المعدل)", description: "العائد على الاستثمار المعدل بالنمو والتضخم" },
    { symbol: "Ω (أوميجا)", description: "مكافأة نضج السوق" },
    { symbol: "Ψ (بساي)", description: "إجمالي عوامل المخاطرة" },
    { symbol: "Κ (كابا)", description: "التكاليف التشغيلية المعدلة" },
    { symbol: "Η (إيتا)", description: "العوائق التنظيمية والبيروقراطية" }
  ]
};

export const confidenceEquation = {
  title: "معدل الثقة (Confidence Rate)",
  equation: `
    <div class="text-center">
      <div class="mb-3 text-2xl">
        CR = <span class="text-green-400">f(IAI, SS)</span>
      </div>
      <div class="text-sm text-white/60">
        دالة مركبة من مؤشر الجاذبية ومؤشر الاستدامة
      </div>
    </div>
  `,
  description: "يحسب معدل الثقة الإجمالي في الاستثمار بناءً على مزيج من مؤشر الجاذبية ومؤشر الاستدامة مع تطبيق عوامل تصحيحية",
  variables: [
    { symbol: "IAI", description: "مؤشر الجاذبية الاستثمارية" },
    { symbol: "SS", description: "مؤشر الاستدامة" },
    { symbol: "f", description: "دالة تركيبية تجمع بين المؤشرين" }
  ]
};
export const getEquationData = (type) => {
  const defaultData = {
    title: "تحليل رياضي",
    equation: "<div>قيد التحديث...</div>",
    description: "جاري تحميل البيانات...",
    variables: []
  };

  switch (type) {
    case "iai":
      return iaiEquation || defaultData;
    case "ss":
      return ssEquation || defaultData;
    case "confidence":
      return confidenceEquation || defaultData;
    default:
      return defaultData;
  }
};
