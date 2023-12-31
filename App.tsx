import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaView } from "react-native";
import AppStack from "./AppStack";

import { ContextProvider } from "./misc/store";
import Notification from "./components/Notification";
import FirstLaunch from "./pages/FirstLaunch";
import { HoldMenuProvider } from "react-native-hold-menu";

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#121517" }}>
          <HoldMenuProvider theme="dark">
            <StatusBar hidden={true}></StatusBar>
            <FirstLaunch />
            <Notification color="#F7FFF7" content="Story posted"></Notification>
            <AppStack></AppStack>
          </HoldMenuProvider>
        </SafeAreaView>
      </NavigationContainer>
    </ContextProvider>
  );
}
