# دليل تشغيل منصة تدوم

## 🚀 التشغيل السريع

### 1. تثبيت المتطلبات

```bash
npm install
```

### 2. إعداد متغيرات البيئة

```bash
# انسخ ملف البيئة
cp env.example .env

# أضف مفتاح Gemini (اختياري)
REACT_APP_GEMINI_API_KEY=your-gemini-api-key-here
```

### 3. تشغيل المشروع

```bash
npm start
```

## 🔥 Firebase جاهز!

تم إعداد Firebase بنجاح مع المشروع `invest-6d39d`:

### ✅ الخدمات المتاحة:

- **Firestore Database**: لتخزين بيانات التصويت والتحليلات
- **Authentication**: لتسجيل الدخول (جاهز للاستخدام)
- **Analytics**: لتتبع استخدام المنصة

### 📊 البيانات المحفوظة:

- نتائج التصويت المجتمعي
- نتائج التحليلات
- تحليلات Gemini AI
- إحصائيات المنصة

## 🧠 Gemini AI (اختياري)

### للحصول على تحليل ذكي متقدم:

1. اذهب إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. احصل على API Key
3. أضفه في ملف `.env`:

```env
REACT_APP_GEMINI_API_KEY=your-actual-key
```

## 📱 المميزات الجاهزة

### ✅ تم إنجازه:

- [x] تصميم متقدم مع Framer Motion
- [x] نظام التصويت المجتمعي مع Firebase
- [x] تحليلات ذكية (IAI & SS)
- [x] رسوم بيانية تفاعلية
- [x] إحصائيات المنصة
- [x] تصدير PDF
- [x] تكامل Firebase
- [x] Gemini AI (جاهز للإعداد)

### 🎯 المميزات الرئيسية:

1. **Hero Section** مذهل مع تأثيرات بصرية
2. **Dashboard** تفاعلي مع تحليلات متقدمة
3. **نظام التصويت** المجتمعي مع Firebase
4. **إحصائيات المنصة** في الوقت الفعلي
5. **تصدير PDF** للتقارير
6. **Gemini AI** للتحليل الذكي

## 🌐 النشر

### Vercel (مستحسن):

```bash
npm install -g vercel
vercel --prod
```

### Netlify:

```bash
npm run build
# ارفع مجلد build إلى Netlify
```

### GitHub Pages:

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d build
```

## 📊 قاعدة البيانات

### Firestore Collections:

- `communityVotes`: أصوات المجتمع
- `analysisResults`: نتائج التحليلات
- `geminiAnalyses`: تحليلات Gemini
- `platformStats`: إحصائيات المنصة

### هيكل البيانات:

```javascript
// communityVotes
{
  projectId: string,
  region: string,
  projectType: string,
  audience: string,
  investment: number,
  vote: 'up' | 'down',
  timestamp: timestamp,
  userAgent: string,
  ipAddress: string
}

// analysisResults
{
  projectId: string,
  region: string,
  projectType: string,
  audience: string,
  investment: number,
  iai: number,
  ss: number,
  demand: number,
  recommendations: array,
  risks: array,
  timestamp: timestamp
}
```

## 🔧 استكشاف الأخطاء

### خطأ في Firebase:

```
Firebase: Error (auth/invalid-api-key)
```

**الحل**: تأكد من صحة إعدادات Firebase في `src/firebase/config.js`

### خطأ في Gemini:

```
خطأ في تحليل Gemini: API key not found
```

**الحل**: أضف `REACT_APP_GEMINI_API_KEY` في ملف `.env`

### خطأ في التصويت:

```
خطأ في حفظ التصويت في Firebase
```

**الحل**: تحقق من اتصال الإنترنت وإعدادات Firestore

## 📈 تحسينات الأداء

### 1. تحسين الصور:

```bash
npm install --save-dev imagemin imagemin-webp
```

### 2. تحسين Bundle:

```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### 3. تحسين Firebase:

- استخدم Firestore Rules للتحكم في الوصول
- فعّل Caching للاستعلامات المتكررة
- استخدم Indexes للاستعلامات المعقدة

## 🎨 تخصيص التصميم

### الألوان:

```css
/* في tailwind.config.js */
colors: {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444'
}
```

### الخطوط:

```css
/* في public/index.html */
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

## 📞 الدعم

### المشاكل الشائعة:

1. **المشروع لا يعمل**: تحقق من `npm install`
2. **Firebase خطأ**: تحقق من الإعدادات
3. **Gemini لا يعمل**: تحقق من API Key
4. **التصويت لا يحفظ**: تحقق من Firestore Rules

### الملفات المهمة:

- `src/firebase/config.js` - إعدادات Firebase
- `src/services/firebaseService.js` - خدمات قاعدة البيانات
- `src/services/geminiService.js` - خدمات Gemini AI
- `src/services/pdfService.js` - خدمات تصدير PDF

---

## 🎉 تهانينا!

منصة تدوم جاهزة للاستخدام والنشر!

**المميزات الجاهزة:**

- ✅ تصميم مذهل مع Aceternity UI
- ✅ Firebase متكامل
- ✅ نظام تصويت مجتمعي
- ✅ تحليلات ذكية
- ✅ Gemini AI (اختياري)
- ✅ تصدير PDF
- ✅ إحصائيات المنصة

**جاهز للهاكاثون! 🚀**
