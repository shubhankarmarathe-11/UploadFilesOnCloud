import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="m-3 flex flex-col h-screen ">
          <Card className="w-full">
            <CardHeader className="my-3">
              <CardTitle className="flex flex-row justify-center items-center text-center text-2xl">
                <Text className="text-2xl">Login Now</Text>
              </CardTitle>
              <CardDescription className="text-center ">
                Login To Access and Upload Files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className="my-3">
                <Text>Email</Text>
                <Input keyboardType="email-address" />
              </View>
              <View className="my-3">
                <Text>Password</Text>
                <Input keyboardType="default" secureTextEntry={true} />
              </View>
              <Button className="my-3">
                <Text>Login Now</Text>
              </Button>
            </CardContent>
            <CardFooter className="">
              <Link
                href={"/(StackScreens)/Register"}
                className=" text-blue-600"
              >
                Register now
              </Link>
            </CardFooter>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
