// lib/oneSignal.ts
import OneSignal from "react-native-onesignal";
import { ONESIGNAL_APP_ID } from "@env";

export const initOneSignal = () => {
  if (!ONESIGNAL_APP_ID) {
    console.warn("❗ ONESIGNAL_APP_ID is missing in .env");
    return;
  }

  // Инициализация
  OneSignal.initialize(ONESIGNAL_APP_ID);

  // Логи для разработки
  OneSignal.Debug.setLogLevel(6);

  // Разрешения для пушей (Android сам запросит, на iOS важно)
  OneSignal.Notifications.requestPermission(true);

  // Срабатывает, когда пользователь нажимает на уведомление
  OneSignal.Notifications.addEventListener("click", event => {
    console.log("🔔 Notification clicked:", event);
  });

  // Срабатывает, когда уведомление приходит в Foreground
  OneSignal.Notifications.addEventListener("foregroundWillDisplay", event => {
    console.log("📩 Notification in foreground:", event);

    // Можем кастомизировать, но пока показываем
    event.preventDefault();
    event.getNotification().display();
  });
};