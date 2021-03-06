
import React from 'react';
import {Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import signInScreen from '../screen/signInScreen';
import signUpScreen from '../screen/signUpScreen';
import changePwdScreen from '../screen/changePwdScreen';



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
    
                if (route.name === 'SignIn') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                } else if (route.name === 'SignUp') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                } else if (route.name === 'ChangePwd'){
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
            <Tab.Screen name="SignIn" component={signInScreen} />
            <Tab.Screen name="SignUp" component={signUpScreen} />
            <Tab.Screen name="ChangePwd" component = {changePwdScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      );
}

export default NavigationComponent;