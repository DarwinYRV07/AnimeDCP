import React, {useEffect, useContext} from 'react';
import { StyleSheet} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import signInScreen from '../screen/signInScreen';
import signUpScreen from '../screen/signUpScreen';
import changePwdScreen from '../screen/changePwdScreen';
import RestorePwdScreen from "../screen/restorePwdScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import homeScreen from '../screen/homeScreen';
import animeScreen from '../screen/animeScreen';
import myListScreen from '../screen/myListScreen';
import {Context as AuthContext} from "../../providers/AuthContext";

import userScreen from '../screen/userScreen';
import * as SplashScreen from "expo-splash-screen"
import searchScreen from '../screen/searchScreen';
import animeList from '../screen/animeList';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabComp({navigation}) {
  return(
    
    <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'home'
                      : 'home';
                  } else if (route.name === 'Anime') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'Search'){
                    iconName = focused ? 'search' : 'search';
                  }else if (route.name === 'MyList'){
                    iconName = focused ? 'bookmark' : 'bookmark';
                  } else if(route.name === 'User'){
                    iconName = focused ? 'cog' : 'cog';
                  }
      
                  // You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#22DEFA',
                inactiveTintColor: 'gray',
                activeBackgroundColor:'#2F353A',
                inactiveBackgroundColor:'#2F353A',                
              }}
            >
              <Tab.Screen name="Home" component={homeScreen}  />
              <Tab.Screen name="Search" component = {searchScreen} />
              <Tab.Screen name="MyList" component = {myListScreen} />
              <Stack.Screen name="User" component ={userScreen} />
              
            </Tab.Navigator>
  )
}


const SessionNavigation= ()=> {


  const { state, persistLogin } = useContext(AuthContext);

  useEffect(() => {
    persistLogin();
  }, []);

  SplashScreen.preventAutoHideAsync();

  if (!state.loading){
    SplashScreen.hideAsync();
  } 

  return (
    <ThemeProvider>
        <NavigationContainer theme={DarkTheme}>
            {!state.Loading && (
              <>
              {state.loggedIn ? (
                
                <Stack.Navigator >
                    <Stack.Screen name="BottonTabs" component={TabComp}  options={{headerShown:false}}/>
                    <Stack.Screen name="ChangePwd" component={changePwdScreen} options={{headerShown:false}}/>      
                    <Stack.Screen name="Anime" component={animeScreen} options={{headerShown:false}}/>
                    <Stack.Screen name="animeList" component={animeList} options={{headerShown:true}}/>
                    </Stack.Navigator>
                ) : (
                  <Stack.Navigator >
                    <Stack.Screen name="SignIn" component={signInScreen}  options={{headerShown:false}} />
                    <Stack.Screen name="SignUp" component={signUpScreen} options={{headerShown:false}}/>
                    <Stack.Screen name="RestorePwd" component={RestorePwdScreen} options={{headerShown:false}}/>
                    </Stack.Navigator>
                )}
              </>
              )}
         </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default SessionNavigation;