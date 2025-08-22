import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Todo } from "@/types/todo.types";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

const TodoItem = ({ item }: { item: Todo }) => {
  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const handleEditTodo = () => {
    setEditedText(item.text);
    setEditingId(item._id);
  };
  const handleSaveEdit = async () => {
    try {
      if (editedText.trim() === "") {
        Alert.alert("Error", "Todo text cannot be empty.");
        return;
      }
      await updateTodo({ id: editingId!, text: editedText });
      setEditingId(null);
      setEditedText("");
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error updating the todo. Please try again."
      );
      console.error("Error updating todo:", error);
    }
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };
  const handleIsCompletedToggle = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      Alert.alert(
        "Error",
        "There was an error toggling the todo completion. Please try again."
      );
      console.error("Error toggling todo completion:", error);
    }
  };
  const handleDeleteTodo = async () => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
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
              await deleteTodo({ id: item._id });
            } catch (error) {
              Alert.alert(
                "Error",
                "There was an error deleting the todo. Please try again."
              );
              console.error("Error deleting todo:", error);
            }
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          console.log("Delete todo action dismissed");
        },
      }
    );
    return;
  };
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
        {editingId ? (
          <View style={homeStyles.editContainer}>
            <TextInput
              style={homeStyles.editInput}
              value={editedText}
              autoFocus
              multiline
              onChangeText={setEditedText}
              placeholder="Edit your todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButtons}>
              <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradients.success}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="checkmark" size={14} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.editButton}
                >
                  <Ionicons name="close" size={14} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancel</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
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
              <TouchableOpacity onPress={handleEditTodo} activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteTodo} activeOpacity={0.7}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

export default TodoItem;
