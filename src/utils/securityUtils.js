/**
 * أدوات الأمان والتشفير
 * Security and Encryption Utilities
 */

// تشفير البيانات باستخدام Base64 (للبيانات غير الحساسة)
export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(unescape(encodeURIComponent(jsonString)));
  } catch (error) {
    console.error("خطأ في تشفير البيانات:", error);
    return null;
  }
};

// فك تشفير البيانات
export const decryptData = (encryptedData) => {
  try {
    const jsonString = decodeURIComponent(escape(atob(encryptedData)));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("خطأ في فك تشفير البيانات:", error);
    return null;
  }
};

// تخزين آمن في localStorage
export const secureStorage = {
  set: (key, value) => {
    try {
      const encryptedValue = encryptData(value);
      if (encryptedValue) {
        localStorage.setItem(key, encryptedValue);
        return true;
      }
      return false;
    } catch (error) {
      console.error("خطأ في التخزين الآمن:", error);
      return false;
    }
  },

  get: (key) => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (encryptedValue) {
        return decryptData(encryptedValue);
      }
      return null;
    } catch (error) {
      console.error("خطأ في استرجاع البيانات الآمنة:", error);
      return null;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("خطأ في حذف البيانات الآمنة:", error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error("خطأ في مسح البيانات الآمنة:", error);
      return false;
    }
  },
};

// Rate Limiting للـ API calls
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }

  // فحص حد المعدل
  checkLimit(key, limit = 10, windowMs = 60000) {
    const now = Date.now();
    const windowStart = now - windowMs;

    // الحصول على الطلبات الحالية أو إنشاء مصفوفة جديدة
    const userRequests = this.requests.get(key) || [];

    // تصفية الطلبات القديمة
    const validRequests = userRequests.filter(
      (timestamp) => timestamp > windowStart
    );

    // التحقق من تجاوز الحد
    if (validRequests.length >= limit) {
      const oldestRequest = Math.min(...validRequests);
      const resetTime = oldestRequest + windowMs;
      const waitTime = Math.ceil((resetTime - now) / 1000);

      throw new Error(
        `تم تجاوز حد المعدل. يرجى المحاولة بعد ${waitTime} ثانية`
      );
    }

    // إضافة الطلب الجديد
    validRequests.push(now);
    this.requests.set(key, validRequests);

    return {
      allowed: true,
      remaining: limit - validRequests.length,
      resetTime: now + windowMs,
    };
  }

  // إعادة تعيين حد معين
  reset(key) {
    this.requests.delete(key);
  }

  // مسح جميع الحدود
  clearAll() {
    this.requests.clear();
  }
}

// إنشاء مثيل عام للـ Rate Limiter
export const rateLimiter = new RateLimiter();

// التحقق من صحة البيانات المدخلة
export const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/[<>]/g, "") // إزالة أقواس HTML
    .replace(/javascript:/gi, "") // إزالة JavaScript URLs
    .replace(/on\w+\s*=/gi, "") // إزالة event handlers
    .trim();
};

// التحقق من صحة عنوان البريد الإلكتروني
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// التحقق من قوة كلمة المرور
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid:
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers,
    strength: {
      length: password.length >= minLength,
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      numbers: hasNumbers,
      specialChar: hasSpecialChar,
    },
    score: [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length,
  };
};

// إنشاء CSRF Token
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
};

// التحقق من CSRF Token
export const validateCSRFToken = (token, storedToken) => {
  return token && storedToken && token === storedToken;
};

// تنظيف URL من المعاملات الضارة
export const sanitizeURL = (url) => {
  try {
    const urlObj = new URL(url);

    // قائمة بالبروتوكولات المسموحة
    const allowedProtocols = ["http:", "https:", "mailto:"];

    if (!allowedProtocols.includes(urlObj.protocol)) {
      throw new Error("بروتوكول غير مسموح");
    }

    return urlObj.toString();
  } catch (error) {
    console.error("خطأ في تنظيف URL:", error);
    return null;
  }
};

// إنشاء hash للبيانات
export const createHash = (data) => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(JSON.stringify(data));

  return crypto.subtle.digest("SHA-256", dataBuffer).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  });
};

// التحقق من integrity للبيانات
export const verifyDataIntegrity = async (data, expectedHash) => {
  try {
    const actualHash = await createHash(data);
    return actualHash === expectedHash;
  } catch (error) {
    console.error("خطأ في التحقق من سلامة البيانات:", error);
    return false;
  }
};

// حماية من XSS
export const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// إعدادات Content Security Policy
export const getCSPDirectives = () => {
  return {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", "https://apis.google.com"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    "font-src": ["'self'", "https://fonts.gstatic.com"],
    "img-src": ["'self'", "data:", "https:"],
    "connect-src": [
      "'self'",
      "https://firestore.googleapis.com",
      "https://generativelanguage.googleapis.com",
    ],
    "frame-ancestors": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
  };
};

// تطبيق CSP Headers (للاستخدام في index.html)
export const generateCSPString = () => {
  const directives = getCSPDirectives();
  return Object.entries(directives)
    .map(([key, values]) => `${key} ${values.join(" ")}`)
    .join("; ");
};

// فحص الأمان الشامل
export const securityAudit = {
  // فحص localStorage للبيانات الحساسة
  checkLocalStorage: () => {
    const sensitiveKeys = ["password", "token", "secret", "key"];
    const findings = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))
      ) {
        findings.push(`بيانات حساسة محتملة في localStorage: ${key}`);
      }
    }

    return findings;
  },

  // فحص console للمعلومات الحساسة
  checkConsoleMessages: () => {
    // هذا للتذكير بعدم طباعة معلومات حساسة في console
    return [
      "تأكد من عدم طباعة معلومات حساسة في console",
      "استخدم console.warn أو console.error للرسائل المهمة فقط",
    ];
  },

  // فحص الشبكة للطلبات غير الآمنة
  checkNetworkRequests: () => {
    return [
      "تأكد من استخدام HTTPS لجميع الطلبات",
      "تحقق من headers الأمان في الاستجابات",
      "استخدم CORS بشكل صحيح",
    ];
  },
};

export default {
  encryptData,
  decryptData,
  secureStorage,
  rateLimiter,
  sanitizeInput,
  validateEmail,
  validatePassword,
  generateCSRFToken,
  validateCSRFToken,
  sanitizeURL,
  createHash,
  verifyDataIntegrity,
  escapeHtml,
  getCSPDirectives,
  generateCSPString,
  securityAudit,
};
