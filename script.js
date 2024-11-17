// script.js

// إعدادات Service Worker (للتثبيت والتحديث)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((registration) => {
            console.log('Service Worker registered with scope: ', registration.scope);
        }).catch((error) => {
            console.log('Service Worker registration failed: ', error);
        });
    });
}

// إظهار إشعارات المستخدم
document.getElementById('notifyBtn').addEventListener('click', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((result) => {
            if (result === 'granted') {
                new Notification("Thanks for enabling notifications!");
            }
        });
    } else {
        new Notification("You already enabled notifications.");
    }
});

// إضافة ميزة تثبيت التطبيق
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
installBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
        });
    }
});

// خدمة لاسترجاع البيانات عند عدم الاتصال بالإنترنت
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', function(event) {
        if (event.data === 'online') {
            console.log('Website is online');
        } else if (event.data === 'offline') {
            console.log('Website is offline');
        }
    });
}
