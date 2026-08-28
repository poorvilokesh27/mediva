import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { supabase } from "../config/supabase";

// ======================================================
// ANDROID CHANNEL
// ======================================================

const CHANNEL_ID = "medipal-alerts-v2";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ======================================================
// CREATE ANDROID NOTIFICATION CHANNEL
// ======================================================

async function createNotificationChannel() {
  if (Platform.OS !== "android") {
    return;
  }

  try {
    await Notifications.setNotificationChannelAsync(
      CHANNEL_ID,
      {
        name: "Medipal Medicine Alerts",
        description: "Medicine reminder notifications",
        importance:
          Notifications.AndroidImportance.MAX,
        sound: "default",
        vibrationPattern: [0, 250, 250, 250],
        enableVibrate: true,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: false,
      }
    );

    console.log(
      "Notification channel created:",
      CHANNEL_ID
    );
  } catch (error) {
    console.log(
      "Channel creation error:",
      error
    );
  }
}

// ======================================================
// REQUEST NOTIFICATION PERMISSION
// ======================================================

export async function requestNotificationPermission() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log(
        "Notification permission not granted"
      );

      return false;
    }

    await createNotificationChannel();

    console.log(
      "Notification permission granted"
    );

    return true;
  } catch (error) {
    console.log(
      "Permission error:",
      error
    );

    return false;
  }
}

// ======================================================
// SCHEDULE DAILY REMINDER
// ======================================================

export async function scheduleDailyReminder({
  medicineName,
  hour,
  minute,
}) {
  try {
    const permission =
      await requestNotificationPermission();

    if (!permission) {
      throw new Error(
        "Notification permission was not granted."
      );
    }

    await createNotificationChannel();

    const notificationId =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time for your medicine 💊",
          body: `It's time to take ${medicineName}`,
          sound: "default",

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes
              .DAILY,

          hour: Number(hour),
          minute: Number(minute),

          repeats: true,

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },
      });

    console.log(
      "Daily notification scheduled:",
      notificationId
    );

    return notificationId;
  } catch (error) {
    console.log(
      "Schedule daily notification error:",
      error
    );

    throw error;
  }
}

// ======================================================
// SCHEDULE ONE-TIME REMINDER
// ======================================================

export async function scheduleOneTimeReminder({
  medicineName,
  date,
}) {
  try {
    const permission =
      await requestNotificationPermission();

    if (!permission) {
      throw new Error(
        "Notification permission was not granted."
      );
    }

    await createNotificationChannel();

    const notificationId =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time for your medicine 💊",
          body: `It's time to take ${medicineName}`,
          sound: "default",

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes
              .DATE,

          date: date,
          repeats: false,

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },
      });

    console.log(
      "One-time notification scheduled:",
      notificationId
    );

    return notificationId;
  } catch (error) {
    console.log(
      "Schedule one-time notification error:",
      error
    );

    throw error;
  }
}

// ======================================================
// SCHEDULE WEEKLY REMINDER
// ======================================================

export async function scheduleWeeklyReminder({
  medicineName,
  hour,
  minute,
  weekday,
}) {
  try {
    const permission =
      await requestNotificationPermission();

    if (!permission) {
      throw new Error(
        "Notification permission was not granted."
      );
    }

    await createNotificationChannel();

    const notificationId =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time for your medicine 💊",
          body: `It's time to take ${medicineName}`,
          sound: "default",

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes
              .WEEKLY,

          weekday: Number(weekday),
          hour: Number(hour),
          minute: Number(minute),

          repeats: true,

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },
      });

    console.log(
      "Weekly notification scheduled:",
      notificationId
    );

    return notificationId;
  } catch (error) {
    console.log(
      "Schedule weekly notification error:",
      error
    );

    throw error;
  }
}

// ======================================================
// COMPATIBILITY SCHEDULE FUNCTION
// ======================================================

export async function scheduleReminder({
  medicineName,
  hour,
  minute,
}) {
  return await scheduleDailyReminder({
    medicineName,
    hour,
    minute,
  });
}

// ======================================================
// CREATE REMINDER
// THIS MATCHES RemindersScreen.js PAYLOAD
// ======================================================

export async function createReminder(payload) {
  try {
    console.log(
      "CREATE REMINDER RECEIVED:",
      payload
    );

    const {
      user_id,
      medicine_name,
      hour,
      minute,
      repeat_type = "daily",
      reminder_date = null,
      selected_days = [],
    } = payload || {};

    // --------------------------------------------------
    // VALIDATION
    // --------------------------------------------------

    if (!user_id) {
      throw new Error(
        "User ID is required"
      );
    }

    if (
      !medicine_name ||
      !String(medicine_name).trim()
    ) {
      throw new Error(
        "Medicine name is required"
      );
    }

    if (
      hour === undefined ||
      hour === null ||
      minute === undefined ||
      minute === null
    ) {
      throw new Error(
        "Reminder time is required"
      );
    }

    const cleanMedicineName =
      String(medicine_name).trim();

    const numericHour = Number(hour);
    const numericMinute = Number(minute);

    console.log(
      "REMINDER DATA:",
      {
        user_id,
        medicine_name: cleanMedicineName,
        hour: numericHour,
        minute: numericMinute,
        repeat_type,
        reminder_date,
        selected_days,
      }
    );

    // --------------------------------------------------
    // REQUEST PERMISSION
    // --------------------------------------------------

    const permission =
      await requestNotificationPermission();

    if (!permission) {
      throw new Error(
        "Notification permission was not granted."
      );
    }

    // --------------------------------------------------
    // SCHEDULE NOTIFICATION
    // --------------------------------------------------

    let notificationId = null;

    if (repeat_type === "once") {
      let reminderDate;

      if (reminder_date) {
        reminderDate = new Date(
          `${reminder_date}T${String(
            numericHour
          ).padStart(
            2,
            "0"
          )}:${String(
            numericMinute
          ).padStart(
            2,
            "0"
          )}:00`
        );
      } else {
        reminderDate = new Date();

        reminderDate.setHours(
          numericHour,
          numericMinute,
          0,
          0
        );
      }

      notificationId =
        await scheduleOneTimeReminder({
          medicineName:
            cleanMedicineName,
          date: reminderDate,
        });
    } else if (
      repeat_type === "weekly"
    ) {
      const days =
        Array.isArray(selected_days)
          ? selected_days
          : [];

      if (days.length === 0) {
        throw new Error(
          "Please select at least one day."
        );
      }

      // Schedule one notification for
      // each selected weekday.
      const notificationIds = [];

      for (const day of days) {
        const id =
          await scheduleWeeklyReminder({
            medicineName:
              cleanMedicineName,
            hour: numericHour,
            minute: numericMinute,
            weekday: Number(day),
          });

        notificationIds.push(id);
      }

      notificationId =
        notificationIds.join(",");
    } else {
      notificationId =
        await scheduleDailyReminder({
          medicineName:
            cleanMedicineName,
          hour: numericHour,
          minute: numericMinute,
        });
    }

    console.log(
      "NOTIFICATION ID:",
      notificationId
    );

    // --------------------------------------------------
    // SAVE TO SUPABASE
    // --------------------------------------------------

    const { data, error } =
      await supabase
        .from("reminders")
        .insert({
          user_id: user_id,
          medicine_name:
            cleanMedicineName,
          hour: numericHour,
          minute: numericMinute,
          notification_id:
            notificationId,

          repeat_type:
            repeat_type,

          reminder_date:
            reminder_date,

          selected_days:
            selected_days,
        })
        .select()
        .single();

    // --------------------------------------------------
    // DATABASE ERROR
    // --------------------------------------------------

    if (error) {
      console.log(
        "CREATE REMINDER DATABASE ERROR:",
        error
      );

      // Cancel scheduled notification
      if (notificationId) {
        const ids =
          String(notificationId).split(",");

        for (const id of ids) {
          if (id) {
            try {
              await Notifications.cancelScheduledNotificationAsync(
                id
              );
            } catch (cancelError) {
              console.log(
                "Cancel notification failed:",
                cancelError
              );
            }
          }
        }
      }

      throw error;
    }

    console.log(
      "REMINDER CREATED SUCCESSFULLY:",
      data
    );

    return data;
  } catch (error) {
    console.log(
      "CREATE REMINDER ERROR:",
      error
    );

    throw error;
  }
}

// ======================================================
// SAVE REMINDER TO SUPABASE
// ======================================================

export async function saveReminderToDB(
  userId,
  medicineName,
  hour,
  minute,
  notificationId,
  repeatType = "daily",
  reminderDate = null,
  selectedDays = []
) {
  try {
    const { data, error } =
      await supabase
        .from("reminders")
        .insert({
          user_id: userId,
          medicine_name: medicineName,
          hour: Number(hour),
          minute: Number(minute),
          notification_id:
            notificationId,
          repeat_type: repeatType,
          reminder_date: reminderDate,
          selected_days: selectedDays,
        })
        .select()
        .single();

    if (error) {
      console.log(
        "Save reminder error:",
        error.message
      );

      throw error;
    }

    console.log(
      "Reminder saved to Supabase:",
      data
    );

    return data;
  } catch (error) {
    console.log(
      "Database error:",
      error
    );

    throw error;
  }
}

// ======================================================
// GET REMINDERS
// ======================================================

export async function getReminders(userId) {
  try {
    if (!userId) {
      console.log(
        "getReminders: userId missing"
      );

      return [];
    }

    const { data, error } =
      await supabase
        .from("reminders")
        .select("*")
        .eq("user_id", userId)
        .order("hour", {
          ascending: true,
        })
        .order("minute", {
          ascending: true,
        });

    if (error) {
      console.log(
        "Get reminders error:",
        error.message
      );

      return [];
    }

    console.log(
      "Reminders loaded:",
      data
    );

    return data || [];
  } catch (error) {
    console.log(
      "Get reminders error:",
      error
    );

    return [];
  }
}

// ======================================================
// CANCEL NOTIFICATION
// ======================================================

export async function cancelReminder(
  notificationId
) {
  try {
    if (!notificationId) {
      return;
    }

    const ids =
      String(notificationId).split(",");

    for (const id of ids) {
      if (id) {
        await Notifications.cancelScheduledNotificationAsync(
          id
        );
      }
    }

    console.log(
      "Notification cancelled:",
      notificationId
    );
  } catch (error) {
    console.log(
      "Cancel notification error:",
      error
    );
  }
}

// ======================================================
// DELETE REMINDER
// ======================================================

export async function deleteReminder(
  reminderId,
  notificationId
) {
  try {
    if (!reminderId) {
      throw new Error(
        "Reminder ID is required."
      );
    }

    if (notificationId) {
      await cancelReminder(
        notificationId
      );
    }

    const { error } =
      await supabase
        .from("reminders")
        .delete()
        .eq("id", reminderId);

    if (error) {
      console.log(
        "Delete reminder error:",
        error.message
      );

      throw error;
    }

    console.log(
      "Reminder deleted:",
      reminderId
    );

    return true;
  } catch (error) {
    console.log(
      "Delete reminder error:",
      error
    );

    throw error;
  }
}

// ======================================================
// TEST NOTIFICATION — 10 SECONDS
// ======================================================

export async function testNotification() {
  try {
    const permission =
      await requestNotificationPermission();

    if (!permission) {
      throw new Error(
        "Notification permission was not granted."
      );
    }

    await createNotificationChannel();

    console.log(
      "Testing notification in 10 seconds..."
    );

    const id =
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medipal Test 💊",
          body:
            "Your notification sound is being tested.",
          sound: "default",

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },

        trigger: {
          type:
            Notifications.SchedulableTriggerInputTypes
              .TIME_INTERVAL,

          seconds: 10,
          repeats: false,

          ...(Platform.OS === "android"
            ? {
                channelId: CHANNEL_ID,
              }
            : {}),
        },
      });

    console.log(
      "Test notification ID:",
      id
    );

    return id;
  } catch (error) {
    console.log(
      "Test notification error:",
      error
    );

    throw error;
  }
}

// ======================================================
// VIEW ALL SCHEDULED NOTIFICATIONS
// ======================================================

export async function getScheduledNotifications() {
  try {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    console.log(
      "Scheduled notifications:",
      notifications
    );

    return notifications;
  } catch (error) {
    console.log(
      "Get scheduled notifications error:",
      error
    );

    return [];
  }
}

// ======================================================
// CANCEL ALL NOTIFICATIONS
// ======================================================

export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    console.log(
      "All notifications cancelled"
    );
  } catch (error) {
    console.log(
      "Cancel all notifications error:",
      error
    );
  }
}