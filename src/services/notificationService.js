import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { supabase } from "../config/supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("medicine-reminders", {
      name: "Medicine Reminders",
      importance: Notifications.AndroidImportance.MAX,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  return finalStatus === "granted";
}

// hour/minute in 24h format, repeats daily
export async function scheduleDailyReminder({ medicineName, hour, minute }) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time for your medicine 💊",
      body: `It's time to take ${medicineName}`,
      sound: "default",
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
  return id; // save this id if you want to cancel it later
}

export async function cancelReminder(notificationId) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// --- Persist reminders in Supabase so they survive reinstalls/device switches ---
export async function saveReminderToDB(userId, medicineName, hour, minute, notificationId) {
  const { data, error } = await supabase
    .from("reminders")
    .insert({
      user_id: userId,
      medicine_name: medicineName,
      hour,
      minute,
      notification_id: notificationId,
    })
    .select()
    .single();
  if (error) console.log("Save reminder error:", error.message);
  return data;
}

export async function getReminders(userId) {
  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", userId)
    .order("hour", { ascending: true });
  if (error) {
    console.log("Get reminders error:", error.message);
    return [];
  }
  return data;
}

export async function deleteReminder(reminderId, notificationId) {
  if (notificationId) await cancelReminder(notificationId);
  const { error } = await supabase.from("reminders").delete().eq("id", reminderId);
  if (error) console.log("Delete reminder error:", error.message);
}
