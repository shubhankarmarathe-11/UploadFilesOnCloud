import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "@/lib/theme";

export default function RootLayout() {
  const colorScheme = "light";

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME["light"]}>
        <StatusBar style="dark" />
        <Stack initialRouteName="(tabs)">
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(StackScreens)"
            options={{ headerShown: false }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
