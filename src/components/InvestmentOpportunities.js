import React, { useState, useEffect } from "react";
import {
  investmentOpportunities,
  getAllInvestmentOpportunities,
  getInvestmentStats,
  successStories,
  investmentTips,
  evaluationCriteria,
  marketForecasts,
} from "../data/investmentOpportunities";
import { addInvestmentToPortfolio } from "../services/portfolioService";
import {
  getInvestmentOpportunitiesFromFirebase,
  getInvestmentStats as getFirebaseStats,
  saveInvestmentRating,
  getInvestmentRatings,
} from "../services/investmentDataService";
import AnimatedCard from "./ui/AnimatedCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import ErrorMessage from "./ui/ErrorMessage";
import SuccessMessage from "./ui/SuccessMessage";

const InvestmentOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSector, setSelectedSector] = useState("all");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [ratingSuccess, setRatingSuccess] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorOpportunity, setCalculatorOpportunity] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [showSuccessStories, setShowSuccessStories] = useState(false);
  const [activeTab, setActiveTab] = useState("opportunities");
  const [addToPortfolioSuccess, setAddToPortfolioSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // محاولة جلب البيانات من Firebase أولاً
      const firebaseData = await getInvestmentOpportunitiesFromFirebase();
      const firebaseStats = await getFirebaseStats();

      if (firebaseData && Object.keys(firebaseData).length > 0) {
        setOpportunities(Object.values(firebaseData));
        setStats(firebaseStats);
        console.log("تم تحميل البيانات من Firebase");
      } else {
        // استخدام البيانات المحلية كبديل
        const localData = getAllInvestmentOpportunities();
        const localStats = getInvestmentStats();
        setOpportunities(localData);
        setStats(localStats);
        console.log("تم تحميل البيانات المحلية");
      }
    } catch (err) {
      console.error("خطأ في تحميل البيانات:", err);
      setError("فشل في تحميل بيانات الفرص الاستثمارية");

      // استخدام البيانات المحلية كبديل
      const localData = getAllInvestmentOpportunities();
      const localStats = getInvestmentStats();
      setOpportunities(localData);
      setStats(localStats);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const ratingData = {
        rating: rating,
        comment: comment,
        investorType: "individual", // يمكن تحسينه لاحقاً
        experience: "intermediate", // يمكن تحسينه لاحقاً
      };

      const result = await saveInvestmentRating(
        selectedOpportunity.id,
        ratingData
      );

      if (result) {
        setRatingSuccess(true);
        setShowRatingModal(false);
        setComment("");
        setRating(5);

        // إعادة تحميل الإحصائيات
        const updatedStats = await getFirebaseStats();
        setStats(updatedStats);

        setTimeout(() => setRatingSuccess(false), 3000);
      }
    } catch (err) {
      console.error("خطأ في حفظ التقييم:", err);
      setError("فشل في حفظ التقييم");
    }
  };

  const openRatingModal = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowRatingModal(true);
  };

  const openCalculator = (opportunity) => {
    setCalculatorOpportunity(opportunity);
    setShowCalculator(true);
  };

  const calculateROI = () => {
    if (!calculatorOpportunity || !investmentAmount) return null;

    const amount = parseFloat(investmentAmount);
    const minROI = calculatorOpportunity.expectedROI.min;
    const maxROI = calculatorOpportunity.expectedROI.max;

    return {
      minReturn: amount * minROI,
      maxReturn: amount * maxROI,
      minMonthly:
        calculatorOpportunity.monthlyRevenue?.min || (amount * minROI) / 12,
      maxMonthly:
        calculatorOpportunity.monthlyRevenue?.max || (amount * maxROI) / 12,
      operatingCosts:
        calculatorOpportunity.operatingCosts?.monthly || amount * 0.1,
    };
  };

  const handleAddToPortfolio = async (opportunity, sectorName) => {
    try {
      // معرف مستخدم تجريبي - في التطبيق الحقيقي سيكون من نظام المصادقة
      const userId = "demo_user_001";

      const investmentData = {
        name: opportunity.name,
        sector: sectorName,
        initialAmount: opportunity.capitalRange.min,
        expectedROI: opportunity.expectedROI,
        riskLevel: opportunity.riskLevel,
        timeline: opportunity.paybackPeriod,
        region: "صلالة", // افتراضي
      };

      const result = await addInvestmentToPortfolio(userId, investmentData);

      if (result.success) {
        setAddToPortfolioSuccess(true);
        setTimeout(() => setAddToPortfolioSuccess(false), 3000);
      }
    } catch (error) {
      console.error("خطأ في إضافة الاستثمار للمحفظة:", error);
    }
  };

  const filteredOpportunities =
    selectedSector === "all"
      ? opportunities
      : opportunities.filter((opp) => opp.category === selectedSector);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar-OM", {
      style: "currency",
      currency: "OMR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${Math.round(value * 100)}%`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          الفرص الاستثمارية في محافظة ظفار
        </h1>
        <p className="text-center text-gray-600 text-lg">
          استكشف أفضل الفرص الاستثمارية في ظفار مع تحليل مفصل لكل قطاع
        </p>
      </div>

      {error && <ErrorMessage error={{ message: error }} />}
      {ratingSuccess && <SuccessMessage message="تم حفظ تقييمك بنجاح!" />}
      {addToPortfolioSuccess && (
        <SuccessMessage message="تم إضافة الاستثمار للمحفظة بنجاح!" />
      )}

      {/* التبويبات */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg">
          {[
            { id: "opportunities", label: "الفرص الاستثمارية", icon: "💼" },
            { id: "success", label: "قصص النجاح", icon: "🏆" },
            { id: "tips", label: "نصائح الاستثمار", icon: "💡" },
            { id: "forecasts", label: "توقعات السوق", icon: "📈" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* إحصائيات عامة */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AnimatedCard className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalSectors}
              </div>
              <div className="text-gray-600">قطاع استثماري</div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {stats.totalOpportunities}
              </div>
              <div className="text-gray-600">فرصة استثمارية</div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {stats.averageCapitalRange
                  ? formatCurrency(stats.averageCapitalRange.min)
                  : formatCurrency(150000)}
              </div>
              <div className="text-gray-600">متوسط رأس المال</div>
            </div>
          </AnimatedCard>

          <AnimatedCard className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {stats.averageROI
                  ? `${formatPercentage(
                      stats.averageROI.min / 100
                    )} - ${formatPercentage(stats.averageROI.max / 100)}`
                  : "15% - 35%"}
              </div>
              <div className="text-gray-600">متوسط العائد المتوقع</div>
            </div>
          </AnimatedCard>
        </div>
      )}

      {/* محتوى الفرص الاستثمارية */}
      {activeTab === "opportunities" && (
        <>
          {/* فلتر القطاعات */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedSector("all")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedSector === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                جميع القطاعات
              </button>
              {[...new Set(opportunities.map((opp) => opp.category))].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedSector(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedSector === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {
                      opportunities.find((opp) => opp.category === category)
                        ?.name
                    }
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}

      {/* قائمة الفرص الاستثمارية */}
      {activeTab === "opportunities" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredOpportunities.map((sector) => (
            <AnimatedCard
              key={sector.id}
              className="hover:shadow-lg transition-shadow"
            >
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{sector.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold">{sector.name}</h3>
                    <p className="text-sm text-gray-600">
                      {sector.description}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                {/* بيانات السوق */}
                {sector.marketData && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-3 text-gray-800">
                      بيانات السوق
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {Object.entries(sector.marketData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">{key}:</span>
                          <span className="font-medium">
                            {typeof value === "number"
                              ? value > 1000000
                                ? formatCurrency(value)
                                : value.toLocaleString()
                              : value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* الفرص الاستثمارية */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800">
                    الفرص الاستثمارية
                  </h4>
                  {sector.opportunities.map((opportunity) => (
                    <div key={opportunity.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-semibold text-lg">
                          {opportunity.name}
                        </h5>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => openCalculator(opportunity)}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm hover:bg-primary-200 transition-colors"
                          >
                            حاسبة الأرباح
                          </button>
                          <button
                            onClick={() => openRatingModal(opportunity)}
                            className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm hover:bg-accent-200 transition-colors"
                          >
                            قيم هذه الفرصة
                          </button>
                          <button
                            onClick={() =>
                              handleAddToPortfolio(opportunity, sector.name)
                            }
                            className="px-3 py-1 bg-light-300 text-primary-800 rounded-full text-sm hover:bg-light-400 transition-colors"
                          >
                            إضافة للمحفظة
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {opportunity.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">
                            رأس المال المطلوب:
                          </span>
                          <div className="font-medium">
                            {formatCurrency(opportunity.capitalRange.min)} -{" "}
                            {formatCurrency(opportunity.capitalRange.max)}
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-600">العائد المتوقع:</span>
                          <div className="font-medium">
                            {formatPercentage(opportunity.expectedROI.min)} -{" "}
                            {formatPercentage(opportunity.expectedROI.max)}
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-600">فترة الاسترداد:</span>
                          <div className="font-medium">
                            {opportunity.paybackPeriod}
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-600">مستوى المخاطر:</span>
                          <div className="font-medium">
                            {opportunity.riskLevel}
                          </div>
                        </div>
                      </div>

                      {/* التراخيص المطلوبة */}
                      {opportunity.permits && (
                        <div className="mt-4">
                          <h6 className="font-medium text-gray-800 mb-2">
                            التراخيص المطلوبة:
                          </h6>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.permits.map((permit, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs"
                              >
                                {permit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* المتطلبات */}
                      {opportunity.requirements && (
                        <div className="mt-4">
                          <h6 className="font-medium text-gray-800 mb-2">
                            المتطلبات:
                          </h6>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {opportunity.requirements.map(
                              (requirement, index) => (
                                <li key={index}>{requirement}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                      {/* الميزات التنافسية */}
                      {opportunity.competitiveAdvantages && (
                        <div className="mt-4">
                          <h6 className="font-medium text-gray-800 mb-2">
                            الميزات التنافسية:
                          </h6>
                          <div className="flex flex-wrap gap-1">
                            {opportunity.competitiveAdvantages.map(
                              (advantage, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                                >
                                  {advantage}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      {/* الجدول الزمني */}
                      {opportunity.timeline && (
                        <div className="mt-4">
                          <h6 className="font-medium text-gray-800 mb-2">
                            الجدول الزمني للتنفيذ:
                          </h6>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(opportunity.timeline).map(
                              ([phase, duration]) => (
                                <div
                                  key={phase}
                                  className="flex justify-between"
                                >
                                  <span className="text-gray-600">
                                    {phase}:
                                  </span>
                                  <span className="font-medium">
                                    {duration}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {/* محتوى قصص النجاح */}
      {activeTab === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(successStories).map(([key, story]) => (
            <AnimatedCard key={key} className="p-6">
              <h3 className="text-xl font-bold mb-3 text-green-600">
                {story.title}
              </h3>
              <p className="text-gray-600 mb-4">{story.story}</p>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">العائد المحقق:</span>
                  <span className="font-bold text-green-600">
                    {formatPercentage(story.roi)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">فرص العمل:</span>
                  <span className="font-medium">
                    {story.employmentCreated} وظيفة
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المدة الزمنية:</span>
                  <span className="font-medium">{story.timeline}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  عوامل النجاح:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {story.keySuccess.map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {/* محتوى نصائح الاستثمار */}
      {activeTab === "tips" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(investmentTips).map(([category, tips]) => (
            <AnimatedCard key={category} className="p-6">
              <h3 className="text-xl font-bold mb-4 text-blue-600">
                {category === "general" && "نصائح عامة"}
                {category === "dhofar" && "نصائح خاصة بظفار"}
                {category === "seasonal" && "نصائح موسمية"}
              </h3>
              <ul className="space-y-3">
                {tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 mt-1">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </AnimatedCard>
          ))}
        </div>
      )}

      {/* محتوى توقعات السوق */}
      {activeTab === "forecasts" && (
        <div className="space-y-6">
          {Object.entries(marketForecasts).map(([year, forecast]) => (
            <AnimatedCard key={year} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-purple-600">
                  عام {year}
                </h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatCurrency(forecast.totalMarketValue)}
                  </div>
                  <div className="text-sm text-gray-600">
                    القيمة السوقية الإجمالية
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    معدل النمو
                  </h4>
                  <div className="text-2xl font-bold text-green-600">
                    {formatPercentage(forecast.growthRate)}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    المحركات الرئيسية
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {forecast.keyDrivers.map((driver, index) => (
                      <li key={index}>• {driver}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    الفرص الناشئة
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {forecast.emergingOpportunities.map(
                      (opportunity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs"
                        >
                          {opportunity}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      )}

      {/* حاسبة الاستثمار */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">حاسبة الاستثمار</h3>
            <p className="text-gray-600 mb-4">{calculatorOpportunity?.name}</p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مبلغ الاستثمار (ريال عماني)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full p-3 border rounded-lg text-lg"
                placeholder="أدخل مبلغ الاستثمار"
                min={calculatorOpportunity?.capitalRange?.min}
                max={calculatorOpportunity?.capitalRange?.max}
              />
            </div>

            {investmentAmount && calculatorOpportunity && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {(() => {
                  const calc = calculateROI();
                  return calc ? (
                    <>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          العائد السنوي المتوقع
                        </h4>
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(calc.minReturn)} -{" "}
                          {formatCurrency(calc.maxReturn)}
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          الإيرادات الشهرية المتوقعة
                        </h4>
                        <div className="text-lg font-bold text-blue-600">
                          {formatCurrency(calc.minMonthly)} -{" "}
                          {formatCurrency(calc.maxMonthly)}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">
                          التكاليف التشغيلية الشهرية
                        </h4>
                        <div className="text-lg font-bold text-orange-600">
                          {formatCurrency(calc.operatingCosts)}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">
                          صافي الربح الشهري المتوقع
                        </h4>
                        <div className="text-lg font-bold text-purple-600">
                          {formatCurrency(
                            calc.minMonthly - calc.operatingCosts
                          )}{" "}
                          -{" "}
                          {formatCurrency(
                            calc.maxMonthly - calc.operatingCosts
                          )}
                        </div>
                      </div>
                    </>
                  ) : null;
                })()}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCalculator(false);
                  setInvestmentAmount("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة التقييم */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">تقييم الفرصة الاستثمارية</h3>
            <p className="text-gray-600 mb-4">{selectedOpportunity?.name}</p>

            <form onSubmit={handleRatingSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  التقييم (1-5)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value={1}>1 - ضعيف</option>
                  <option value={2}>2 - مقبول</option>
                  <option value={3}>3 - جيد</option>
                  <option value={4}>4 - جيد جداً</option>
                  <option value={5}>5 - ممتاز</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  تعليق (اختياري)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 border rounded-lg h-24"
                  placeholder="شاركنا رأيك حول هذه الفرصة..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  حفظ التقييم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentOpportunities;
