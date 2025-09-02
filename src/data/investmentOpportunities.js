// بيانات الفرص الاستثمارية في محافظة ظفار
// هذه البيانات مبنية على التحليل العام للقطاعات والعقود والقيود والتراخيص

export const investmentOpportunities = {
  // قطاع الثروة السمكية
  fisheries: {
    id: "fisheries",
    name: "قطاع الثروة السمكية",
    category: "fisheries",
    icon: "🐟",
    description: "قطاع واعد مع إمكانيات تصدير كبيرة وطلب عالمي متزايد",
    priority: "عالية",
    sustainability: "مستدام بيئياً",

    // الأرقام الأساسية
    marketData: {
      totalOmanContribution: 1500000000, // 1.5 مليار دولار
      dhofarShare: 0.35, // 35% من الإنتاج الكلي
      dhofarProduction: 525000000, // 525 مليون دولار
      exportValue: 180000000, // 180 مليون دولار سنوياً
      mainSpecies: ["أسماك التونة", "الساردين", "الشعري", "الهامور"],
      exportMarkets: ["الولايات المتحدة", "اليابان", "تايلاند", "دول الخليج"],
      seasonalProduction: {
        peak: "أكتوبر - مارس",
        moderate: "أبريل - سبتمبر",
      },
      employmentOpportunities: 2500,
    },

    // إحصائيات النجاح
    successMetrics: {
      marketGrowthRate: 0.08, // 8% نمو سنوي
      exportGrowth: 0.12, // 12% نمو في الصادرات
      localDemandGrowth: 0.06, // 6% نمو في الطلب المحلي
      profitMargins: { min: 0.18, max: 0.35 },
    },

    // فرص الاستثمار
    opportunities: [
      {
        id: "fish_processing_plant",
        name: "مصنع تعبئة وتصدير أسماك",
        description:
          "مصنع متكامل لتجهيز وتعبئة الأسماك للتصدير مع تقنيات التبريد الحديثة",
        capitalRange: {
          min: 150000, // 150,000 ريال عماني
          max: 250000, // 250,000 ريال عماني
        },
        expectedROI: {
          min: 0.2, // 20%
          max: 0.35, // 35%
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 25000, max: 45000 },
        operatingCosts: { monthly: 18000 },
        employmentCapacity: 25,
        productionCapacity: "50 طن يومياً",
        targetMarkets: ["الأسواق المحلية", "دول الخليج", "آسيا"],
        competitiveAdvantages: [
          "موقع استراتيجي قريب من مناطق الصيد",
          "مرافق ميناء صلالة المتطورة",
          "تكاليف عمالة تنافسية",
          "جودة الأسماك المحلية",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الثروة الزراعية والسمكية",
          "بلدية ظفار",
          "شرطة عمان السلطانية",
        ],
        requirements: [
          "ترخيص مصنع تجهيز أسماك",
          "شهادة سلامة غذائية (HACCP)",
          "ترخيص تصدير",
          "تصريح بيئي",
          "شهادة مطابقة دولية (ISO 22000)",
        ],
        timeline: {
          licensing: "2-3 أشهر",
          construction: "8-12 شهر",
          operationalSetup: "2-3 أشهر",
        },
      },
      {
        id: "fishing_boats_fleet",
        name: "أسطول قوارب صيد حديثة",
        description: "استثمار في أسطول قوارب صيد مجهزة بأحدث التقنيات والمعدات",
        capitalRange: {
          min: 200000,
          max: 350000,
        },
        expectedROI: {
          min: 0.25,
          max: 0.4,
        },
        paybackPeriod: "2-4 سنوات",
        riskLevel: "متوسط إلى عالي",
        monthlyRevenue: { min: 35000, max: 60000 },
        operatingCosts: { monthly: 22000 },
        employmentCapacity: 40,
        fleetSize: "5-8 قوارب",
        targetSpecies: ["التونة", "الشعري", "الهامور"],
        permits: [
          "وزارة الثروة الزراعية والسمكية",
          "خفر السواحل العماني",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص صيد تجاري",
          "تراخيص قوارب",
          "شهادات سلامة بحرية",
          "تأمين شامل للأسطول",
        ],
      },
      {
        id: "aquaculture_farm",
        name: "مزرعة استزراع سمكي",
        description: "مزرعة حديثة لاستزراع الأسماك والجمبري في بيئة مراقبة",
        capitalRange: {
          min: 120000,
          max: 200000,
        },
        expectedROI: {
          min: 0.18,
          max: 0.28,
        },
        paybackPeriod: "4-6 سنوات",
        riskLevel: "منخفض إلى متوسط",
        monthlyRevenue: { min: 20000, max: 35000 },
        operatingCosts: { monthly: 15000 },
        employmentCapacity: 15,
        productionCapacity: "200 طن سنوياً",
        specialtyProducts: ["الجمبري", "السلمون", "البلطي"],
        permits: [
          "وزارة الثروة الزراعية والسمكية",
          "وزارة البيئة والشؤون المناخية",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص استزراع مائي",
          "تقييم الأثر البيئي",
          "تصريح استخدام المياه",
          "شهادة جودة المياه",
        ],
      },
    ],
  },

  // قطاع الزراعة
  agriculture: {
    id: "agriculture",
    name: "قطاع الزراعة",
    category: "agriculture",
    icon: "🥭",
    description:
      "إنتاج الموز والنارجيل واللبان والفواكه الموسمية مع تنوع زراعي فريد",
    priority: "عالية",
    sustainability: "مستدام ومتجدد",

    marketData: {
      localMarketValue: 200000000, // 200 مليون ريال عماني سنوياً
      bananaProductionShare: 0.6, // 60% من إنتاج عمان
      seasonalProducts: [
        "الموز",
        "النارجيل",
        "اللبان",
        "الفواكه الموسمية",
        "البابايا",
        "المانجو",
      ],
      organicPremium: 0.3, // 30% زيادة في الأسعار للمنتجات العضوية
      exportPotential: 85000000, // 85 مليون ريال عماني سنوياً
      waterAvailability: "وفيرة خلال موسم الخريف",
      soilQuality: "ممتازة للزراعة الاستوائية",
      climateAdvantage: "مناخ فريد مناسب للزراعة الاستوائية",
      employmentOpportunities: 1800,
    },

    successMetrics: {
      marketGrowthRate: 0.06, // 6% نمو سنوي
      organicMarketGrowth: 0.15, // 15% نمو في السوق العضوية
      exportGrowth: 0.1, // 10% نمو في الصادرات
      profitMargins: { min: 0.15, max: 0.3 },
    },

    opportunities: [
      {
        id: "commercial_farm_packaging",
        name: "مشروع مزارع تجارية + تعبئة وتغليف",
        description:
          "مزارع تجارية حديثة مع وحدة تعبئة وتغليف للمنتجات الزراعية العضوية",
        capitalRange: {
          min: 100000, // 100,000 ريال عماني
          max: 180000, // 180,000 ريال عماني
        },
        expectedROI: {
          min: 0.15, // 15%
          max: 0.25, // 25%
        },
        paybackPeriod: "4-6 سنوات",
        riskLevel: "منخفض إلى متوسط",
        monthlyRevenue: { min: 15000, max: 28000 },
        operatingCosts: { monthly: 12000 },
        employmentCapacity: 20,
        farmSize: "50-100 فدان",
        mainCrops: ["الموز", "البابايا", "المانجو", "النارجيل"],
        seasonalAdvantages: [
          "مياه وفيرة خلال الخريف",
          "مناخ معتدل ومناسب",
          "تربة خصبة طبيعياً",
          "طلب سياحي عالي",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الثروة الزراعية والسمكية",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص مزرعة تجارية",
          "شهادة منتج عضوي (اختياري)",
          "ترخيص تعبئة وتغليف",
          "تصريح استخدام المياه",
          "شهادة جودة التربة",
        ],
        timeline: {
          licensing: "1-2 شهر",
          farmSetup: "6-8 أشهر",
          firstHarvest: "12-18 شهر",
        },
      },
      {
        id: "frankincense_plantation",
        name: "مزرعة أشجار اللبان التجارية",
        description:
          "استثمار في زراعة أشجار اللبان الأصلية لإنتاج اللبان عالي الجودة",
        capitalRange: {
          min: 80000,
          max: 150000,
        },
        expectedROI: {
          min: 0.2,
          max: 0.35,
        },
        paybackPeriod: "5-7 سنوات",
        riskLevel: "منخفض",
        monthlyRevenue: { min: 10000, max: 20000 },
        operatingCosts: { monthly: 6000 },
        employmentCapacity: 12,
        treeCapacity: "1000-2000 شجرة",
        uniqueAdvantages: [
          "منتج أصلي ومحلي فريد",
          "طلب عالمي متزايد",
          "قيمة تراثية وثقافية",
          "هوامش ربح عالية",
        ],
        permits: [
          "وزارة الثروة الزراعية والسمكية",
          "وزارة التراث والسياحة",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص زراعة أشجار اللبان",
          "تصريح حماية التراث الطبيعي",
          "شهادة منشأ للبان العماني",
          "ترخيص تجارة منتجات تراثية",
        ],
      },
      {
        id: "tropical_fruits_greenhouse",
        name: "بيوت محمية للفواكه الاستوائية",
        description:
          "بيوت محمية حديثة لإنتاج الفواكه الاستوائية على مدار السنة",
        capitalRange: {
          min: 120000,
          max: 200000,
        },
        expectedROI: {
          min: 0.18,
          max: 0.28,
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 18000, max: 32000 },
        operatingCosts: { monthly: 14000 },
        employmentCapacity: 15,
        productionCapacity: "500 كيلو يومياً",
        targetProducts: [
          "الفراولة",
          "الطماطم الكرزية",
          "الخيار",
          "الفلفل الملون",
        ],
        technologyFeatures: [
          "نظام ري ذكي",
          "تحكم في المناخ",
          "إنتاج طوال السنة",
          "جودة عالية ومتسقة",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الثروة الزراعية والسمكية",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص بيوت محمية",
          "تصريح تركيب معدات",
          "شهادة سلامة المنتجات",
          "ترخيص نظام الري",
        ],
      },
    ],
  },

  // قطاع السياحة
  tourism: {
    id: "tourism",
    name: "قطاع السياحة",
    category: "tourism",
    icon: "🏨",
    description: "قطاع سياحي مزدهر خاصة في موسم الخريف مع إمكانيات هائلة للنمو",
    priority: "عالية جداً",
    sustainability: "مستدام سياحياً",

    marketData: {
      khareef2023Visitors: 950000, // 950,000 زائر
      expectedGrowth2024: 1200000, // 1.2 مليون زائر متوقع
      averageSpendingPerVisitor: 150, // 150 ريال عماني
      totalSpending: 142500000, // 142.5 مليون ريال عماني
      peakSeason: "يونيو - سبتمبر",
      offSeasonPotential: "40% من الطاقة الاستيعابية",
      internationalVisitors: 0.35, // 35% زوار دوليين
      gccVisitors: 0.45, // 45% زوار خليجيين
      domesticVisitors: 0.2, // 20% زوار محليين
      averageStayDuration: 4.5, // 4.5 أيام
      repeatVisitorRate: 0.3, // 30% زوار عائدين
      employmentOpportunities: 3500,
    },

    successMetrics: {
      marketGrowthRate: 0.12, // 12% نمو سنوي
      revenueGrowth: 0.15, // 15% نمو في الإيرادات
      occupancyRates: { peak: 0.85, offSeason: 0.45 },
      profitMargins: { min: 0.25, max: 0.55 },
    },

    opportunities: [
      {
        id: "small_hotel_apartments",
        name: "شقق فندقية صغيرة",
        description:
          "شقق فندقية صغيرة مجهزة بالكامل (20-30 غرفة) مع خدمات فندقية متميزة",
        capitalRange: {
          min: 250000, // 250,000 ريال عماني
          max: 400000, // 400,000 ريال عماني
        },
        expectedROI: {
          min: 0.3, // 30% في موسم الخريف
          max: 0.5, // 50% في موسم الخريف
        },
        seasonalRevenue: {
          min: 120000, // 120,000 ريال عماني
          max: 200000, // 200,000 ريال عماني
        },
        paybackPeriod: "2-4 سنوات",
        riskLevel: "متوسط",
        roomCapacity: "20-30 غرفة",
        occupancyRates: { peak: 0.9, offSeason: 0.4 },
        monthlyRevenue: { peak: 45000, offSeason: 18000 },
        operatingCosts: { monthly: 25000 },
        employmentCapacity: 18,
        uniqueFeatures: [
          "مطبخ مجهز في كل وحدة",
          "خدمات فندقية متكاملة",
          "موقع استراتيجي قريب من المعالم",
          "تصميم يتماشى مع الطابع المحلي",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة التراث والسياحة",
          "بلدية ظفار",
          "شرطة عمان السلطانية",
        ],
        requirements: [
          "ترخيص فندق",
          "شهادة سلامة وأمان",
          "ترخيص بناء",
          "تصريح إقامة سياحية",
          "شهادة جودة الخدمة",
        ],
        timeline: {
          licensing: "2-3 أشهر",
          construction: "12-18 شهر",
          furnishing: "2-3 أشهر",
          operationalLaunch: "1 شهر",
        },
      },
      {
        id: "eco_camping_resort",
        name: "منتجع تخييم بيئي",
        description: "منتجع تخييم فاخر صديق للبيئة في المناطق الطبيعية الخلابة",
        capitalRange: {
          min: 180000,
          max: 300000,
        },
        expectedROI: {
          min: 0.35,
          max: 0.6,
        },
        paybackPeriod: "2-3 سنوات",
        riskLevel: "متوسط إلى عالي",
        monthlyRevenue: { peak: 40000, offSeason: 15000 },
        operatingCosts: { monthly: 20000 },
        employmentCapacity: 15,
        capacity: "40-60 خيمة فاخرة",
        targetMarket: ["محبي الطبيعة", "المغامرين", "العائلات"],
        ecoFeatures: [
          "طاقة شمسية 100%",
          "إعادة تدوير المياه",
          "مواد بناء محلية",
          "برامج توعية بيئية",
        ],
        permits: [
          "وزارة التراث والسياحة",
          "وزارة البيئة والشؤون المناخية",
          "بلدية ظفار",
          "وزارة التجارة والصناعة وترويج الاستثمار",
        ],
        requirements: [
          "ترخيص منتجع سياحي",
          "تقييم الأثر البيئي",
          "تصريح استخدام الأراضي",
          "شهادة سياحة بيئية",
        ],
      },
      {
        id: "adventure_tourism_center",
        name: "مركز السياحة المغامرة",
        description: "مركز متخصص في أنشطة المغامرة والرياضات الخارجية",
        capitalRange: {
          min: 150000,
          max: 250000,
        },
        expectedROI: {
          min: 0.25,
          max: 0.4,
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { peak: 35000, offSeason: 12000 },
        operatingCosts: { monthly: 18000 },
        employmentCapacity: 20,
        activities: [
          "تسلق الجبال",
          "رحلات السفاري",
          "الغوص والأنشطة البحرية",
          "جولات الطبيعة",
          "الطيران الشراعي",
        ],
        targetMarket: ["الشباب", "المغامرين", "السياح الدوليين"],
        permits: [
          "وزارة التراث والسياحة",
          "الشرطة السياحية",
          "بلدية ظفار",
          "خفر السواحل (للأنشطة البحرية)",
        ],
        requirements: [
          "ترخيص أنشطة سياحية",
          "شهادات سلامة للمعدات",
          "تراخيص مرشدين معتمدين",
          "تأمين شامل للأنشطة",
        ],
      },
      {
        id: "cultural_heritage_center",
        name: "مركز التراث الثقافي التفاعلي",
        description: "مركز تفاعلي لعرض التراث العماني والثقافة المحلية",
        capitalRange: {
          min: 200000,
          max: 350000,
        },
        expectedROI: {
          min: 0.2,
          max: 0.3,
        },
        paybackPeriod: "4-6 سنوات",
        riskLevel: "منخفض إلى متوسط",
        monthlyRevenue: { peak: 30000, offSeason: 15000 },
        operatingCosts: { monthly: 20000 },
        employmentCapacity: 25,
        attractions: [
          "متحف تفاعلي للتراث",
          "ورش حرف يدوية",
          "عروض تراثية",
          "متجر للحرف المحلية",
          "مطعم تراثي",
        ],
        educationalValue: "عالية جداً",
        permits: [
          "وزارة التراث والسياحة",
          "وزارة التربية والتعليم",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص مركز ثقافي",
          "ترخيص متحف",
          "تصريح عروض تراثية",
          "شهادة حفظ التراث",
        ],
      },
    ],
  },

  // قطاع النقل والخدمات اللوجستية
  logistics: {
    id: "logistics",
    name: "قطاع النقل والخدمات اللوجستية",
    category: "logistics",
    icon: "🚚",
    description: "خدمات النقل واللوجستيات مع ميناء صلالة كمحور رئيسي للتجارة",
    priority: "عالية",
    sustainability: "مستدام اقتصادياً",

    marketData: {
      salalahPortContainers: 4300000, // 4.3 مليون حاوية سنوياً
      portCapacity: "أكبر موانئ المنطقة",
      growthRate: 0.08, // 8% نمو سنوي
      strategicLocation: "ممر تجاري رئيسي بين آسيا وأوروبا وأفريقيا",
      transportationDemand: 850000000, // 850 مليون ريال عماني سنوياً
      warehousingDemand: 320000000, // 320 مليون ريال عماني سنوياً
      lastMileDelivery: 180000000, // 180 مليون ريال عماني سنوياً
      crossBorderTrade: 1200000000, // 1.2 مليار ريال عماني
      employmentOpportunities: 4200,
    },

    successMetrics: {
      marketGrowthRate: 0.1, // 10% نمو سنوي
      digitalTransformation: 0.35, // 35% تبني رقمي
      efficiency: 0.88, // 88% كفاءة العمليات
      profitMargins: { min: 0.15, max: 0.3 },
    },

    opportunities: [
      {
        id: "trucking_cold_storage",
        name: "شركة شاحنات + مستودعات تبريد للأغذية",
        description:
          "خدمات نقل متكاملة مع مستودعات تبريد متطورة للأغذية والمواد الحساسة",
        capitalRange: {
          min: 300000, // 300,000 ريال عماني
          max: 500000, // 500,000 ريال عماني
        },
        expectedROI: {
          min: 0.18, // 18%
          max: 0.28, // 28%
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 45000, max: 75000 },
        operatingCosts: { monthly: 35000 },
        employmentCapacity: 35,
        fleetSize: "15-25 شاحنة متخصصة",
        storageCapacity: "5000-8000 متر مكعب",
        targetMarkets: ["الأسواق المحلية", "دول الخليج", "أفريقيا"],
        competitiveAdvantages: [
          "موقع استراتيجي قريب من الميناء",
          "تقنيات تبريد متطورة",
          "شبكة توزيع واسعة",
          "معايير سلامة عالية",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة النقل والاتصالات",
          "بلدية ظفار",
          "شرطة عمان السلطانية",
        ],
        requirements: [
          "ترخيص نقل بضائع",
          "ترخيص مستودع تبريد",
          "شهادة سلامة غذائية (HACCP)",
          "تصريح ميناء صلالة",
          "تراخيص قيادة متخصصة",
        ],
        timeline: {
          licensing: "2-3 أشهر",
          procurement: "4-6 أشهر",
          facilitySetup: "6-8 أشهر",
          operationalLaunch: "2 شهر",
        },
      },
      {
        id: "ecommerce_logistics_hub",
        name: "مركز لوجستيات التجارة الإلكترونية",
        description: "مركز متخصص في خدمات التجارة الإلكترونية والتوصيل السريع",
        capitalRange: {
          min: 200000,
          max: 350000,
        },
        expectedROI: {
          min: 0.22,
          max: 0.35,
        },
        paybackPeriod: "2-4 سنوات",
        riskLevel: "متوسط إلى عالي",
        monthlyRevenue: { min: 35000, max: 60000 },
        operatingCosts: { monthly: 25000 },
        employmentCapacity: 45,
        services: [
          "خدمات الميل الأخير",
          "مستودعات ذكية",
          "تغليف وإعادة تغليف",
          "إدارة المخزون",
          "خدمات الإرجاع",
        ],
        technologyFeatures: [
          "نظام إدارة المستودعات (WMS)",
          "تتبع الشحنات بالوقت الفعلي",
          "الأتمتة والذكاء الاصطناعي",
          "تطبيق جوال للعملاء",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة النقل والاتصالات",
          "هيئة تنظيم الاتصالات",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص خدمات لوجستية",
          "ترخيص مستودع",
          "تصريح أنظمة تقنية",
          "شهادة أمان المعلومات",
        ],
      },
      {
        id: "freight_forwarding_company",
        name: "شركة وساطة الشحن الدولي",
        description: "شركة متخصصة في تنسيق الشحن الدولي وخدمات التخليص الجمركي",
        capitalRange: {
          min: 150000,
          max: 250000,
        },
        expectedROI: {
          min: 0.25,
          max: 0.4,
        },
        paybackPeriod: "2-3 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 30000, max: 50000 },
        operatingCosts: { monthly: 20000 },
        employmentCapacity: 20,
        services: [
          "تنسيق الشحن البحري والجوي",
          "التخليص الجمركي",
          "التأمين على البضائع",
          "خدمات التوثيق",
          "استشارات التجارة الدولية",
        ],
        globalConnections: [
          "خطوط شحن رئيسية",
          "موانئ عالمية",
          "شركاء دوليين",
          "شبكة وكلاء عالمية",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "الجمارك العمانية",
          "ميناء صلالة",
          "مطار صلالة",
        ],
        requirements: [
          "ترخيص وساطة شحن",
          "ترخيص تخليص جمركي",
          "شهادات مناولة البضائع",
          "تأمين مسؤولية مهنية",
        ],
      },
      {
        id: "smart_parking_solutions",
        name: "حلول مواقف السيارات الذكية",
        description: "شركة متخصصة في تطوير وإدارة أنظمة المواقف الذكية",
        capitalRange: {
          min: 180000,
          max: 300000,
        },
        expectedROI: {
          min: 0.2,
          max: 0.32,
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 25000, max: 45000 },
        operatingCosts: { monthly: 18000 },
        employmentCapacity: 15,
        solutions: [
          "مواقف ذكية متعددة الطوابق",
          "أنظمة دفع إلكترونية",
          "تطبيق حجز مواقف",
          "مواقف آلية",
          "إدارة مواقف الأحداث",
        ],
        targetLocations: [
          "المراكز التجارية",
          "المناطق السياحية",
          "المؤسسات الحكومية",
          "المطارات والموانئ",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "بلدية ظفار",
          "وزارة النقل والاتصالات",
          "هيئة تنظيم الاتصالات",
        ],
        requirements: [
          "ترخيص تشغيل مواقف",
          "تصريح تركيب أنظمة",
          "شهادة أمان تقني",
          "ترخيص تطبيق جوال",
        ],
      },
    ],
  },

  // قطاع الصناعة التحويلية
  manufacturing: {
    id: "manufacturing",
    name: "قطاع الصناعة التحويلية",
    category: "manufacturing",
    icon: "🏭",
    description:
      "صناعات تحويلية متنوعة مع تركيز على القيمة المضافة للمنتجات المحلية",
    priority: "عالية",
    sustainability: "صناعات نظيفة ومستدامة",

    marketData: {
      cementProduction: 2000000, // 2 مليون طن سنوياً
      foodProcessingMarket: 450000000, // 450 مليون ريال عماني
      juiceMarket: 85000000, // 85 مليون ريال عماني
      packagingDemand: 120000000, // 120 مليون ريال عماني
      localRawMaterials: "وفرة في المواد الزراعية والسمكية",
      exportPotential: 280000000, // 280 مليون ريال عماني
      industrialZones: 3, // 3 مناطق صناعية
      employmentOpportunities: 2800,
    },

    successMetrics: {
      marketGrowthRate: 0.09, // 9% نمو سنوي
      valueAddedProducts: 0.65, // 65% منتجات ذات قيمة مضافة
      exportGrowth: 0.14, // 14% نمو في الصادرات
      profitMargins: { min: 0.18, max: 0.35 },
    },

    opportunities: [
      {
        id: "natural_juice_packaging",
        name: "مصنع عصائر الفواكه الطبيعية المتطور",
        description:
          "مصنع حديث لإنتاج وتعبئة العصائر الطبيعية من الفواكه المحلية مع تقنيات الحفظ المتطورة",
        capitalRange: {
          min: 120000, // 120,000 ريال عماني
          max: 200000, // 200,000 ريال عماني
        },
        expectedROI: {
          min: 0.2, // 20%
          max: 0.3, // 30%
        },
        paybackPeriod: "3-4 سنوات",
        riskLevel: "منخفض إلى متوسط",
        monthlyRevenue: { min: 20000, max: 35000 },
        operatingCosts: { monthly: 15000 },
        employmentCapacity: 20,
        productionCapacity: "10,000 لتر يومياً",
        mainProducts: [
          "عصير المانجو",
          "عصير الجوافة",
          "عصير البابايا",
          "مشروبات مختلطة",
        ],
        technologyFeatures: [
          "تقنيات البسترة الباردة",
          "تعبئة بدون مواد حافظة",
          "نظام ضمان الجودة الآلي",
          "تغليف صديق للبيئة",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الصحة",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص مصنع أغذية",
          "شهادة سلامة غذائية (HACCP)",
          "ترخيص تعبئة وتغليف",
          "تصريح بيئي",
          "شهادة جودة دولية (ISO 22000)",
        ],
        timeline: {
          licensing: "2-3 أشهر",
          equipmentProcurement: "4-6 أشهر",
          facilitySetup: "3-4 أشهر",
          operationalLaunch: "1 شهر",
        },
      },
      {
        id: "fish_by_products_processing",
        name: "مصنع تصنيع مشتقات الأسماك",
        description:
          "مصنع متخصص في إنتاج زيت السمك، دقيق السمك، والمكملات الغذائية من مخلفات الأسماك",
        capitalRange: {
          min: 180000,
          max: 280000,
        },
        expectedROI: {
          min: 0.25,
          max: 0.4,
        },
        paybackPeriod: "3-5 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 30000, max: 50000 },
        operatingCosts: { monthly: 22000 },
        employmentCapacity: 25,
        mainProducts: [
          "زيت السمك عالي الجودة",
          "دقيق السمك للأعلاف",
          "مكملات أوميغا 3",
          "الكولاجين البحري",
        ],
        sustainabilityAdvantages: [
          "استخدام مخلفات الأسماك",
          "تقليل النفايات البحرية",
          "منتجات عالية القيمة",
          "صديق للبيئة",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الثروة الزراعية والسمكية",
          "وزارة الصحة",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص تصنيع مشتقات بحرية",
          "شهادة سلامة غذائية",
          "تصريح بيئي متخصص",
          "شهادة جودة دولية",
        ],
      },
      {
        id: "frankincense_cosmetics_factory",
        name: "مصنع مستحضرات التجميل من اللبان",
        description:
          "مصنع متخصص في إنتاج مستحضرات التجميل والعناية الطبيعية من اللبان العماني",
        capitalRange: {
          min: 150000,
          max: 250000,
        },
        expectedROI: {
          min: 0.3,
          max: 0.45,
        },
        paybackPeriod: "2-4 سنوات",
        riskLevel: "متوسط إلى عالي",
        monthlyRevenue: { min: 25000, max: 42000 },
        operatingCosts: { monthly: 18000 },
        employmentCapacity: 18,
        productRange: [
          "كريمات مكافحة الشيخوخة",
          "زيوت العناية بالبشرة",
          "صابون طبيعي فاخر",
          "عطور ومنتجات عطرية",
          "منتجات العناية بالشعر",
        ],
        marketAdvantages: [
          "منتج أصلي وفريد عالمياً",
          "طلب عالمي متزايد",
          "هوامش ربح عالية",
          "قيمة تراثية مضافة",
        ],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "وزارة الصحة",
          "وزارة التراث والسياحة",
          "بلدية ظفار",
        ],
        requirements: [
          "ترخيص مصنع مستحضرات تجميل",
          "شهادة سلامة المنتجات",
          "ترخيص استخدام اللبان التراثي",
          "شهادات جودة دولية",
        ],
      },
    ],
  },

  // قطاع التكنولوجيا والابتكار
  technology: {
    id: "technology",
    name: "قطاع التكنولوجيا والابتكار",
    category: "technology",
    icon: "💻",
    description: "قطاع تقني ناشئ مع إمكانيات كبيرة للنمو والابتكار",
    priority: "متوسطة إلى عالية",
    sustainability: "مستدام ومبتكر",

    marketData: {
      digitalTransformationBudget: 180000000, // 180 مليون ريال عماني
      startupEcosystem: "ناشئ ومتنامي",
      governmentSupport: "دعم حكومي قوي",
      internetPenetration: 0.95, // 95% انتشار الإنترنت
      smartphoneAdoption: 0.88, // 88% استخدام الهواتف الذكية
      ecommerceGrowth: 0.25, // 25% نمو سنوي
      employmentOpportunities: 1200,
    },

    successMetrics: {
      marketGrowthRate: 0.18, // 18% نمو سنوي
      innovationIndex: 0.72, // 72% مؤشر الابتكار
      digitalAdoption: 0.68, // 68% التبني الرقمي
      profitMargins: { min: 0.25, max: 0.6 },
    },

    opportunities: [
      {
        id: "tourism_tech_platform",
        name: "منصة تقنية شاملة للسياحة",
        description:
          "منصة رقمية متكاملة لخدمات السياحة تشمل الحجوزات والجولات والأنشطة",
        capitalRange: {
          min: 80000,
          max: 150000,
        },
        expectedROI: {
          min: 0.3,
          max: 0.6,
        },
        paybackPeriod: "2-3 سنوات",
        riskLevel: "متوسط إلى عالي",
        monthlyRevenue: { min: 15000, max: 35000 },
        operatingCosts: { monthly: 12000 },
        employmentCapacity: 12,
        platformFeatures: [
          "حجز الفنادق والمنتجعات",
          "تنظيم الجولات السياحية",
          "حجز الأنشطة والتجارب",
          "دليل تفاعلي للمعالم",
          "خدمات النقل والمواصلات",
        ],
        targetUsers: ["السياح الدوليين", "الزوار المحليين", "شركات السياحة"],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "هيئة تنظيم الاتصالات",
          "وزارة التراث والسياحة",
        ],
        requirements: [
          "ترخيص شركة تقنية",
          "ترخيص منصة إلكترونية",
          "شهادة أمان المعلومات",
          "ترخيص خدمات دفع إلكتروني",
        ],
      },
      {
        id: "smart_agriculture_solutions",
        name: "حلول الزراعة الذكية",
        description:
          "شركة تقنية متخصصة في تطوير حلول إنترنت الأشياء للزراعة الذكية",
        capitalRange: {
          min: 100000,
          max: 180000,
        },
        expectedROI: {
          min: 0.25,
          max: 0.45,
        },
        paybackPeriod: "3-4 سنوات",
        riskLevel: "متوسط",
        monthlyRevenue: { min: 18000, max: 32000 },
        operatingCosts: { monthly: 14000 },
        employmentCapacity: 15,
        solutions: [
          "أنظمة الري الذكية",
          "مراقبة التربة والمناخ",
          "تطبيقات إدارة المزارع",
          "أنظمة إنذار مبكر",
          "تحليل البيانات الزراعية",
        ],
        targetMarket: ["المزارع التجارية", "البيوت المحمية", "المزارع الصغيرة"],
        permits: [
          "وزارة التجارة والصناعة وترويج الاستثمار",
          "هيئة تنظيم الاتصالات",
          "وزارة الثروة الزراعية والسمكية",
        ],
        requirements: [
          "ترخيص شركة تقنية",
          "شهادة معدات إنترنت الأشياء",
          "ترخيص استشارات زراعية",
          "شهادة أنظمة ذكية",
        ],
      },
    ],
  },
};

// دالة للحصول على جميع الفرص الاستثمارية
export const getAllInvestmentOpportunities = () => {
  return Object.values(investmentOpportunities);
};

// دالة للحصول على فرصة استثمارية محددة
export const getInvestmentOpportunity = (id) => {
  return investmentOpportunities[id];
};

// دالة للحصول على الفرص حسب الفئة
export const getOpportunitiesByCategory = (category) => {
  return Object.values(investmentOpportunities).filter(
    (opportunity) => opportunity.category === category
  );
};

// دالة للحصول على إحصائيات عامة
export const getInvestmentStats = () => {
  const opportunities = getAllInvestmentOpportunities();

  return {
    totalSectors: opportunities.length,
    totalOpportunities: opportunities.reduce(
      (sum, sector) => sum + sector.opportunities.length,
      0
    ),
    averageCapitalRange: {
      min: Math.round(
        opportunities.reduce(
          (sum, sector) =>
            sum +
            sector.opportunities.reduce(
              (s, opp) => s + opp.capitalRange.min,
              0
            ),
          0
        ) /
          opportunities.reduce(
            (sum, sector) => sum + sector.opportunities.length,
            0
          )
      ),
      max: Math.round(
        opportunities.reduce(
          (sum, sector) =>
            sum +
            sector.opportunities.reduce(
              (s, opp) => s + opp.capitalRange.max,
              0
            ),
          0
        ) /
          opportunities.reduce(
            (sum, sector) => sum + sector.opportunities.length,
            0
          )
      ),
    },
    averageROI: {
      min: Math.round(
        (opportunities.reduce(
          (sum, sector) =>
            sum +
            sector.opportunities.reduce((s, opp) => s + opp.expectedROI.min, 0),
          0
        ) /
          opportunities.reduce(
            (sum, sector) => sum + sector.opportunities.length,
            0
          )) *
          100
      ),
      max: Math.round(
        (opportunities.reduce(
          (sum, sector) =>
            sum +
            sector.opportunities.reduce((s, opp) => s + opp.expectedROI.max, 0),
          0
        ) /
          opportunities.reduce(
            (sum, sector) => sum + sector.opportunities.length,
            0
          )) *
          100
      ),
    },
  };
};

// بيانات التراخيص المطلوبة
export const requiredLicenses = {
  moci: {
    name: "وزارة التجارة والصناعة وترويج الاستثمار",
    arabicName: "وزارة التجارة والصناعة وترويج الاستثمار",
    englishName: "Ministry of Commerce, Industry and Investment Promotion",
    website: "https://www.moci.gov.om",
    description: "التراخيص التجارية والصناعية",
  },
  maf: {
    name: "وزارة الثروة الزراعية والسمكية",
    arabicName: "وزارة الثروة الزراعية والسمكية",
    englishName: "Ministry of Agriculture and Fisheries",
    website: "https://www.maf.gov.om",
    description: "تراخيص الزراعة والثروة السمكية",
  },
  mht: {
    name: "وزارة التراث والسياحة",
    arabicName: "وزارة التراث والسياحة",
    englishName: "Ministry of Heritage and Tourism",
    website: "https://www.mht.gov.om",
    description: "تراخيص السياحة والتراث",
  },
  dhofarMunicipality: {
    name: "بلدية ظفار",
    arabicName: "بلدية ظفار",
    englishName: "Dhofar Municipality",
    website: "https://www.dhofar.gov.om",
    description: "تراخيص البناء والتشغيل",
  },
  rso: {
    name: "شرطة عمان السلطانية",
    arabicName: "شرطة عمان السلطانية",
    englishName: "Royal Oman Police",
    website: "https://www.rop.gov.om",
    description: "التصاريح الأمنية",
  },
  motc: {
    name: "وزارة النقل والاتصالات",
    arabicName: "وزارة النقل والاتصالات",
    englishName: "Ministry of Transport and Communications",
    website: "https://www.motc.gov.om",
    description: "تراخيص النقل والاتصالات",
  },
  moh: {
    name: "وزارة الصحة",
    arabicName: "وزارة الصحة",
    englishName: "Ministry of Health",
    website: "https://www.moh.gov.om",
    description: "تراخيص الصحة والسلامة",
  },
};

// قصص النجاح ودراسات الحالة
export const successStories = {
  fisheries: {
    title: "شركة بحار ظفار للأسماك",
    story:
      "بدأت الشركة برأس مال 200,000 ريال عماني في 2019، واليوم تحقق إيرادات سنوية تزيد عن 800,000 ريال عماني مع تصدير منتجاتها لـ 8 دول.",
    keySuccess: [
      "التركيز على الجودة",
      "الاستثمار في التقنيات الحديثة",
      "بناء علاقات طويلة المدى مع العملاء",
    ],
    roi: 0.35,
    employmentCreated: 45,
    timeline: "5 سنوات",
  },
  agriculture: {
    title: "مزارع الخير العضوية",
    story:
      "مشروع عائلي بدأ بـ 120,000 ريال عماني، أصبح اليوم يزود أكبر المتاجر والفنادق في ظفار بالمنتجات العضوية عالية الجودة.",
    keySuccess: [
      "الحصول على شهادات عضوية",
      "التسويق المباشر للمستهلكين",
      "التنويع في المحاصيل",
    ],
    roi: 0.28,
    employmentCreated: 22,
    timeline: "4 سنوات",
  },
  tourism: {
    title: "منتجع الطبيعة البيئي",
    story:
      "منتجع تخييم بيئي بدأ بـ 250,000 ريال عماني، يحقق الآن إشغالاً 90% في موسم الخريف ويساهم في السياحة المستدامة.",
    keySuccess: [
      "التصميم المستدام",
      "التجربة الفريدة للزوار",
      "التسويق الرقمي المبتكر",
    ],
    roi: 0.55,
    employmentCreated: 18,
    timeline: "3 سنوات",
  },
};

// نصائح الاستثمار
export const investmentTips = {
  general: [
    "ادرس السوق جيداً قبل الاستثمار",
    "احرص على الحصول على جميع التراخيص المطلوبة",
    "استعن بخبراء محليين في كل مجال",
    "اعمل على بناء شبكة علاقات قوية",
    "احتفظ بسيولة مالية للطوارئ",
  ],
  dhofar: [
    "استفد من موسم الخريف لتعظيم الأرباح",
    "اعتمد على المنتجات المحلية الأصلية",
    "استهدف السياح والمقيمين على حد سواء",
    "استثمر في التسويق الرقمي",
    "تعاون مع الشركات والمؤسسات المحلية",
  ],
  seasonal: [
    "خطط لموسمية الأعمال في ظفار",
    "طور استراتيجيات للعمل خارج الموسم",
    "استثمر في تحسين الخدمات خلال فترات الركود",
    "نوع مصادر الدخل",
    "استعد مبكراً لموسم الذروة",
  ],
};

// معايير تقييم الاستثمار
export const evaluationCriteria = {
  financial: {
    name: "المعايير المالية",
    criteria: [
      {
        name: "العائد على الاستثمار",
        weight: 0.25,
        description: "النسبة المئوية للعائد السنوي",
      },
      {
        name: "فترة الاسترداد",
        weight: 0.2,
        description: "المدة المطلوبة لاسترداد رأس المال",
      },
      {
        name: "صافي القيمة الحالية",
        weight: 0.15,
        description: "قيمة التدفقات النقدية المستقبلية",
      },
      {
        name: "السيولة المالية",
        weight: 0.1,
        description: "قدرة المشروع على توفير السيولة",
      },
    ],
  },
  market: {
    name: "معايير السوق",
    criteria: [
      {
        name: "حجم السوق",
        weight: 0.2,
        description: "حجم الطلب والفرص المتاحة",
      },
      {
        name: "المنافسة",
        weight: 0.15,
        description: "مستوى المنافسة في السوق",
      },
      {
        name: "النمو المتوقع",
        weight: 0.15,
        description: "معدل نمو السوق المتوقع",
      },
      {
        name: "الحاجز للدخول",
        weight: 0.1,
        description: "صعوبة دخول منافسين جدد",
      },
    ],
  },
  operational: {
    name: "المعايير التشغيلية",
    criteria: [
      {
        name: "توفر المواد الخام",
        weight: 0.15,
        description: "سهولة الحصول على المواد الأولية",
      },
      {
        name: "توفر العمالة المهرة",
        weight: 0.1,
        description: "وجود عمالة مؤهلة ومدربة",
      },
      {
        name: "البنية التحتية",
        weight: 0.1,
        description: "جودة البنية التحتية المطلوبة",
      },
      {
        name: "التراخيص والقوانين",
        weight: 0.1,
        description: "سهولة الحصول على التراخيص",
      },
    ],
  },
};

// توقعات السوق للسنوات القادمة
export const marketForecasts = {
  2024: {
    totalMarketValue: 2800000000, // 2.8 مليار ريال عماني
    growthRate: 0.12,
    keyDrivers: ["رؤية عمان 2040", "تنويع الاقتصاد", "الاستثمار في السياحة"],
    emergingOpportunities: [
      "التكنولوجيا الخضراء",
      "السياحة المستدامة",
      "الصناعات الغذائية",
    ],
  },
  2025: {
    totalMarketValue: 3200000000, // 3.2 مليار ريال عماني
    growthRate: 0.14,
    keyDrivers: ["التحول الرقمي", "الاستدامة البيئية", "تطوير الموانئ"],
    emergingOpportunities: [
      "الذكاء الاصطناعي",
      "الطاقة المتجددة",
      "اللوجستيات الذكية",
    ],
  },
  2026: {
    totalMarketValue: 3700000000, // 3.7 مليار ريال عماني
    growthRate: 0.16,
    keyDrivers: ["الابتكار التقني", "التجارة الدولية", "السياحة البيئية"],
    emergingOpportunities: [
      "التكنولوجيا الحيوية",
      "الزراعة المائية",
      "السياحة الرقمية",
    ],
  },
};

export default investmentOpportunities;
