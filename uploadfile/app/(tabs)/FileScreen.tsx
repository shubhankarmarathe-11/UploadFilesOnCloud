import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FileScreen() {
  return (
    <>
      <SafeAreaView className="flex-1">
        <View className="m-3">
          <Text>File</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
