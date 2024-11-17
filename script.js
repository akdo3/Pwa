let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// التعامل مع الحدث قبل التثبيت
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // منع ظهور نافذة التثبيت التلقائي
  deferredPrompt = event; // تخزين الحدث
  installBtn.style.display = 'block'; // إظهار زر التثبيت
});

// تثبيت التطبيق عند الضغط على الزر
installBtn.addEventListener('click', () => {
  deferredPrompt.prompt(); // عرض نافذة التثبيت للمستخدم
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
});

// تسجيل الـ Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}

// التعامل مع زر "إنشاء تطبيق" وتخصيصات المستخدم
document.getElementById('generateAppBtn').addEventListener('click', () => {
  const themeColor = document.getElementById('themeColor').value;
  const iconUpload = document.getElementById('iconUpload').files[0];

  // تحديث ملف الـ Manifest بناءً على التخصيصات
  const manifest = {
    name: "تطبيق PWA مخصص",
    short_name: "تطبيق PWA",
    description: "تطبيق ويب مخصص من قبل المستخدم.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: themeColor,
    icons: [
      {
        src: URL.createObjectURL(iconUpload),
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: URL.createObjectURL(iconUpload),
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  // تحديث ملف Manifest (يمكن تخزينه في الـ server أو إرساله إلى الملف بشكل ديناميكي)
  console.log('تم تحديث التخصيصات:', manifest);
});
