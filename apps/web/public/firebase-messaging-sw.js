/* eslint-disable */

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
});

const messaging = firebase.messaging();

// 백그라운드 상태에서 메시지 수신
messaging.onBackgroundMessage(function (payload) {
  // 여기에 알림 메시지 처리 코드를 추가
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
