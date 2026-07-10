import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import StackNavigator from "./src/routes/StackNavigator";

import { AuthProvider } from "./src/contexts/AuthContext";
import { GithubProvider } from "./src/contexts/GithubContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <GithubProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </GithubProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
