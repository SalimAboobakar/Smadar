# دليل الإعداد السريع - منصة تدوم

## 🚀 الإعداد السريع (5 دقائق)

### 1. إعداد متغيرات البيئة

```bash
# تأكد من وجود ملف .env
ls -la .env

# إذا لم يكن موجود، انسخه من المثال
cp env.example .env
```

### 2. إضافة المفاتيح المطلوبة

افتح ملف `.env` وأضف المفاتيح التالية:

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
```

### 3. تشغيل التطبيق

```bash
npm start
```

## 🔧 إعداد Firebase

### الخطوة 1: إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. انقر على "إضافة مشروع"
3. أدخل اسم المشروع: `tadawom-platform`
4. فعّل Google Analytics (اختياري)

### الخطوة 2: إضافة تطبيق ويب

1. في لوحة المشروع، انقر على رمز الويب `</>`
2. أدخل اسم التطبيق: `tadawom-web`
3. انسخ مفاتيح التكوين

### الخطوة 3: تفعيل Firestore

1. في القائمة الجانبية، انقر على "Firestore Database"
2. انقر على "إنشاء قاعدة بيانات"
3. اختر "بدء في وضع الاختبار"
4. اختر موقع الخادم (الأقرب لمنطقتك)

### الخطوة 4: إضافة قواعد الأمان

في تبويب "قواعد"، استبدل القواعد الحالية بـ:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة والكتابة لجميع المستخدمين (للتطوير)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 🤖 إعداد Gemini AI

### الخطوة 1: الحصول على API Key

1. اذهب إلى [Google AI Studio](https://makersuite.google.com/app/apikey)
2. سجل دخولك بحساب Google
3. انقر على "Create API Key"
4. انسخ المفتاح

### الخطوة 2: إضافة المفتاح

أضف المفتاح في ملف `.env`:

```env
REACT_APP_GEMINI_API_KEY=your-actual-api-key-here
```

## 🧪 اختبار التطبيق

### 1. اختبار الوظائف الأساسية

- [ ] تحميل الصفحة الرئيسية
- [ ] التنقل بين الصفحات
- [ ] اختيار مشروع في لوحة المستثمر
- [ ] التصويت في صفحة الناخب

### 2. اختبار Firebase

- [ ] حفظ تصويت جديد
- [ ] جلب نتائج التصويت
- [ ] عرض الإحصائيات

### 3. اختبار Gemini AI

- [ ] تحليل مشروع في لوحة المستثمر
- [ ] توليد توصيات ذكية
- [ ] تحليل المخاطر

## 🚨 حل المشاكل الشائعة

### مشكلة: "Missing required environment variables"

**الحل:**

```bash
# تأكد من وجود ملف .env
ls -la .env

# إذا لم يكن موجود
cp env.example .env

# أضف المفاتيح المطلوبة
nano .env
```

### مشكلة: "Firebase: Error (auth/configuration-not-found)"

**الحل:**

1. تأكد من صحة مفاتيح Firebase
2. تأكد من تفعيل Firestore
3. تحقق من قواعد الأمان

### مشكلة: "Gemini API Error"

**الحل:**

1. تأكد من صحة API Key
2. تحقق من حدود الاستخدام
3. تأكد من تفعيل Gemini API

### مشكلة: "Module not found"

**الحل:**

```bash
# إعادة تثبيت التبعيات
rm -rf node_modules package-lock.json
npm install
```

## 📊 مراقبة الأداء

### 1. فحص الأخطاء في Console

افتح Developer Tools (F12) وتحقق من تبويب Console

### 2. مراقبة الشبكة

في تبويب Network، تحقق من:

- طلبات Firebase
- طلبات Gemini AI
- أي أخطاء HTTP

### 3. مراقبة Firebase

في Firebase Console:

- تبويب "Usage" لمراقبة الاستخدام
- تبويب "Firestore" لمراقبة البيانات

## 🔒 الأمان

### 1. متغيرات البيئة

- لا تشارك ملف `.env`
- أضف `.env` إلى `.gitignore`
- استخدم مفاتيح مختلفة للإنتاج

### 2. Firebase Security Rules

```javascript
// للإنتاج، استخدم قواعد أكثر أماناً
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /communityVotes/{document} {
      allow read: if true;
      allow write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

### 3. Gemini API

- لا تشارك API Key
- راقب حدود الاستخدام
- استخدم مفاتيح مختلفة للبيئات

## 📈 التحسينات المقترحة

### 1. الأداء

- [ ] إضافة Service Worker
- [ ] تحسين تحميل الصور
- [ ] إضافة Lazy Loading

### 2. تجربة المستخدم

- [ ] إضافة إشعارات
- [ ] تحسين الرسائل
- [ ] إضافة دعم PWA

### 3. الوظائف

- [ ] إضافة نظام المستخدمين
- [ ] تحسين التحليلات
- [ ] إضافة تصدير متقدم

## 📞 الدعم

إذا واجهت أي مشاكل:

1. تحقق من Console للأخطاء
2. راجع هذا الدليل
3. تحقق من README.md
4. أنشئ Issue في GitHub

---

**تم إعداد منصة تدوم بنجاح! 🎉**
