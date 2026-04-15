import { Tabs } from "expo-router";
import React from "react";
import {
  Home,
  File,
  User,
  Fingerprint,
  CircleAlert,
} from "lucide-react-native";
import "../../global.css";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { onAuthenticate } from "@/lib/CheckBiometric";
import { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Pressable, View } from "react-native";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function TabLayout() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: "",
    submessage: "",
    type: "",
  });

  const handleLogin = async () => {
    const result = await onAuthenticate();
    if (result.success) {
      setIsLoggedin(true);
    } else {
      setShowAlert({
        status: true,
        message: "Authentication Failed",
        submessage: result.error,
        type: "error",
      });
      setTimeout(() => {
        setShowAlert({ status: false, message: "", submessage: "", type: "" });
      }, 2000);
    }
  };

  if (!isLoggedin)
    return (
      <>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 m-3">
            {showAlert.status ? (
              <Alert icon={CircleAlert} className="absolutemy-1">
                <AlertTitle
                  className={
                    showAlert.type === "error"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {showAlert.message}
                </AlertTitle>
                <AlertDescription className="font-bold">
                  {showAlert.submessage}
                </AlertDescription>
              </Alert>
            ) : null}
            <View className="h-full justify-end">
              <Card className="flex justify-center items-center h-96">
                <Pressable onPress={handleLogin}>
                  <Fingerprint
                    className="font-light"
                    color={"black"}
                    size={52}
                  />
                </Pressable>
                <Text className="font-bold">Use Biometric To Login</Text>
              </Card>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </>
    );

  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          margin: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 100,
        },
        tabBarIconStyle: {
          margin: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="FileScreen"
        options={{
          title: "Files",
          tabBarIcon: ({ color, size }) => <File color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
