# دليل استكشاف أخطاء Firebase

## المشكلة الحالية

```
FirebaseError: Missing or insufficient permissions.
```

## الحلول المطبقة

### 1. تحسين المصادقة

- إضافة تهيئة تلقائية للمصادقة عند تحميل الملف
- تحسين توقيت المصادقة
- إضافة معالجة أفضل للأخطاء

### 2. تحديث قواعد Firestore

- السماح بالقراءة للجميع (`allow read: if true`)
- السماح بالكتابة للمستخدمين المصادق عليهم فقط
- قواعد أكثر مرونة للاختبار

### 3. تحسين معالجة الأخطاء

- محاولة جلب البيانات مباشرة أولاً
- إعادة المحاولة مع المصادقة في حالة الفشل
- fallback إلى localStorage

## خطوات الحل

### الخطوة 1: تطبيق قواعد Firestore الجديدة

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اختر مشروعك
3. اذهب إلى **Firestore Database** > **Rules**
4. استبدل القواعد الموجودة بمحتوى ملف `firestore.rules`
5. اضغط **Publish**

### الخطوة 2: تفعيل المصادقة المجهولة

1. في Firebase Console، اذهب إلى **Authentication** > **Sign-in method**
2. فعّل **Anonymous** authentication
3. احفظ التغييرات

### الخطوة 3: التحقق من متغيرات البيئة

تأكد من وجود ملف `.env` مع المتغيرات التالية:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### الخطوة 4: إعادة تشغيل التطبيق

```bash
npm start
```

## اختبار الحل

### 1. فتح Console المتصفح

اضغط F12 واذهب إلى تبويب Console

### 2. البحث عن الرسائل التالية

```
تم تسجيل الدخول كضيف بنجاح: [user_id]
تم جلب نتائج التصويت بنجاح: [number] تصويت
```

### 3. اختبار التصويت

1. اذهب إلى صفحة التصويت
2. اضغط على "مناسب" أو "غير مناسب"
3. تحقق من عدم ظهور أخطاء في Console

## استكشاف الأخطاء المتقدمة

### إذا استمر ظهور خطأ "Missing or insufficient permissions"

#### 1. تحقق من قواعد Firestore

```javascript
// في Console المتصفح
firebase
  .firestore()
  .collection("communityVotes")
  .get()
  .then((snapshot) => console.log("Success:", snapshot.size))
  .catch((error) => console.error("Error:", error));
```

#### 2. تحقق من حالة المصادقة

```javascript
// في Console المتصفح
firebase.auth().onAuthStateChanged((user) => {
  console.log("Auth state:", user ? "Authenticated" : "Not authenticated");
  if (user) console.log("User ID:", user.uid);
});
```

#### 3. تحقق من متغيرات البيئة

```javascript
// في Console المتصفح
console.log("Firebase config:", {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ? "Set" : "Missing",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ? "Set" : "Missing",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ? "Set" : "Missing",
});
```

### إذا لم تعمل المصادقة المجهولة

#### 1. تحقق من إعدادات Firebase Console

- تأكد من تفعيل Anonymous authentication
- تحقق من أن المشروع نشط

#### 2. تحقق من القيود

- تأكد من عدم وجود قيود على API
- تحقق من حدود الاستخدام

### إذا استمرت المشاكل

#### 1. استخدام وضع التطوير

```javascript
// في firebaseService.js، أضف هذا في بداية الملف
if (process.env.NODE_ENV === "development") {
  console.log("Development mode: Using permissive rules");
}
```

#### 2. قواعد مؤقتة للتطوير

```javascript
// قواعد مؤقتة للتطوير (لا تستخدم في الإنتاج)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## الحل البديل: العمل بدون Firebase

إذا استمرت المشاكل، يمكن للتطبيق العمل بالكامل مع localStorage:

1. **التصويت**: يتم حفظه في localStorage
2. **البيانات**: تبقى محلية على الجهاز
3. **الوظائف**: تعمل بشكل طبيعي

### لتفعيل الوضع المحلي فقط

```javascript
// في firebaseService.js
const USE_FIREBASE = false; // غير هذا إلى false

export const getVotingResults = async (projectId) => {
  if (!USE_FIREBASE) {
    // استخدام localStorage فقط
    const savedVotes = localStorage.getItem(`votes_${projectId}`);
    return savedVotes ? JSON.parse(savedVotes) : [];
  }
  // ... باقي الكود
};
```

## الدعم

إذا استمرت المشاكل:

1. تحقق من console المتصفح للأخطاء
2. تأكد من إعدادات Firebase Console
3. تحقق من متغيرات البيئة
4. أعد تشغيل خادم التطوير
5. امسح cache المتصفح

## ملاحظات مهمة

- **الأمان**: القواعد الجديدة تسمح بالقراءة للجميع (مناسب للتطوير)
- **الأداء**: المصادقة تحدث مرة واحدة فقط
- **الموثوقية**: localStorage يضمن عمل التطبيق حتى بدون Firebase
