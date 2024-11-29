import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          gestureEnabled: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="auth/signup"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="auth/logout"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="pernual_api/searchPlant"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="favoris/plantfavoris"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="plantid_api/imagePickerComponent"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="map/map"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="profile/profile"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="auth/delete"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
