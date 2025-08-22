import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const DangerZone = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  const clearAllTodos = useMutation(api.todos.clearAllTodos);
  const handleClearAllTodos = async () => {
    Alert.alert(
      "Reset App",
      "⚠️Are you sure you want to clear all todos? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete All",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await clearAllTodos();
              Alert.alert(
                "App Reset",
                `Successfully Deleted ${result.deletedCount} todo${result.deletedCount > 1 ? "s" : ""}, Your app has been reset.`
              );
            } catch (error) {
              Alert.alert(
                "Error",
                "There was an error clearing all todos. Please try again."
              );
              console.error("Error clearing all todos:", error);
            }
          },
        },
      ]
    );
  };
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.actionTextDanger}>Danger Zone</Text>
      <TouchableOpacity
        onPress={handleClearAllTodos}
        activeOpacity={0.7}
        style={settingsStyles.actionButton}
      >
        <View style={settingsStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.danger}
            style={settingsStyles.settingIcon}
          >
            <Ionicons name="trash" size={20} color="#fff" />
          </LinearGradient>
          <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DangerZone;
