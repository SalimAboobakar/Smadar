// Service Worker for Tadawom Platform PWA
// خدمة العامل للتطبيق التقدمي لمنصة يدوم

const CACHE_NAME = "tadawom-v1.0.0";
const OFFLINE_URL = "/offline.html";

// الملفات المطلوب تخزينها مؤقتاً
const STATIC_CACHE_URLS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png",
  OFFLINE_URL,
];

// الملفات الديناميكية المطلوب تخزينها
const DYNAMIC_CACHE_URLS = [
  "/admin",
  "/investor",
  "/voter",
  "/investment",
  "/dashboard",
  "/market",
];

// استراتيجيات التخزين المؤقت
const CACHE_STRATEGIES = {
  // ملفات ثابتة - Cache First
  STATIC: "cache-first",
  // API calls - Network First
  API: "network-first",
  // الصور - Cache First مع fallback
  IMAGES: "cache-first",
  // الصفحات - Network First مع Cache Fallback
  PAGES: "network-first",
};

// تثبيت Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Caching static files");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log("Service Worker: Static files cached");
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Service Worker: Cache installation failed:", error);
      })
  );
});

// تفعيل Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    // حذف الـ caches القديمة
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log("Service Worker: Activated");
        return self.clients.claim();
      })
  );
});

// اعتراض الطلبات
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // تجاهل الطلبات غير المتعلقة بالموقع
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  event.respondWith(handleRequest(request));
});

// معالجة الطلبات حسب النوع
async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // API calls - Network First
    if (
      pathname.includes("/api/") ||
      url.hostname.includes("firestore.googleapis.com") ||
      url.hostname.includes("generativelanguage.googleapis.com")
    ) {
      return await networkFirst(request);
    }

    // الصور - Cache First
    if (request.destination === "image") {
      return await cacheFirst(request);
    }

    // ملفات CSS/JS - Cache First
    if (pathname.includes("/static/")) {
      return await cacheFirst(request);
    }

    // الصفحات - Network First مع Cache Fallback
    if (request.mode === "navigate") {
      return await networkFirstWithOffline(request);
    }

    // باقي الطلبات - Network First
    return await networkFirst(request);
  } catch (error) {
    console.error("Service Worker: Request handling failed:", error);

    // في حالة فشل كل شيء، إرجاع صفحة offline للصفحات
    if (request.mode === "navigate") {
      return await caches.match(OFFLINE_URL);
    }

    throw error;
  }
}

// استراتيجية Cache First
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    // تحديث الـ cache في الخلفية
    updateCacheInBackground(request);
    return cachedResponse;
  }

  // إذا لم يكن في الـ cache، جلب من الشبكة وحفظ
  const networkResponse = await fetch(request);
  await addToCache(request, networkResponse.clone());
  return networkResponse;
}

// استراتيجية Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    // حفظ الاستجابة الناجحة في الـ cache
    if (networkResponse.ok) {
      await addToCache(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // في حالة فشل الشبكة، البحث في الـ cache
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

// استراتيجية Network First مع صفحة Offline
async function networkFirstWithOffline(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      await addToCache(request, networkResponse.clone());
      return networkResponse;
    }

    throw new Error("Network response not ok");
  } catch (error) {
    // البحث في الـ cache أولاً
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // إرجاع صفحة offline
    return await caches.match(OFFLINE_URL);
  }
}

// إضافة إلى الـ cache
async function addToCache(request, response) {
  // تجاهل الطلبات POST وغيرها
  if (request.method !== "GET") {
    return;
  }

  // تجاهل الاستجابات غير الناجحة
  if (!response.ok) {
    return;
  }

  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response);
  } catch (error) {
    console.error("Service Worker: Failed to add to cache:", error);
  }
}

// تحديث الـ cache في الخلفية
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      await addToCache(request, networkResponse.clone());
    }
  } catch (error) {
    // تجاهل الأخطاء في التحديث الخلفي
    console.log("Service Worker: Background update failed (ignored):", error);
  }
}

// معالجة رسائل من التطبيق الرئيسي
self.addEventListener("message", (event) => {
  const { data } = event;

  switch (data.type) {
    case "SKIP_WAITING":
      self.skipWaiting();
      break;

    case "GET_VERSION":
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;

    case "CLEAR_CACHE":
      caches
        .delete(CACHE_NAME)
        .then(() => {
          event.ports[0].postMessage({ success: true });
        })
        .catch((error) => {
          event.ports[0].postMessage({ success: false, error: error.message });
        });
      break;

    default:
      console.log("Service Worker: Unknown message type:", data.type);
  }
});

// معالجة Push Notifications
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push received");

  const options = {
    body: "لديك إشعار جديد من منصة يدوم",
    icon: "/logo192.png",
    badge: "/logo192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "explore",
        title: "استكشاف",
        icon: "/logo192.png",
      },
      {
        action: "close",
        title: "إغلاق",
        icon: "/logo192.png",
      },
    ],
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || "منصة يدوم";
  }

  event.waitUntil(self.registration.showNotification("منصة يدوم", options));
});

// معالجة النقر على الإشعارات
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked");

  event.notification.close();

  if (event.action === "close") {
    return;
  }

  // فتح التطبيق أو التركيز عليه
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // إذا كان التطبيق مفتوح، التركيز عليه
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === "/" && "focus" in client) {
          return client.focus();
        }
      }

      // إذا لم يكن مفتوح، فتح نافذة جديدة
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    })
  );
});

// معالجة Background Sync
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered");

  if (event.tag === "background-sync") {
    event.waitUntil(
      // مزامنة البيانات المؤجلة
      syncOfflineData()
    );
  }
});

// مزامنة البيانات المؤجلة
async function syncOfflineData() {
  try {
    // هنا يمكن إضافة منطق مزامنة البيانات
    // مثل إرسال البيانات المحفوظة محلياً إلى الخادم
    console.log("Service Worker: Syncing offline data...");

    // إشعار التطبيق الرئيسي بنجاح المزامنة
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_SUCCESS",
        message: "تم مزامنة البيانات بنجاح",
      });
    });
  } catch (error) {
    console.error("Service Worker: Sync failed:", error);

    // إشعار التطبيق الرئيسي بفشل المزامنة
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({
        type: "SYNC_ERROR",
        message: "فشل في مزامنة البيانات",
      });
    });
  }
}

console.log("Service Worker: Script loaded successfully");
