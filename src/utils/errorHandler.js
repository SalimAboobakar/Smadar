// معالج الأخطاء الموحد
export class AppError extends Error {
  constructor(message, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const handleFirebaseError = (error) => {
  console.error("Firebase Error:", error);

  switch (error.code) {
    case "permission-denied":
      return new AppError("ليس لديك صلاحية للوصول إلى هذه البيانات", 403);
    case "unavailable":
      return new AppError("الخدمة غير متاحة حالياً، يرجى المحاولة لاحقاً", 503);
    case "unauthenticated":
      return new AppError("يجب تسجيل الدخول أولاً", 401);
    case "not-found":
      return new AppError("البيانات المطلوبة غير موجودة", 404);
    case "already-exists":
      return new AppError("البيانات موجودة مسبقاً", 409);
    case "invalid-argument":
      return new AppError("البيانات المدخلة غير صحيحة", 400);
    case "deadline-exceeded":
      return new AppError("انتهت مهلة الطلب، يرجى المحاولة مرة أخرى", 408);
    case "resource-exhausted":
      return new AppError("تم تجاوز الحد المسموح، يرجى المحاولة لاحقاً", 429);
    default:
      return new AppError("حدث خطأ غير متوقع", 500);
  }
};

export const handleGeminiError = (error) => {
  console.error("Gemini AI Error:", error);

  if (error.message.includes("API key")) {
    return new AppError("مفتاح API غير صحيح أو منتهي الصلاحية", 401);
  }

  if (error.message.includes("quota")) {
    return new AppError("تم تجاوز الحد المسموح من طلبات API", 429);
  }

  if (error.message.includes("timeout")) {
    return new AppError("انتهت مهلة الطلب، يرجى المحاولة مرة أخرى", 408);
  }

  return new AppError("خطأ في خدمة الذكاء الاصطناعي", 500);
};

export const handleNetworkError = (error) => {
  console.error("Network Error:", error);

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return new AppError("خطأ في الاتصال بالشبكة", 503);
  }

  if (error.name === "AbortError") {
    return new AppError("تم إلغاء الطلب", 408);
  }

  return new AppError("خطأ في الاتصال", 503);
};

export const logError = (error, context = {}) => {
  const errorLog = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    context,
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.error("Application Error:", errorLog);

  // في بيئة الإنتاج، يمكن إرسال الخطأ إلى خدمة مراقبة الأخطاء
  if (process.env.NODE_ENV === "production") {
    // إرسال إلى خدمة مراقبة الأخطاء مثل Sentry
    // Sentry.captureException(error, { extra: context });
  }
};

export const createErrorResponse = (
  error,
  defaultMessage = "حدث خطأ غير متوقع"
) => {
  const message = error.isOperational ? error.message : defaultMessage;

  return {
    success: false,
    error: {
      message,
      statusCode: error.statusCode || 500,
      timestamp: error.timestamp || new Date().toISOString(),
    },
  };
};

export const createSuccessResponse = (data, message = "تم بنجاح") => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};
