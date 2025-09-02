# منصة تدوم - Tadawom Platform

منصة ذكاء استثماري بلمسة المجتمع لتقييم جدوى المشاريع في محافظة ظفار

## 🚀 المميزات

- **تحليل ذكي متقدم**: مؤشرات رياضية (IAI & SS) لتقييم الجدوى الاستثمارية
- **مشاركة المجتمع**: نظام تصويت تفاعلي لتعزيز الشفافية
- **ذكاء اصطناعي**: تحليل متقدم باستخدام Gemini AI
- **تقارير مفصلة**: تصدير PDF مع مخططات بيانية
- **واجهة حديثة**: تصميم متجاوب مع دعم كامل للغة العربية
- **إدارة شاملة**: لوحات تحكم للمديرين والمستثمرين

## 🛠️ التقنيات المستخدمة

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Analytics)
- **AI**: Google Gemini AI
- **Charts**: Chart.js, React-Chartjs-2
- **PDF**: jsPDF, html2canvas
- **Maps**: Leaflet, React-Leaflet

## 📋 متطلبات النظام

- Node.js 18+
- npm 8+
- متصفح حديث يدعم ES6+

## ⚙️ التثبيت والتشغيل

### 1. استنساخ المشروع

```bash
git clone <repository-url>
cd تدوم
```

### 2. تثبيت التبعيات

```bash
npm install
```

### 3. إعداد متغيرات البيئة

```bash
# نسخ ملف البيئة
cp env.example .env

# تعديل ملف .env وإضافة المفاتيح المطلوبة
```

### 4. إعداد Firebase

1. إنشاء مشروع جديد في [Firebase Console](https://console.firebase.google.com)
2. تفعيل Firestore Database
3. إضافة مفاتيح Firebase في ملف `.env`

### 5. إعداد Gemini AI

1. الحصول على API Key من [Google AI Studio](https://makersuite.google.com/app/apikey)
2. إضافة المفتاح في ملف `.env`

### 6. تشغيل المشروع

```bash
# وضع التطوير
npm start

# بناء للإنتاج
npm run build

# تشغيل الاختبارات
npm test
```

## 🔧 إعداد متغيرات البيئة

```env
# Gemini AI Configuration
REACT_APP_GEMINI_API_KEY=your-gemini-api-key-here

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id

# App Configuration
REACT_APP_APP_NAME=منصة تدوم
REACT_APP_APP_VERSION=1.0.0
REACT_APP_APP_DESCRIPTION=منصة ذكاء استثماري بلمسة المجتمع
```

## 📁 هيكل المشروع

```
src/
├── components/          # مكونات React
│   ├── ui/             # مكونات واجهة المستخدم
│   ├── CommunityVoting.js
│   ├── GeminiIntegration.js
│   └── ...
├── pages/              # صفحات التطبيق
│   ├── LandingPage.js
│   ├── AdminDashboard.js
│   ├── InvestorDashboard.js
│   └── VoterPage.js
├── services/           # خدمات API
│   ├── firebaseService.js
│   ├── geminiService.js
│   └── pdfService.js
├── utils/              # أدوات مساعدة
│   └── calculations.js
├── data/               # بيانات المشروع
│   └── dhofarData.js
└── firebase/           # إعدادات Firebase
    └── config.js
```

## 🎯 أنواع المستخدمين

### 1. المدير

- إدارة شاملة للمنصة
- مراقبة الإحصائيات
- إدارة المشاريع والمستخدمين
- تقارير مفصلة

### 2. المستثمر

- تحليل المشاريع
- تقييم المخاطر
- التوصيات الذكية
- تصدير التقارير

### 3. الناخب

- التصويت على المشاريع
- إبداء الرأي
- مشاركة الأفكار
- لا يتطلب تسجيل دخول

## 🔒 الأمان

- **متغيرات البيئة**: جميع المفاتيح الحساسة محفوظة في متغيرات البيئة
- **Error Boundaries**: معالجة أخطاء التطبيق
- **Input Validation**: التحقق من صحة البيانات المدخلة
- **Firebase Security Rules**: قواعد أمان Firebase

## 🚨 إصلاح المشاكل الشائعة

### مشاكل Firebase

```bash
# التأكد من صحة المفاتيح
# التحقق من قواعد Firestore
# تفعيل Authentication إذا لزم الأمر
```

### مشاكل Gemini AI

```bash
# التأكد من صحة API Key
# التحقق من حدود الاستخدام
# مراجعة أذونات المفتاح
```

### مشاكل التبعيات

```bash
# حذف node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install

# إصلاح مشاكل الأمان
npm audit fix
```

## 📊 المؤشرات المستخدمة

### مؤشر الجاذبية الاستثمارية (IAI)

- الطلب المتوقع (40%)
- الحوكمة والتراخيص (20%)
- العائد المتوقع (20%)
- العوامل الموسمية (20%)

### مؤشر الاستدامة (SS)

- العائد على الاستثمار
- المخاطر المحتملة
- التكاليف التشغيلية
- العقبات التنظيمية

## 🤝 المساهمة

نرحب بمساهماتكم في تطوير المنصة:

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push للفرع
5. إنشاء Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل

## 📞 الدعم

للحصول على الدعم أو الإبلاغ عن مشاكل:

- إنشاء Issue في GitHub
- التواصل عبر البريد الإلكتروني
- مراجعة الوثائق

## 🔄 التحديثات المستقبلية

- [ ] نظام إشعارات
- [ ] تطبيق جوال
- [ ] تحليلات متقدمة
- [ ] دعم متعدد اللغات
- [ ] API عام
- [ ] نظام تقييمات متقدم

---

**منصة تدوم** - مستقبل الاستثمار الذكي في ظفار 🇴🇲
# Smadar
