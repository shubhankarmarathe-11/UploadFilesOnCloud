import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'expo-router';
import { useEffect } from 'react';

export default function ChangePasswordScreen() {
  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="m-3 flex h-screen flex-col">
          <Card className="w-full">
            <CardHeader className="my-3">
              <CardTitle className="flex flex-row items-center justify-center text-center text-2xl">
                <Text className="text-2xl">Update Password</Text>
              </CardTitle>
              <CardDescription className="text-center">
                Update Your Password to Keep Your Account Secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <View className="my-3">
                <Text>Password</Text>
                <Input keyboardType="default" secureTextEntry={true} />
              </View>
              <View className="my-3">
                <Text>Confirm Password</Text>
                <Input keyboardType="default" secureTextEntry={true} />
              </View>
              <Button className="my-3">
                <Text>Change Password</Text>
              </Button>
            </CardContent>
            <CardFooter className="">
              <Link href={'/(StackScreens)/Register'} className="text-blue-600">
                Register now
              </Link>
            </CardFooter>
          </Card>
        </View>
      </SafeAreaView>
    </>
  );
}
