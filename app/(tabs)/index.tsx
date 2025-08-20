import useTheme from "@/hooks/useTheme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleTheme } = useTheme();
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <TouchableOpacity
        onPress={toggleTheme}
        style={{ padding: 10, backgroundColor: "#ccc", borderRadius: 5 }}
      >
        <Text>Change Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
