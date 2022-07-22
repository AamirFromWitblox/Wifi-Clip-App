import "./ignoreWarnings";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Controller from './src/Screens/Controller';
import Home from './src/Screens/Home';
import { Text, TouchableOpacity } from "react-native";
import Tutorial from "./src/Screens/Tutorial";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    async function orientationChange() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
    orientationChange();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={{ header: () => null }} />
        <Stack.Screen name="tutorial" component={Tutorial} options={{
          headerTitle: "Tutorial",
          headerTitleAlign: "center",
        }} />
        <Stack.Screen
          name="controller"
          component={Controller}
          options={({ navigation }) => ({
            headerTitle: "Controller",
            headerTitleAlign: "center",
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("tutorial")}>
                <Text style={{ color: "gray" }}>Tutorial</Text>
              </TouchableOpacity>
            )
          })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}