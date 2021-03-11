
import React from 'react';
import {Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import homeScreen from '../screen/homeScreen';
import animeScreen from '../screen/animeScreen';
import myListScreen from '../screen/myListScreen';
import signUpScreen from '../screen/signUpScreen';



const Tab = createBottomTabNavigator();
const{width} = Dimensions.get("screen");
const{height} = Dimensions.get("screen");

const NavigationComponent =() =>{
    return ( 
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-information-circle'
                      : 'ios-information-circle-outline';
                  } else if (route.name === 'Anime') {
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  } else if (route.name === 'Anime'){
                    iconName = focused ? 'ios-list-box' : 'ios-list';
                  } else if (route.name ==='SignUp'){
                    iconName = focused ? 'ios-list-box' : 'ios-list';
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
              <Tab.Screen name="SignUp" component ={signUpScreen}/>
            </Tab.Navigator>
          </NavigationContainer>
      );
}

export default NavigationComponent;