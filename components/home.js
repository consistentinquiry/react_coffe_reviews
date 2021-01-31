import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Reviews from './reviews'
import Shops from './shops'
import Search from './search';
import MyAccount from './my_account';
import CreateUser from './create_user'
import SignIn from './sign_in'


class Home extends Component{
  render(){
      
    const Tab = createBottomTabNavigator();

    return(
      <NavigationContainer independent={true}>
      <Tab.Navigator name="homeNav"
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        {/* <Tab.Screen 
          name="Reviews" 
          component={Reviews} 
          options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons 
                name="coffee" 
                color={color} 
                size={size}
                 />
            ),
        }} /> */}
          <Tab.Screen 
            name="Shops" 
            component={Shops}
            options={{
              tabBarLabel: 'Shops',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons 
                    name="store" 
                    color={color} 
                    size={size}
                     />
                ),
              }}
          />
          <Tab.Screen 
            name="Search" 
            component={Search}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons 
                    name="magnify" 
                    color={color} 
                    size={size}
                     />
                ),
              }}
          />
          <Tab.Screen 
            name="Me" 
            component={SignIn}
            options={{
              tabBarLabel: 'Me',
              tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons 
                    name="account-box" 
                    color={color} 
                    size={size}
                     />
                ),
              }}
          />
      </Tab.Navigator>
      </NavigationContainer>
  );

    
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'forestgreen'
    },
    text: {
        color: 'white',
        fontSize: 25
    }
})

export default Home;