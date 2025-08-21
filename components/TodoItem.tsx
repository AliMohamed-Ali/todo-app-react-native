import { createHomeStyles } from "@/assets/styles/home.styles";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Todo } from "@/types/todo.types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TodoItem = ({
  item,
  handleIsCompletedToggle,
}: {
  item: Todo;
  handleIsCompletedToggle: (id: Id<"todos">) => Promise<void>;
}) => {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  return (
    <View style={homeStyles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={homeStyles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity
          style={homeStyles.checkbox}
          onPress={() => handleIsCompletedToggle(item._id)}
        >
          <LinearGradient
            colors={
              item.isCompleted
                ? colors.gradients.success
                : colors.gradients.muted
            }
            style={[
              homeStyles.checkboxInner,
              {
                borderColor: item.isCompleted ? "transparent" : colors.border,
              },
            ]}
          >
            {item.isCompleted && (
              <Ionicons name="checkmark" size={20} color="#fff" />
            )}
          </LinearGradient>
        </TouchableOpacity>
        <View style={homeStyles.todoTextContainer}>
          <Text
            style={[
              homeStyles.todoText,
              item.isCompleted && {
                textDecorationLine: "line-through",
                color: colors.textMuted,
                opacity: 0.6,
              },
            ]}
          >
            {item.text}
          </Text>
          <View style={homeStyles.todoActions}>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              <LinearGradient
                colors={colors.gradients.warning}
                style={homeStyles.actionButton}
              >
                <Ionicons name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
              <LinearGradient
                colors={colors.gradients.danger}
                style={homeStyles.actionButton}
              >
                <Ionicons name="trash" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
