import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Reviews from './reviews'
import Shops from './shops'
import Search from './search';
import MyAccount from './my_account';


class Home extends Component{
  render(){
      
    const Tab = createBottomTabNavigator();
    const navigation = this.props.navigation;

    return(
      <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen 
          name="Reviews" 
          component={Reviews} 
          options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons 
                name="rocket" 
                color={color} 
                size={size}
                 />
            ),
        }}/>
          <Tab.Screen 
            name="Shops" 
            component={Shops}
          />
          <Tab.Screen 
            name="Search" 
            component={Search}
          />
          <Tab.Screen 
            name="My account" 
            component={MyAccount}
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