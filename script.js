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
