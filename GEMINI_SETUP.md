# إعداد Gemini AI في منصة تدوم

## 🚀 خطوات الإعداد

### 1. الحصول على API Key

1. اذهب إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. سجل دخولك بحساب Google
3. اضغط على "Create API Key"
4. انسخ المفتاح واحفظه في مكان آمن

### 2. إعداد متغيرات البيئة

1. انسخ ملف `env.example` إلى `.env`:

```bash
cp env.example .env
```

2. افتح ملف `.env` وأضف مفتاح Gemini:

```env
REACT_APP_GEMINI_API_KEY=your-actual-gemini-api-key-here
```

### 3. تحديث Firebase Config

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. أنشئ مشروع جديد أو استخدم مشروع موجود
3. اذهب إلى Project Settings > General
4. انسخ إعدادات Firebase وأضفها في `.env`:

```env
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### 4. تحديث ملف Firebase Config

افتح `src/firebase/config.js` وأضف متغيرات البيئة:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
```

### 5. تشغيل المشروع

```bash
# تثبيت المتطلبات
npm install

# تشغيل المشروع
npm start
```

## 🧠 مميزات Gemini AI في المنصة

### 1. التحليل الشامل للمشاريع

- تقييم الجدوى الاقتصادية
- تحليل السوق المحلي
- تحليل المخاطر المحتملة
- التوصيات الاستراتيجية

### 2. التوصيات الذكية

- توصيات مخصصة بناءً على المؤشرات
- استراتيجيات التحسين
- نصائح عملية للتنفيذ
- مؤشرات الأداء

### 3. تحليل المخاطر المتقدم

- تقييم مستوى كل خطر
- استراتيجيات التخفيف
- خطط الطوارئ
- مؤشرات الإنذار المبكر

### 4. تحليل السوق التنافسي

- المنافسين المحليين
- نقاط القوة والضعف
- الفرص المتاحة
- استراتيجيات التميز

### 5. خطة العمل التفصيلية

- المراحل التنفيذية
- الجدول الزمني
- الميزانية المقترحة
- الموارد المطلوبة

## 🔧 استكشاف الأخطاء

### خطأ في API Key

```
خطأ في تحليل Gemini: Error: API key not found
```

**الحل**: تأكد من إضافة `REACT_APP_GEMINI_API_KEY` في ملف `.env`

### خطأ في Firebase

```
Firebase: Error (auth/invalid-api-key)
```

**الحل**: تأكد من صحة إعدادات Firebase في ملف `.env`

### خطأ في الشبكة

```
خطأ في التحليل. يرجى المحاولة لاحقاً
```

**الحل**: تحقق من اتصال الإنترنت وحاول مرة أخرى

## 📊 استخدام Gemini في المنصة

### في Dashboard

1. اختر المشروع والمنطقة
2. انتظر تحليل البيانات الأساسية
3. اضغط على أي تبويب في قسم "التحليل الذكي بـ Gemini AI"
4. انتظر التحليل المتقدم

### أنواع التحليل المتاحة

- **نظرة عامة**: تحليل شامل للمشروع
- **توصيات ذكية**: نصائح مخصصة
- **تحليل المخاطر**: تقييم المخاطر المتقدم
- **السوق التنافسي**: تحليل المنافسة
- **خطة العمل**: خطة تنفيذية مفصلة

## 🚨 ملاحظات مهمة

1. **الأمان**: لا تشارك API Keys مع أي شخص
2. **الحدود**: Gemini له حدود على عدد الطلبات
3. **التكلفة**: تحقق من أسعار Gemini API
4. **النسخ الاحتياطي**: احتفظ بنسخة احتياطية من الإعدادات

## 📞 الدعم

إذا واجهت أي مشاكل:

1. تحقق من ملف `.env`
2. تأكد من صحة API Keys
3. راجع console للأخطاء
4. تأكد من اتصال الإنترنت

---

**منصة تدوم** - ذكاء استثماري بلمسة المجتمع 🚀
