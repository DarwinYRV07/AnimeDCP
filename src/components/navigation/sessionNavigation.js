import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import signInScreen from '../screen/signInScreen';
import signUpScreen from '../screen/signUpScreen';
import changePwdScreen from '../screen/changePwdScreen';

const Stack = createStackNavigator();

const SessionNavigation= ()=> {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="SignIn" component={signInScreen}/>
            <Stack.Screen name="SignUp" component={signUpScreen}/>
            <Stack.Screen name="ChangePwd" component={changePwdScreen}/>
          </Stack.Navigator>
         </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default SessionNavigation;