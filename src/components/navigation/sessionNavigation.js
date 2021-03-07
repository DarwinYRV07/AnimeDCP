import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import signInScreen from '../screen/signInScreen';
import signUpScreen from '../screen/signUpScreen';
import changePwdScreen from '../screen/changePwdScreen';
import NavigationComponent from './navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import homeScreen from '../screen/homeScreen';
import animeScreen from '../screen/animeScreen';
import myListScreen from '../screen/myListScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabComp() {
  return(
    <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Anime') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'ListAnime'){
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } 
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Home" component={homeScreen} />
              <Tab.Screen name="Anime" component={animeScreen} />
              <Tab.Screen name="ListAnime" component = {myListScreen} />
            </Tab.Navigator>
  )
}


const SessionNavigation= ()=> {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="SignIn" component={signInScreen} initialParams={{userCreated:false}} options={{headerShown:false}} />
            <Stack.Screen name="SignUp" component={signUpScreen}/>
            <Stack.Screen name="ChangePwd" component={changePwdScreen}/>
            <Stack.Screen name="BottonTabs" component={TabComp} options={{headerShown:false}}/>
          </Stack.Navigator>
         </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default SessionNavigation;