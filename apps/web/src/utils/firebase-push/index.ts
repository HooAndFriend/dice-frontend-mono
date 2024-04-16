import { app } from "@/src/config/firebaseConfig";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    return await getFirebaseToken();
  }
}

export async function getFirebaseToken() {
  try {
    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined"
    ) {
      const messaging = getMessaging(app);
      const fcmToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      });
      if (fcmToken) {
        onMessage(messaging, (payload) => {
          console.log("Foreground Message received. ", payload);

          new Notification(payload.notification?.title ?? "Default Title", {
            body: payload.notification?.body,
          });
        });

        return fcmToken;
      }

      requestNotificationPermission();
    }
  } catch (error) {
    console.log("ERROR : ", error);
  }
}
