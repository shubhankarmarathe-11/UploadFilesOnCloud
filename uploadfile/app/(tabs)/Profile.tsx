import { View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PImage from "@/assets/images/icon.png";
import { User } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="m-3 flex items-center justify-center">
            <Text className="text-center text-2xl my-3">
              <User /> Profile
            </Text>
            <Image
              className="w-52 h-52 rounded-full border-2 my-5"
              source={PImage}
            />
            <View className="flex items-center justify-center my-3">
              <Text className="text-2xl">Welcome</Text>
              <Text className="text-2xl text-blue-500">Shubhankar Marathe</Text>
            </View>

            <View className="flex flex-row my-8">
              <View className="">
                <Text className="py-2 font-bold">Name </Text>
                <Text className="py-2 font-bold">Email</Text>
                <Text className="py-2 font-bold">Storage Used </Text>
                <Text className="py-2 font-bold">Storage Remain </Text>
              </View>
              <View className="">
                <Text className="py-2 text-right">Shubhankar Marathe </Text>
                <Text className="py-2 text-right">
                  shubhamkarmarathe2@gmail.com
                </Text>
                <Text className="py-2 text-right">0.0 MB</Text>
                <Text className="py-2 text-right">30.0 MB</Text>
              </View>
            </View>

            <View className="flex w-full">
              <Text
                onPress={() => {
                  router.push("/(StackScreens)/ChangePassword");
                }}
                className="text-red-500  text-left my-3"
              >
                Change Password
              </Text>
              <Text
                onPress={() => {
                  router.push("/(StackScreens)/Login");
                }}
                className="text-red-500  text-left my-3"
              >
                Logout
              </Text>

              <Button className="w-40 my-3">
                <Text>Delete Account</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
