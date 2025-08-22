import { createSettingsStyles } from "@/assets/styles/settings.styles";
import ProgressStats from "@/components/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [isAutoSync, setIsAutoSync] = React.useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] =
    React.useState(true);
  const { toggleTheme, isDarkMode, colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        {/* Header */}
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons name="settings" size={28} color="#fff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView style={settingsStyles.scrollView}
        
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}

          >

            <ProgressStats/>


          </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
