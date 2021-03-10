import React, {useState,useEffect} from 'react';
import { StyleSheet} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
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
import PersistLogin from '../../utils/persistLogin';
import {firebase} from '../../Firebase'

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
                      ? 'home'
                      : 'home';
                  } else if (route.name === 'Anime') {
                    iconName = focused ? 'ios-list' : 'ios-list';
                  } else if (route.name === 'ListAnime'){
                    iconName = focused ? 'bookmarks' : 'bookmarks';
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
              <Tab.Screen name="Home" component={homeScreen} />
              <Tab.Screen name="Anime" component={animeScreen} />
              <Tab.Screen name="ListAnime" component = {myListScreen} />
            </Tab.Navigator>
  )
}


const SessionNavigation= ()=> {
  const [user, setUser] = useState();
  const [init,setInit] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    console.log(user);
    if (init) setInit(false);
  }
  // Verificar si ya existen credenciales de autenticación
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);
    return subscriber; // unsubscribe on unmount
  }, []);

  
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator >
            {user ? (
                <>
                  <Stack.Screen name="BottonTabs" component={TabComp} initialParams={{user: user}} options={{headerShown:false}}/>
                  <Stack.Screen name="ChangePwd" component={changePwdScreen}/>
                </>
              ) : (
                <>
                  
                  <Stack.Screen name="SignIn" component={signInScreen} initialParams={{userCreated:false}} options={{headerShown:false}} />
                  <Stack.Screen name="SignUp" component={signUpScreen}/>
                  <Stack.Screen name="BottonTabs" component={TabComp} initialParams={{user: user}} options={{headerShown:false}}/>
                </>
              )
            }
          </Stack.Navigator>
         </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({

});

export default SessionNavigation;