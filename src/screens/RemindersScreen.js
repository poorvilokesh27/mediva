import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import ReminderCard from "../components/ReminderCard";
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  saveReminderToDB,
  getReminders,
  deleteReminder,
} from "../services/notificationService";
import { useAuth } from "../context/AuthContext";

export default function RemindersScreen() {
  const { user } = useAuth();
  const [medicineName, setMedicineName] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reminders, setReminders] = useState([]);

  const loadReminders = useCallback(() => {
    if (user) getReminders(user.id).then(setReminders);
  }, [user]);

  useFocusEffect(loadReminders);

  const handleAddReminder = async () => {
    if (!medicineName.trim()) {
      Alert.alert("Missing name", "Please enter the medicine name.");
      return;
    }
    const granted = await requestNotificationPermission();
    if (!granted) {
      Alert.alert("Permission needed", "Please enable notifications to set reminders.");
      return;
    }

    const hour = time.getHours();
    const minute = time.getMinutes();
    const notificationId = await scheduleDailyReminder({ medicineName, hour, minute });
    await saveReminderToDB(user.id, medicineName, hour, minute, notificationId);

    setMedicineName("");
    loadReminders();
    Alert.alert("Reminder set", `You'll be reminded to take ${medicineName} daily.`);
  };

  const handleDelete = async (reminder) => {
    await deleteReminder(reminder.id, reminder.notification_id);
    loadReminders();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Medicine Reminders</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Medicine name (e.g. Metformin)"
          value={medicineName}
          onChangeText={setMedicineName}
        />

        <TouchableOpacity style={styles.timeBtn} onPress={() => setShowPicker(true)}>
          <Text style={styles.timeText}>
            Time: {time.getHours().toString().padStart(2, "0")}:
            {time.getMinutes().toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={false}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selected) => {
              setShowPicker(Platform.OS === "ios");
              if (selected) setTime(selected);
            }}
          />
        )}

        <TouchableOpacity style={styles.addBtn} onPress={handleAddReminder}>
          <Text style={styles.addBtnText}>Set Alarm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ReminderCard reminder={item} onDelete={() => handleDelete(item)} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No reminders set yet.</Text>}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  heading: { fontSize: 20, fontWeight: "700", color: "#222", margin: 16 },
  form: { backgroundColor: "#fff", marginHorizontal: 16, borderRadius: 12, padding: 16, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  timeBtn: {
    backgroundColor: "#F0F6FF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  timeText: { color: "#1E88E5", fontWeight: "700", fontSize: 15 },
  addBtn: { backgroundColor: "#1E88E5", borderRadius: 10, paddingVertical: 13, alignItems: "center" },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  empty: { textAlign: "center", color: "#888", marginTop: 20 },
});
