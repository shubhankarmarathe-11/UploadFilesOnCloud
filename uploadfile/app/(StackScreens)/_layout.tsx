import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../../global.css";

export default function StackScreenLayout() {
  return (
    <SafeAreaProvider>
      <Stack initialRouteName="Login">
        <StatusBar barStyle={"dark-content"} hidden={false} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePassword" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
