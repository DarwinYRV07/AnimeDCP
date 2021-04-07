import React, {useState,useEffect, useContext} from 'react';
import { StyleSheet} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import signInScreen from '../screen/signInScreen';
import signUpScreen from '../screen/signUpScreen';
import changePwdScreen from '../screen/changePwdScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import homeScreen from '../screen/homeScreen';
import animeScreen from '../screen/animeScreen';
import myListScreen from '../screen/myListScreen';
import {Context as AuthContext} from "../../providers/AuthContext";

import userScreen from '../screen/userScreen';
import * as SplashScreen from "expo-splash-screen"


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
                  } else if (route.name === 'ListAnime'){
                    iconName = focused ? 'bookmarks' : 'bookmarks';
                  } else if(route.name === 'User'){
                    iconName = focused ? 'gear' : 'gear';
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
              <Tab.Screen name="Anime" component={animeScreen} />
              <Tab.Screen name="ListAnime" component = {myListScreen} />
              <Stack.Screen name="User" component ={userScreen} />
              
            </Tab.Navigator>
  )
}


const SessionNavigation= ()=> {


  const { state, persistLogin } = useContext(AuthContext);

  useEffect(() => {
    console.log(state.loading);
    persistLogin();
    console.log(state.loading)
  }, []);
  // Prevenir que se oculte la pantalla de splash
  SplashScreen.preventAutoHideAsync();

  // Ocultar la pantalla de splash al verificar que existe un token de inicio
  if (!state.loading){
    console.log(state.loading)
    SplashScreen.hideAsync();
  } 

  // const [user, setUser] = useState();
  // const [init,setInit] = useState(true);

  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   console.log(user);
  //   if (init) setInit(false);
  // }
  // // Verificar si ya existen credenciales de autenticación
  // useEffect(() => {
  //   const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
  //   console.log(subscriber);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
            {!state.Loading && (
              <>
              {state.loggedIn ? (
                
                <Stack.Navigator >
                    <Stack.Screen name="BottonTabs" component={TabComp}  options={{headerShown:false}}/>
                    <Stack.Screen name="ChangePwd" component={changePwdScreen} options={{headerShown:false}}/>
                    </Stack.Navigator>
                    
                  
                ) : (
                  
                  <Stack.Navigator >
                    <Stack.Screen name="SignIn" component={signInScreen} initialParams={{userCreated:false}} options={{headerShown:false}} />
                    <Stack.Screen name="SignUp" component={signUpScreen} options={{headerShown:false}}/>
                    </Stack.Navigator>
                  
                )}
              </>
              )}
         </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default SessionNavigation;