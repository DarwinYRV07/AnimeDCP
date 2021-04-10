import React from 'react';
import { StyleSheet} from 'react-native';
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as AuthProvider } from "./src/providers/AuthContext";
import { Provider as ListProvider } from "./src/providers/listAnimeContext";
import SessionNavigation from './src/components/navigation/sessionNavigation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ListProvider>
      <ThemeProvider>
      <SafeAreaProvider>
         <SessionNavigation/>
      </SafeAreaProvider>
    </ThemeProvider>
    </ListProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});