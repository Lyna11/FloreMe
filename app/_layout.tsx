import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Login" options={{ title: "Connection" }} />
        <Stack.Screen name="auth/Signup" options={{ title: "Inscription" }} />
        <Stack.Screen name="auth/Logout" options={{ title: "Disconnection" }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
