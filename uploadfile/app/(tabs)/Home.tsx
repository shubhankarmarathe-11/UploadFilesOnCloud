import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { CloudUpload, CircleAlert, Fingerprint } from "lucide-react-native";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardTitle, CardFooter, CardContent } from "@/components/ui/card";

export default function HomeScreen() {
  const [filename, Setfilename] = useState("none");

  const [showAlert, setShowAlert] = useState(false);

  async function onPressUpload() {
    await DocumentPicker.getDocumentAsync({ multiple: true })
      .then((res) => {
        if (res.assets?.length > 1) {
          if (res.assets.some((file) => file.size > 29 * 1024 * 1024)) {
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000);

            return Setfilename("none");
          }
          return Setfilename(`${res.assets?.length} files selected`);
        }

        if (res.assets[0].size > 29 * 1024 * 1024) {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 2000);

          return Setfilename("none");
        }
        return Setfilename(`${res.assets[0].name}`);
      })
      .catch((err) => {});
  }

  return (
    <>
      <SafeAreaView className="flex-1 h-full">
        <ScrollView>
          <View className="m-3">
            {showAlert ? (
              <Alert icon={CircleAlert} className="relative my-1">
                <AlertTitle className="text-red-500">
                  File Upload Failed
                </AlertTitle>
                <AlertDescription className="font-bold">
                  file size exceeds the limit. Please try again.
                </AlertDescription>
              </Alert>
            ) : null}
            <View className="bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 ">
              <View className="my-5">
                <CloudUpload className="" size={100} />
              </View>
              <Button
                className="bg-blue-500 rounded-3xl my-5"
                onPress={onPressUpload}
              >
                <Text>Browse</Text>
              </Button>
              <View>
                <Text className="text-center">Files Selected</Text>
                <Text className="text-center font-bold">{filename}</Text>
              </View>

              <Button className="my-5">
                <Text>Upload File</Text>
              </Button>
            </View>
            <View className="my-3">
              <Text className="font-bold my-3">Last Uploaded</Text>

              <Card>
                <CardContent>
                  <Text>MCA CET HALL Ticket</Text>
                </CardContent>
                <CardFooter>
                  <Text>2 MB</Text>
                </CardFooter>
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
