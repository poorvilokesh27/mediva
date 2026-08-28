
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  ScrollView,
} from "react-native";

import {
  useFocusEffect,
} from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  getReminders,
  createReminder,
  deleteReminder,
} from "../services/notificationService";

import { useAuth } from "../context/AuthContext";

// =====================================================
// DAYS
// =====================================================

const DAYS = [
  {
    id: 0,
    short: "Sun",
    name: "Sunday",
  },
  {
    id: 1,
    short: "Mon",
    name: "Monday",
  },
  {
    id: 2,
    short: "Tue",
    name: "Tuesday",
  },
  {
    id: 3,
    short: "Wed",
    name: "Wednesday",
  },
  {
    id: 4,
    short: "Thu",
    name: "Thursday",
  },
  {
    id: 5,
    short: "Fri",
    name: "Friday",
  },
  {
    id: 6,
    short: "Sat",
    name: "Saturday",
  },
];

// =====================================================
// REPEAT OPTIONS
// =====================================================

const REPEAT_OPTIONS = [
  {
    id: "once",
    title: "Once",
    subtitle: "Remind me only once",
  },
  {
    id: "daily",
    title: "Every day",
    subtitle: "Repeat every day",
  },
  {
    id: "weekly",
    title: "Selected days",
    subtitle: "Choose specific days",
  },
];

// =====================================================
// COMPONENT
// =====================================================

export default function RemindersScreen() {
  const { user } = useAuth();

  const [reminders, setReminders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [medicineName, setMedicineName] =
    useState("");

  const [time, setTime] = useState(
    new Date()
  );

  const [showTimePicker, setShowTimePicker] =
    useState(false);

  const [repeatType, setRepeatType] =
    useState("daily");

  const [selectedDays, setSelectedDays] =
    useState([]);

  const [reminderDate, setReminderDate] =
    useState(new Date());

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);

  // =====================================================
  // LOAD REMINDERS
  // =====================================================

  const loadReminders = useCallback(
    async () => {
      if (!user) {
        setReminders([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data =
          await getReminders(user.id);

        console.log(
          "REMINDERS LOADED:",
          data
        );

        setReminders(data || []);
      } catch (error) {
        console.log(
          "REMINDER LOAD ERROR:",
          error
        );

        setReminders([]);
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  useFocusEffect(
    useCallback(() => {
      loadReminders();
    }, [loadReminders])
  );

  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddReminder = () => {
    setMedicineName("");

    const now = new Date();

    setTime(now);
    setReminderDate(now);

    setRepeatType("daily");
    setSelectedDays([]);

    setModalVisible(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setModalVisible(false);
  };

  // =====================================================
  // TIME
  // =====================================================

  const handleTimeChange = (
    event,
    selectedTime
  ) => {
    setShowTimePicker(false);

    if (event?.type === "dismissed") {
      return;
    }

    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  // =====================================================
  // DATE
  // =====================================================

  const handleDateChange = (
    event,
    selectedDate
  ) => {
    setShowDatePicker(false);

    if (event?.type === "dismissed") {
      return;
    }

    if (selectedDate) {
      setReminderDate(selectedDate);
    }
  };

  // =====================================================
  // SELECT DAY
  // =====================================================

  const toggleDay = (dayId) => {
    setSelectedDays((previous) => {
      if (previous.includes(dayId)) {
        return previous.filter(
          (day) => day !== dayId
        );
      }

      return [
        ...previous,
        dayId,
      ].sort((a, b) => a - b);
    });
  };

  // =====================================================
  // REPEAT TYPE
  // =====================================================

  const handleRepeatChange = (
    type
  ) => {
    setRepeatType(type);

    if (type !== "weekly") {
      setSelectedDays([]);
    }
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =====================================================
  // REPEAT LABEL
  // =====================================================

  const getRepeatLabel = (
    reminder
  ) => {
    const type =
      reminder?.repeat_type ||
      "daily";

    if (type === "once") {
      if (reminder.reminder_date) {
        return `Once • ${formatDate(
          new Date(
            reminder.reminder_date
          )
        )}`;
      }

      return "Once";
    }

    if (type === "weekly") {
      const days =
        Array.isArray(
          reminder.selected_days
        )
          ? reminder.selected_days
          : [];

      if (days.length === 0) {
        return "Selected days";
      }

      const names = days.map(
        (dayId) =>
          DAYS.find(
            (day) =>
              day.id === dayId
          )?.short
      );

      return names.join(" • ");
    }

    return "Every day";
  };

  // =====================================================
  // SAVE REMINDER
  // =====================================================

  const handleSave = async () => {
    if (!user) {
      Alert.alert(
        "Login required",
        "Please sign in first."
      );

      return;
    }

    const cleanName =
      medicineName.trim();

    if (!cleanName) {
      Alert.alert(
        "Medicine name required",
        "Please enter the medicine name."
      );

      return;
    }

    if (
      repeatType === "weekly" &&
      selectedDays.length === 0
    ) {
      Alert.alert(
        "Select days",
        "Please select at least one day."
      );

      return;
    }

    try {
      setSaving(true);

      const hour =
        time.getHours();

      const minute =
        time.getMinutes();

      const payload = {
        user_id: user.id,
        medicine_name: cleanName,
        hour,
        minute,
        repeat_type: repeatType,
        reminder_date:
          repeatType === "once"
            ? reminderDate
                .toISOString()
                .split("T")[0]
            : null,
        selected_days:
          repeatType === "weekly"
            ? selectedDays
            : [],
      };

      console.log(
        "CREATING REMINDER:",
        payload
      );

      const result =
        await createReminder(
          payload
        );

      if (!result) {
        throw new Error(
          "Reminder creation returned no result."
        );
      }

      console.log(
        "REMINDER CREATED:",
        result
      );

      setModalVisible(false);

      await loadReminders();

      Alert.alert(
        "Reminder added",
        `${cleanName} is scheduled for ${formatTime(
          time
        )}.`
      );
    } catch (error) {
      console.log(
        "FULL REMINDER ERROR:",
        error
      );

      Alert.alert(
        "Reminder could not be created",
        error?.message ||
          "Please check the VS Code console for the exact error."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (
    reminder
  ) => {
    Alert.alert(
      "Delete reminder",
      `Delete reminder for ${reminder.medicine_name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReminder(
                reminder.id,
                reminder.notification_id
              );

              await loadReminders();
            } catch (error) {
              console.log(
                "DELETE REMINDER ERROR:",
                error
              );

              Alert.alert(
                "Delete failed",
                error?.message ||
                  "Could not delete reminder."
              );
            }
          },
        },
      ]
    );
  };

  // =====================================================
  // RENDER REMINDER
  // =====================================================

  const renderReminder = ({
    item,
  }) => {
    const reminderTime =
      new Date();

    reminderTime.setHours(
      Number(item.hour) || 0
    );

    reminderTime.setMinutes(
      Number(item.minute) || 0
    );

    return (
      <View style={styles.reminderCard}>
        <View style={styles.reminderIcon}>
          <Text style={styles.reminderEmoji}>
            ⏰
          </Text>
        </View>

        <View style={styles.reminderInfo}>
          <Text style={styles.medicineName}>
            {item.medicine_name}
          </Text>

          <Text style={styles.reminderTime}>
            {formatTime(
              reminderTime
            )}
          </Text>

          <Text style={styles.repeatLabel}>
            {getRepeatLabel(item)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() =>
            handleDelete(item)
          }
        >
          <Text style={styles.deleteText}>
            🗑️
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // =====================================================
  // SCREEN
  // =====================================================

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Reminders
          </Text>

          <Text style={styles.subtitle}>
            Never miss your medicine
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddReminder}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#1E88E5"
          />

          <Text style={styles.loadingText}>
            Loading reminders...
          </Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item, index) =>
            String(
              item?.id ||
                `reminder-${index}`
            )
          }
          renderItem={
            renderReminder
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            reminders.length === 0
              ? styles.emptyList
              : styles.list
          }
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>
                ⏰
              </Text>

              <Text style={styles.emptyTitle}>
                No reminders yet
              </Text>

              <Text style={styles.emptyText}>
                Add a medicine reminder and
                Medipal will keep it on your
                schedule.
              </Text>

              <TouchableOpacity
                style={styles.emptyButton}
                onPress={
                  openAddReminder
                }
              >
                <Text
                  style={
                    styles.emptyButtonText
                  }
                >
                  Add Reminder
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {/* =================================================
          ADD REMINDER MODAL
          ================================================= */}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={
          closeModal
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
              keyboardShouldPersistTaps="handled"
            >
              {/* MODAL HEADER */}

              <View
                style={
                  styles.modalHeader
                }
              >
                <View>
                  <Text
                    style={
                      styles.modalTitle
                    }
                  >
                    Add Reminder
                  </Text>

                  <Text
                    style={
                      styles.modalSubtitle
                    }
                  >
                    Set when you want Medipal
                    to remind you.
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={closeModal}
                  disabled={saving}
                >
                  <Text
                    style={
                      styles.closeButton
                    }
                  >
                    ×
                  </Text>
                </TouchableOpacity>
              </View>

              {/* MEDICINE */}

              <Text
                style={
                  styles.inputLabel
                }
              >
                Medicine name
              </Text>

              <TextInput
                value={medicineName}
                onChangeText={
                  setMedicineName
                }
                placeholder="e.g. Paracetamol"
                placeholderTextColor="#9AA3AF"
                style={styles.textInput}
                editable={!saving}
              />

              {/* TIME */}

              <Text
                style={[
                  styles.inputLabel,
                  {
                    marginTop: 18,
                  },
                ]}
              >
                Reminder time
              </Text>

              <TouchableOpacity
                style={styles.timeButton}
                onPress={() =>
                  setShowTimePicker(
                    true
                  )
                }
                disabled={saving}
              >
                <Text style={styles.timeIcon}>
                  ⏰
                </Text>

                <View>
                  <Text
                    style={
                      styles.timeValue
                    }
                  >
                    {formatTime(time)}
                  </Text>

                  <Text
                    style={
                      styles.timeHint
                    }
                  >
                    Tap to change time
                  </Text>
                </View>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={
                    handleTimeChange
                  }
                />
              )}

              {/* REPEAT */}

              <Text
                style={[
                  styles.inputLabel,
                  {
                    marginTop: 20,
                  },
                ]}
              >
                Repeat
              </Text>

              {REPEAT_OPTIONS.map(
                (option) => {
                  const active =
                    repeatType ===
                    option.id;

                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.repeatOption,
                        active &&
                          styles.repeatOptionActive,
                      ]}
                      onPress={() =>
                        handleRepeatChange(
                          option.id
                        )
                      }
                      disabled={saving}
                    >
                      <View
                        style={
                          styles.radio
                        }
                      >
                        {active && (
                          <View
                            style={
                              styles.radioInner
                            }
                          />
                        )}
                      </View>

                      <View
                        style={
                          styles.repeatContent
                        }
                      >
                        <Text
                          style={[
                            styles.repeatTitle,
                            active &&
                              styles.repeatTitleActive,
                          ]}
                        >
                          {
                            option.title
                          }
                        </Text>

                        <Text
                          style={
                            styles.repeatSubtitle
                          }
                        >
                          {
                            option.subtitle
                          }
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }
              )}

              {/* ONCE DATE */}

              {repeatType ===
                "once" && (
                <View>
                  <Text
                    style={
                      styles.inputLabel
                    }
                  >
                    Reminder date
                  </Text>

                  <TouchableOpacity
                    style={
                      styles.dateButton
                    }
                    onPress={() =>
                      setShowDatePicker(
                        true
                      )
                    }
                  >
                    <Text
                      style={
                        styles.dateIcon
                      }
                    >
                      📅
                    </Text>

                    <Text
                      style={
                        styles.dateText
                      }
                    >
                      {formatDate(
                        reminderDate
                      )}
                    </Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={
                        reminderDate
                      }
                      mode="date"
                      minimumDate={
                        new Date()
                      }
                      display="default"
                      onChange={
                        handleDateChange
                      }
                    />
                  )}
                </View>
              )}

              {/* SELECTED DAYS */}

              {repeatType ===
                "weekly" && (
                <View>
                  <Text
                    style={
                      styles.inputLabel
                    }
                  >
                    Select days
                  </Text>

                  <View
                    style={
                      styles.daysRow
                    }
                  >
                    {DAYS.map(
                      (day) => {
                        const active =
                          selectedDays.includes(
                            day.id
                          );

                        return (
                          <TouchableOpacity
                            key={
                              day.id
                            }
                            style={[
                              styles.dayButton,
                              active &&
                                styles.dayButtonActive,
                            ]}
                            onPress={() =>
                              toggleDay(
                                day.id
                              )
                            }
                            disabled={
                              saving
                            }
                          >
                            <Text
                              style={[
                                styles.dayText,
                                active &&
                                  styles.dayTextActive,
                              ]}
                            >
                              {
                                day.short
                              }
                            </Text>
                          </TouchableOpacity>
                        );
                      }
                    )}
                  </View>

                  <Text
                    style={
                      styles.selectedDaysText
                    }
                  >
                    {selectedDays.length ===
                    0
                      ? "No days selected"
                      : `${selectedDays.length} day${
                          selectedDays.length >
                          1
                            ? "s"
                            : ""
                        } selected`}
                  </Text>
                </View>
              )}

              {/* SAVE */}

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  saving &&
                    styles.saveButtonDisabled,
                ]}
                onPress={
                  handleSave
                }
                disabled={saving}
                activeOpacity={0.8}
              >
                {saving ? (
                  <ActivityIndicator
                    color="#FFFFFF"
                  />
                ) : (
                  <Text
                    style={
                      styles.saveButtonText
                    }
                  >
                    Save Reminder
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={
                  styles.cancelButton
                }
                onPress={
                  closeModal
                }
                disabled={saving}
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <View
                style={
                  styles.modalBottomSpace
                }
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  title: {
    color: "#1E88E5",
    fontSize: 26,
    fontWeight: "900",
  },

  subtitle: {
    color: "#7B8492",
    fontSize: 13,
    marginTop: 3,
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#1E88E5",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "300",
    lineHeight: 33,
  },

  list: {
    padding: 16,
    paddingBottom: 120,
  },

  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  reminderIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  reminderEmoji: {
    fontSize: 27,
  },

  reminderInfo: {
    flex: 1,
  },

  medicineName: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "900",
  },

  reminderTime: {
    color: "#1E88E5",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 3,
  },

  repeatLabel: {
    color: "#7B8492",
    fontSize: 12,
    marginTop: 2,
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFF0F0",
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    fontSize: 17,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    color: "#777777",
    fontSize: 14,
    marginTop: 10,
  },

  emptyList: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  emptyBox: {
    alignItems: "center",
  },

  emptyEmoji: {
    fontSize: 60,
    marginBottom: 14,
  },

  emptyTitle: {
    color: "#333333",
    fontSize: 20,
    fontWeight: "900",
  },

  emptyText: {
    color: "#7B8492",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
  },

  emptyButton: {
    backgroundColor: "#1E88E5",
    borderRadius: 13,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
  },

  // ===================================================
  // MODAL
  // ===================================================

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#F5F7FA",
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    maxHeight: "92%",
    paddingTop: 4,
  },

  modalHeader: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalTitle: {
    color: "#222222",
    fontSize: 22,
    fontWeight: "900",
  },

  modalSubtitle: {
    color: "#7B8492",
    fontSize: 12,
    marginTop: 3,
  },

  closeButton: {
    color: "#777777",
    fontSize: 34,
    fontWeight: "300",
  },

  inputLabel: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "900",
    marginHorizontal: 18,
    marginTop: 17,
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    height: 52,
    marginHorizontal: 18,
    paddingHorizontal: 15,
    color: "#222222",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E9EF",
  },

  // TIME

  timeButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 18,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E9EF",
  },

  timeIcon: {
    fontSize: 28,
    marginRight: 12,
  },

  timeValue: {
    color: "#1E88E5",
    fontSize: 22,
    fontWeight: "900",
  },

  timeHint: {
    color: "#8A94A6",
    fontSize: 11,
    marginTop: 2,
  },

  // REPEAT

  repeatOption: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginHorizontal: 18,
    marginBottom: 9,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E9EF",
  },

  repeatOptionActive: {
    borderColor: "#1E88E5",
    backgroundColor: "#F1F8FF",
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#B8C0CC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#1E88E5",
  },

  repeatContent: {
    flex: 1,
  },

  repeatTitle: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "800",
  },

  repeatTitleActive: {
    color: "#1E88E5",
  },

  repeatSubtitle: {
    color: "#8A94A6",
    fontSize: 11,
    marginTop: 3,
  },

  // DATE

  dateButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginHorizontal: 18,
    height: 52,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E9EF",
  },

  dateIcon: {
    fontSize: 21,
    marginRight: 10,
  },

  dateText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "700",
  },

  // DAYS

  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  dayButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE1E8",
    alignItems: "center",
    justifyContent: "center",
  },

  dayButtonActive: {
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
  },

  dayText: {
    color: "#687386",
    fontSize: 11,
    fontWeight: "800",
  },

  dayTextActive: {
    color: "#FFFFFF",
  },

  selectedDaysText: {
    color: "#8A94A6",
    fontSize: 11,
    textAlign: "center",
    marginTop: 8,
  },

  // SAVE

  saveButton: {
    height: 53,
    borderRadius: 15,
    backgroundColor: "#1E88E5",
    marginHorizontal: 18,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  cancelButton: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 18,
    marginTop: 5,
  },

  cancelButtonText: {
    color: "#777777",
    fontSize: 14,
    fontWeight: "700",
  },

  modalBottomSpace: {
    height: 35,
  },
});

