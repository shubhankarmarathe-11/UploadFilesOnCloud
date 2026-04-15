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

export default function RegisterScreen() {
  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="m-3 flex flex-col h-screen ">
          <Card className="w-full">
            <CardHeader className="my-3">
              <CardTitle className="text-center text-2xl">
                Create new Account
              </CardTitle>
              <CardDescription className="text-center ">
                Create Account to use Application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className="my-3">
                <Text>Name</Text>
                <Input keyboardType="default" />
              </View>
              <View className="my-3">
                <Text>Email</Text>
                <Input keyboardType="email-address" />
              </View>
              <View className="my-3">
                <Text>Number</Text>
                <Input keyboardType="phone-pad" />
              </View>
              <View className="my-3">
                <Text>Password</Text>
                <Input keyboardType="default" secureTextEntry={true} />
              </View>
              <Button className="my-3">
                <Text>Register Now</Text>
              </Button>
            </CardContent>
            <CardFooter className="">
              <Link href={"/(StackScreens)/Login"} className=" text-blue-600">
                Login now
              </Link>
            </CardFooter>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
