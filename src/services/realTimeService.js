// خدمة التزامن في الوقت الفعلي
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

// إعدادات الخدمة
const REAL_TIME_CONFIG = {
  enableRealTime: true,
  maxRetries: 3,
  retryDelay: 1000,
  heartbeatInterval: 30000, // 30 ثانية
};

// متغيرات الحالة
let realTimeListeners = new Map();
let heartbeatInterval = null;
let isConnected = false;
let connectionRetries = 0;

// دالة للتحقق من الاتصال
const checkConnection = async () => {
  try {
    // محاولة قراءة بسيطة من Firestore
    const testQuery = query(collection(db, "test"), limit(1));
    await new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(
        testQuery,
        () => {
          unsubscribe();
          resolve();
        },
        reject
      );
    });
    return true;
  } catch (error) {
    console.warn("فشل في التحقق من الاتصال:", error);
    return false;
  }
};

// دالة بدء نبضات القلب
const startHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
  }

  heartbeatInterval = setInterval(async () => {
    const connected = await checkConnection();
    if (connected !== isConnected) {
      isConnected = connected;
      if (connected) {
        console.log("تم استعادة الاتصال");
        connectionRetries = 0;
        // إعادة تشغيل المستمعين
        restartListeners();
      } else {
        console.warn("فقدان الاتصال");
        connectionRetries++;
        if (connectionRetries >= REAL_TIME_CONFIG.maxRetries) {
          console.error("تم الوصول للحد الأقصى من محاولات إعادة الاتصال");
          stopHeartbeat();
        }
      }
    }
  }, REAL_TIME_CONFIG.heartbeatInterval);
};

// دالة إيقاف نبضات القلب
const stopHeartbeat = () => {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
};

// دالة إعادة تشغيل المستمعين
const restartListeners = () => {
  realTimeListeners.forEach((listener, key) => {
    const { collectionName, queryOptions, callback, errorCallback } = listener;
    startRealTimeListener(
      collectionName,
      queryOptions,
      callback,
      errorCallback,
      key
    );
  });
};

// دالة بدء مستمع الوقت الفعلي
export const startRealTimeListener = (
  collectionName,
  queryOptions = {},
  callback,
  errorCallback,
  listenerId = null
) => {
  if (!REAL_TIME_CONFIG.enableRealTime) {
    console.warn("الوقت الفعلي معطل");
    return null;
  }

  try {
    const collectionRef = collection(db, collectionName);
    let q = query(collectionRef);

    // تطبيق خيارات الاستعلام
    if (queryOptions.where) {
      queryOptions.where.forEach(({ field, operator, value }) => {
        q = query(q, where(field, operator, value));
      });
    }

    if (queryOptions.orderBy) {
      q = query(
        q,
        orderBy(
          queryOptions.orderBy.field,
          queryOptions.orderBy.direction || "asc"
        )
      );
    }

    if (queryOptions.limit) {
      q = query(q, limit(queryOptions.limit));
    }

    // إنشاء معرف فريد للمستمع
    const id =
      listenerId ||
      `${collectionName}_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

    // بدء الاستماع
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
            _lastModified: doc.data().lastModified || doc.data().timestamp,
          });
        });

        // ترتيب البيانات حسب آخر تعديل
        data.sort((a, b) => {
          const timeA = a._lastModified?.toDate
            ? a._lastModified.toDate()
            : new Date(a._lastModified);
          const timeB = b._lastModified?.toDate
            ? b._lastModified.toDate()
            : new Date(b._lastModified);
          return timeB - timeA;
        });

        callback(data, snapshot);
      },
      (error) => {
        console.error(`خطأ في مستمع الوقت الفعلي ${collectionName}:`, error);
        if (errorCallback) {
          errorCallback(error);
        }
      }
    );

    // حفظ المستمع
    realTimeListeners.set(id, {
      collectionName,
      queryOptions,
      callback,
      errorCallback,
      unsubscribe,
    });

    console.log(`تم بدء مستمع الوقت الفعلي: ${id}`);
    return id;
  } catch (error) {
    console.error(`فشل في بدء مستمع الوقت الفعلي ${collectionName}:`, error);
    if (errorCallback) {
      errorCallback(error);
    }
    return null;
  }
};

// دالة إيقاف مستمع الوقت الفعلي
export const stopRealTimeListener = (listenerId) => {
  const listener = realTimeListeners.get(listenerId);
  if (listener) {
    listener.unsubscribe();
    realTimeListeners.delete(listenerId);
    console.log(`تم إيقاف مستمع الوقت الفعلي: ${listenerId}`);
    return true;
  }
  return false;
};

// دالة إيقاف جميع المستمعين
export const stopAllRealTimeListeners = () => {
  realTimeListeners.forEach((listener, id) => {
    listener.unsubscribe();
    console.log(`تم إيقاف مستمع الوقت الفعلي: ${id}`);
  });
  realTimeListeners.clear();
  stopHeartbeat();
};

// دالة إضافة بيانات جديدة مع التزامن
export const addRealTimeData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      timestamp: serverTimestamp(),
      lastModified: serverTimestamp(),
      _realTime: true,
    });

    console.log(`تم إضافة بيانات جديدة في ${collectionName}:`, docRef.id);
    return docRef.id;
  } catch (error) {
    console.error(`فشل في إضافة البيانات في ${collectionName}:`, error);
    throw error;
  }
};

// دالة تحديث البيانات مع التزامن
export const updateRealTimeData = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, {
      ...data,
      lastModified: serverTimestamp(),
      _realTime: true,
    });

    console.log(`تم تحديث البيانات في ${collectionName}/${docId}`);
    return true;
  } catch (error) {
    console.error(
      `فشل في تحديث البيانات في ${collectionName}/${docId}:`,
      error
    );
    throw error;
  }
};

// دالة حذف البيانات مع التزامن
export const deleteRealTimeData = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);

    console.log(`تم حذف البيانات في ${collectionName}/${docId}`);
    return true;
  } catch (error) {
    console.error(`فشل في حذف البيانات في ${collectionName}/${docId}:`, error);
    throw error;
  }
};

// دالة بدء خدمة التزامن
export const startRealTimeService = async () => {
  try {
    console.log("بدء خدمة التزامن في الوقت الفعلي...");

    // التحقق من الاتصال
    isConnected = await checkConnection();
    if (!isConnected) {
      console.warn("لا يوجد اتصال بـ Firebase");
      return false;
    }

    // بدء نبضات القلب
    startHeartbeat();

    console.log("تم بدء خدمة التزامن في الوقت الفعلي بنجاح");
    return true;
  } catch (error) {
    console.error("فشل في بدء خدمة التزامن:", error);
    return false;
  }
};

// دالة إيقاف خدمة التزامن
export const stopRealTimeService = () => {
  console.log("إيقاف خدمة التزامن في الوقت الفعلي...");
  stopAllRealTimeListeners();
  console.log("تم إيقاف خدمة التزامن بنجاح");
};

// دالة الحصول على حالة الاتصال
export const getConnectionStatus = () => {
  return {
    isConnected,
    activeListeners: realTimeListeners.size,
    connectionRetries,
    heartbeatActive: heartbeatInterval !== null,
  };
};

// دالة الحصول على قائمة المستمعين النشطين
export const getActiveListeners = () => {
  const listeners = [];
  realTimeListeners.forEach((listener, id) => {
    listeners.push({
      id,
      collection: listener.collectionName,
      options: listener.queryOptions,
    });
  });
  return listeners;
};

// دالة إعادة الاتصال
export const reconnect = async () => {
  console.log("محاولة إعادة الاتصال...");
  connectionRetries = 0;
  const connected = await checkConnection();
  if (connected) {
    isConnected = true;
    startHeartbeat();
    restartListeners();
    console.log("تم إعادة الاتصال بنجاح");
    return true;
  } else {
    console.error("فشل في إعادة الاتصال");
    return false;
  }
};

// تصدير الخدمة
export default {
  startRealTimeService,
  stopRealTimeService,
  startRealTimeListener,
  stopRealTimeListener,
  stopAllRealTimeListeners,
  addRealTimeData,
  updateRealTimeData,
  deleteRealTimeData,
  getConnectionStatus,
  getActiveListeners,
  reconnect,
};
