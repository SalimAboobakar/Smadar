import React, { useState, useEffect } from "react";
import InvestmentOpportunities from "../components/InvestmentOpportunities";
import { uploadAllDataToFirebase } from "../services/firebaseService";
import SuccessMessage from "../components/ui/SuccessMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const InvestmentPage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleUploadData = async () => {
    try {
      setUploading(true);
      setUploadError(null);

      const result = await uploadAllDataToFirebase();

      if (result) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 5000);
      } else {
        setUploadError("فشل في رفع البيانات إلى Firebase");
      }
    } catch (error) {
      console.error("خطأ في رفع البيانات:", error);
      setUploadError("حدث خطأ أثناء رفع البيانات");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* شريط التحكم */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                الفرص الاستثمارية
              </h1>
              <p className="text-gray-600">
                استكشف أفضل الفرص الاستثمارية في محافظة ظفار
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUploadData}
                disabled={uploading}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <LoadingSpinner size="small" />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    رفع البيانات إلى Firebase
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* رسائل النجاح والخطأ */}
      {uploadSuccess && (
        <div className="container mx-auto px-4 py-4">
          <SuccessMessage message="تم رفع البيانات إلى Firebase بنجاح!" />
        </div>
      )}

      {uploadError && (
        <div className="container mx-auto px-4 py-4">
          <ErrorMessage error={{ message: uploadError }} />
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div className="container mx-auto px-4 py-8">
        <InvestmentOpportunities />
      </div>

      {/* إحصائيات سريعة */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            ظفار في أرقام
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-gray-600">قطاع استثماري</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2.8م</div>
              <div className="text-gray-600">ريال عماني حجم السوق</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 mb-2">35%</div>
              <div className="text-gray-600">متوسط العائد السنوي</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">12%</div>
              <div className="text-gray-600">معدل النمو السنوي</div>
            </div>
          </div>
        </div>
      </div>

      {/* الميزات والفوائد */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            لماذا تستثمر في ظفار؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">بيانات موثوقة</h3>
              <p className="text-gray-600">
                جميع الأرقام والبيانات مبنية على دراسات السوق الرسمية والبحوث
                الميدانية المعمقة
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">فرص حقيقية ومربحة</h3>
              <p className="text-gray-600">
                فرص استثمارية مدروسة ومحللة بعناية مع عوائد مجربة وموثقة من
                المستثمرين
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-light-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-accent-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">دعم ومتابعة مستمرة</h3>
              <p className="text-gray-600">
                تحديث مستمر للبيانات والإحصائيات مع دعم استشاري لمساعدتك في
                اتخاذ القرار
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* دعوة للعمل */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            ابدأ رحلتك الاستثمارية اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            استكشف أكثر من 20 فرصة استثمارية مربحة في مختلف القطاعات
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#opportunities"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              استكشف الفرص
            </a>
            <a
              href="#calculator"
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              احسب العوائد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPage;
