/* eslint-disable */

importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBjHpYykXfglKuHedA625gKrEQsHtPiLgQ",
  projectId: "fcm-test-4a789",
  messagingSenderId: "661055039703",
  appId: "1:661055039703:web:15908d793c8c51f277a892",
});

const messaging = firebase.messaging();

// 백그라운드 상태에서 메시지 수신
messaging.onBackgroundMessage(function (payload) {
  alert("백그라운드 메시지 수신");
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload.notification
  );
});
