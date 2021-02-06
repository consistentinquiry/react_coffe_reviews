import React, { Component } from 'react';


import Shops from './shops'
import Search from './search';
import MyAccount from './my_account';
import SignIn from './sign_in'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

class Home extends Component {
    render(){
        return(
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
        )
    }

}
export default Home;