import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = !todos;
  const toggleTodo = useMutation(api.todos.toggleTodo);

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              handleIsCompletedToggle={handleIsCompletedToggle}
            />
          )}
          contentContainerStyle={homeStyles.todoListContent}
          style={homeStyles.todoList}
          ListEmptyComponent={<EmptyState />}
        />
      </SafeAreaView>
      <StatusBar barStyle={colors.statusBarStyle} />
    </LinearGradient>
  );
}
